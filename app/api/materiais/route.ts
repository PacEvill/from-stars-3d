import { PrismaClient } from '../../generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const materiais = await prisma.material.findMany();
    return NextResponse.json(materiais, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar materiais:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao buscar materiais.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, imagem, descricao, propriedades, aplicacoes } = body;

    if (!nome || !imagem || !descricao || !propriedades || !aplicacoes) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios para criar um material.' }, { status: 400 });
    }

    const novoMaterial = await prisma.material.create({
      data: {
        nome,
        imagem,
        descricao,
        propriedades,
        aplicacoes,
      },
    });

    return NextResponse.json(novoMaterial, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar material:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao criar material.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}