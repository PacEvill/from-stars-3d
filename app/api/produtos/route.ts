import { NextResponse } from 'next/server'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: Request) {
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
