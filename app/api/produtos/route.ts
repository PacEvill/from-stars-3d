import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json([], { status: 200 })
  }
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        Material: true, // Opcional: incluir detalhes do material
      },
    })
    return NextResponse.json(produtos)
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
  }
}
