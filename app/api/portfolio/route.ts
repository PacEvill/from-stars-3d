import { NextResponse } from 'next/server';



export async function GET() {
  try {
    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar itens do portfólio:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao buscar itens do portfólio.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, descricao, imagem } = body;

    if (!titulo || !descricao || !imagem) {
      return NextResponse.json({ message: 'Título, descrição e imagem são obrigatórios para criar um item de portfólio.' }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: 'Cadastro de portfólio indisponível até criação do model Portfolio no Prisma.',
        data: { titulo, descricao, imagem },
      },
      { status: 501 }
    );
  } catch (error) {
    console.error('Erro ao criar item de portfólio:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao criar item de portfólio.' }, { status: 500 });
  }
}