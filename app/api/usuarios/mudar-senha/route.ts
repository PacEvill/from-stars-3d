import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'



export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 })
    }

    const user = await prisma.usuario.findUnique({
      where: { id: Number(session.user.id) },
    })

    if (!user || !user.senha) {
      return NextResponse.json({ error: 'Usuário não encontrado ou não possui senha cadastrada.' }, { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.senha)

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'A senha atual está incorreta' }, { status: 401 })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    await prisma.usuario.update({
      where: { id: Number(session.user.id) },
      data: { senha: hashedNewPassword },
    })

    return NextResponse.json({ message: 'Senha alterada com sucesso!' })

  } catch (error) {
    console.error("Erro ao alterar a senha:", error)
    return NextResponse.json({ error: 'Erro interno ao alterar a senha' }, { status: 500 })
  }
}
