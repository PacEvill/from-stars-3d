import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'

// Força execução dinâmica nesta rota parametrizada
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0

// PATCH - Atualizar status ou valor do orçamento
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    if (!(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    const { status, valorTotal } = await request.json()
    const orcamentoId = parseInt(params.id)

    const updateData: any = {}
    if (status) updateData.status = status
    if (valorTotal !== undefined) updateData.valorTotal = parseFloat(valorTotal)

    const orcamento = await prisma.orcamento.update({
      where: { id: orcamentoId },
      data: updateData,
      include: {
        Usuario: true,
        Produto: true,
      }
    })

    console.log('[ADMIN] Orçamento atualizado:', orcamentoId, updateData)

    return NextResponse.json(orcamento, { status: 200 })
  } catch (error) {
    console.error('[ADMIN] Erro ao atualizar orçamento:', error)
    return NextResponse.json({ error: 'Erro ao atualizar orçamento.' }, { status: 500 })
  }
}

// DELETE - Deletar orçamento
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    if (!(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    const orcamentoId = parseInt(params.id)

    await prisma.orcamento.delete({
      where: { id: orcamentoId }
    })

    console.log('[ADMIN] Orçamento deletado:', orcamentoId)

    return NextResponse.json({ message: 'Orçamento deletado com sucesso.' }, { status: 200 })
  } catch (error) {
    console.error('[ADMIN] Erro ao deletar orçamento:', error)
    return NextResponse.json({ error: 'Erro ao deletar orçamento.' }, { status: 500 })
  }
}
