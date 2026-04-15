import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { createTransport } from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'E-mail é obrigatório' }, { status: 400 });
    }

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      // Por segurança, não revele que o usuário não existe
      return NextResponse.json({ message: 'Se um usuário com este e-mail existir, um link de redefinição de senha será enviado.' }, { status: 200 });
    }

    // Gerar token de redefinição
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hora

    await prisma.usuario.update({
      where: { email },
      data: {
        passwordResetToken,
        passwordResetExpires,
      },
    });

    // Enviar e-mail
    const resetUrl = `${process.env.NEXTAUTH_URL}/redefinir-senha/${resetToken}`;

    const transport = createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Redefinição de Senha - From Stars 3D',
      html: `<p>Você solicitou a redefinição de sua senha. Clique no link abaixo para criar uma nova senha:</p>
             <p><a href="${resetUrl}">${resetUrl}</a></p>
             <p>Se você não solicitou isso, por favor, ignore este e-mail.</p>`,
    });

    return NextResponse.json({ message: 'Se um usuário com este e-mail existir, um link de redefinição de senha será enviado.' }, { status: 200 });

  } catch (error) {
    console.error('Erro na solicitação de redefinição de senha:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}