import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

// PUT: Atualiza a quantidade de um item
export async function PUT(request: Request, { params }: { params: { itemId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const itemId = Number(params.itemId)
    const { quantidade } = await request.json()

    if (quantidade <= 0) {
      // Se a quantidade for 0 ou menos, remove o item
      await prisma.itemCarrinho.delete({ where: { id: itemId } })
    } else {
      await prisma.itemCarrinho.update({
        where: { id: itemId },
        data: { quantidade },
      })
    }
    return NextResponse.json({ message: 'Carrinho atualizado' })
  } catch (error) {
    console.error(`Erro ao atualizar o item:`, error)
    return NextResponse.json({ error: 'Erro ao atualizar o item' }, { status: 500 })
  }
}

// DELETE: Remove um item do carrinho
export async function DELETE(request: Request, { params }: { params: { itemId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const itemId = Number(params.itemId)
    await prisma.itemCarrinho.delete({ where: { id: itemId } })
    return NextResponse.json({ message: 'Item removido do carrinho' })
  } catch (error) {
    console.error('Erro ao remover o item:', error)
    return NextResponse.json({ error: 'Erro ao remover o item' }, { status: 500 })
  }
}
