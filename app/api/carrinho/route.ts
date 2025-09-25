import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

// GET: Busca ou cria o carrinho do usuário
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const userId = Number(session.user.id)

  try {
    let carrinho = await prisma.carrinho.findUnique({
      where: { usuarioId: userId },
      include: {
        itens: {
          include: {
            Produto: true, // Inclui os detalhes do produto em cada item do carrinho
          },
        },
      },
    })

    // Se o usuário não tiver um carrinho, cria um novo
    if (!carrinho) {
      carrinho = await prisma.carrinho.create({
        data: { usuarioId: userId },
        include: {
          itens: {
            include: {
              Produto: true,
            },
          },
        },
      })
    }

    return NextResponse.json(carrinho)
  } catch (error) {
    console.error("Erro ao buscar o carrinho:", error)
    return NextResponse.json({ error: 'Erro ao buscar o carrinho' }, { status: 500 })
  }
}

// POST: Adiciona um item ao carrinho
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const userId = Number(session.user.id)

  try {
    const { produtoId, quantidade } = await request.json()

    if (!produtoId || !quantidade) {
      return NextResponse.json({ error: 'ID do produto e quantidade são obrigatórios' }, { status: 400 })
    }

    // Garante que o usuário tenha um carrinho
    const carrinho = await prisma.carrinho.upsert({
      where: { usuarioId: userId },
      update: {},
      create: { usuarioId: userId },
    })

    const existingItem = await prisma.itemCarrinho.findFirst({
        where: {
            carrinhoId: carrinho.id,
            produtoId: produtoId,
        }
    })

    if (existingItem) {
        // Se o item já existe, atualiza a quantidade
        await prisma.itemCarrinho.update({
            where: { id: existingItem.id },
            data: { quantidade: existingItem.quantidade + quantidade },
        })
    } else {
        // Se não existe, cria um novo item
        await prisma.itemCarrinho.create({
            data: {
                carrinhoId: carrinho.id,
                produtoId: produtoId,
                quantidade: quantidade,
            },
        })
    }

    // Retorna o carrinho atualizado
    const carrinhoAtualizado = await prisma.carrinho.findUnique({
        where: { usuarioId: userId },
        include: {
            itens: {
                include: {
                    Produto: true,
                },
            },
        },
    })

    return NextResponse.json(carrinhoAtualizado)

  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error)
    return NextResponse.json({ error: 'Erro ao adicionar item ao carrinho' }, { status: 500 })
  }
}
