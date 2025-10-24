import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(params.id) },
      include: {
        Material: true,
      },
    })

    if (!produto) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
    }

    return NextResponse.json(produto)
  } catch (error) {
    console.error(`Erro ao buscar o produto ${params.id}:`, error)
    return NextResponse.json({ error: 'Erro ao buscar o produto' }, { status: 500 })
  }
}
