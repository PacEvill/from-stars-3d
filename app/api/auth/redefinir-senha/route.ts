import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ message: 'Token e nova senha são obrigatórios' }, { status: 400 });
    }

    // Hash do token recebido para comparar com o do banco
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await prisma.usuario.findFirst({
      where: {
        passwordResetToken,
        passwordResetExpires: {
          gt: new Date(), // gt = greater than
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Token inválido ou expirado' }, { status: 400 });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualizar senha e limpar token
    await prisma.usuario.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return NextResponse.json({ message: 'Sua senha foi redefinida com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}