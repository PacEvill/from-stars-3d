import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email') || ''

    if (!email) {
      return NextResponse.json({ message: 'Parâmetro "email" é obrigatório.' }, { status: 400 })
    }

    const user = await prisma.usuario.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado.' }, { status: 404 })
    }

    // Remover senha do retorno, por segurança
    const { senha: _omit, ...safe } = user as any
    return NextResponse.json(safe, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao buscar usuário por email.', error: (error as Error).message },
      { status: 500 }
    )
  }
}
