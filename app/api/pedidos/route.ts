import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET para buscar os pedidos do usuário
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ message: "Não autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const pedidos = await prisma.pedido.findMany({
      where: {
        usuarioId: parseInt(session.user.id),
      },
      include: {
        itens: {
          include: {
            Produto: true,
          },
        },
        Endereco: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao buscar pedidos." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST para criar um novo pedido
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return new NextResponse(JSON.stringify({ message: "Não autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { enderecoId } = await request.json();
  const usuarioId = parseInt(session.user.id);

  if (!enderecoId) {
    return new NextResponse(
      JSON.stringify({ message: "O ID do endereço é obrigatório." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // 1. Encontrar o carrinho e os itens do usuário
    const carrinho = await prisma.carrinho.findUnique({
      where: { usuarioId },
      include: {
        itens: {
          include: {
            Produto: true, // Inclui os detalhes do produto para calcular o preço
          },
        },
      },
    });

    if (!carrinho || carrinho.itens.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Seu carrinho está vazio." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. Calcular o valor total
    const valorTotal = carrinho.itens.reduce((total, item) => {
      return total + item.Produto.preco * item.quantidade;
    }, 0);

    // 3. Usar uma transação para criar o pedido e limpar o carrinho
    const novoPedido = await prisma.$transaction(async (tx) => {
      // a. Criar o Pedido
      const pedido = await tx.pedido.create({
        data: {
          usuarioId,
          enderecoId,
          valorTotal,
          status: "Pendente",
        },
      });

      // b. Criar os Itens do Pedido
      const itensPedidoData = carrinho.itens.map((item) => ({
        pedidoId: pedido.id,
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        preco: item.Produto.preco, // Salva o preço no momento da compra
      }));

      await tx.itemPedido.createMany({
        data: itensPedidoData,
      });

      // c. Limpar o carrinho
      await tx.itemCarrinho.deleteMany({
        where: {
          carrinhoId: carrinho.id,
        },
      });

      return pedido;
    });

    return new NextResponse(
      JSON.stringify({
        message: "Pedido criado com sucesso!",
        pedido: novoPedido,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return new NextResponse(
      JSON.stringify({ message: "Erro ao processar o pedido." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}