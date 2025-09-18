import { PrismaClient } from '../../generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        Material: true, // Inclui os dados do material relacionado
        Usuario: true,   // Inclui os dados do usuário relacionado
      },
    });
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao buscar produtos.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, descricao, preco, imagem, usuarioId, materialId } = body;

    if (!nome || !descricao || !preco || !imagem || !usuarioId || !materialId) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios para criar um produto.' }, { status: 400 });
    }

    const novoProduto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco,
        imagem,
        usuarioId,
        materialId,
      },
    });

    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao criar produto.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}