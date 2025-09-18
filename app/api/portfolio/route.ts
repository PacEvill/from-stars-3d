import { PrismaClient } from '../../generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const portfolioItems = await prisma.portfolio.findMany();
    return NextResponse.json(portfolioItems, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar itens do portfólio:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao buscar itens do portfólio.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, descricao, imagem } = body;

    if (!titulo || !descricao || !imagem) {
      return NextResponse.json({ message: 'Título, descrição e imagem são obrigatórios para criar um item de portfólio.' }, { status: 400 });
    }

    const novoPortfolioItem = await prisma.portfolio.create({
      data: {
        titulo,
        descricao,
        imagem,
        // data é gerada automaticamente pelo @default(now())
      },
    });

    return NextResponse.json(novoPortfolioItem, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar item de portfólio:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao criar item de portfólio.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}