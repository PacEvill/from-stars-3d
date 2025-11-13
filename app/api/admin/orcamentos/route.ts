import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'

// GET - Listar todos os orçamentos (admin only)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    // Verificação de admin
    if (!(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 })
    }

    const orcamentos = await prisma.orcamento.findMany({
      include: {
        Usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          }
        },
        Produto: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            categoria: true,
            imagem: true,
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    })

    return NextResponse.json(orcamentos, { status: 200 })
  } catch (error) {
    console.error('[ADMIN] Erro ao buscar orçamentos:', error)
    return NextResponse.json({ error: 'Erro ao buscar orçamentos.' }, { status: 500 })
  }
}
