import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const orcamentos = await prisma.orcamento.findMany({
      include: {
        Produto: true,
        Usuario: true,
      },
    });
    return NextResponse.json(orcamentos, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao buscar orçamentos.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Usamos a API Web FormData disponível em Request do App Router
    const formData = await request.formData();

    const usuarioId = Number(formData.get('usuarioId')) || 0;
    const produtoId = Number(formData.get('produtoId')) || 0;
    const quantidade = Number(formData.get('quantidade')) || 0;
    const valorTotal = parseFloat(String(formData.get('valorTotal'))) || 0;
    const status = String(formData.get('status') || '');
    let arquivoUrl: string | undefined;

    const arquivo = formData.get('arquivo') as File | null;
    if (arquivo && arquivo.name) {
      // prefix para evitar colisões simples
      const fileName = `${Date.now()}-${path.basename(arquivo.name)}`;
      const arrayBuffer = await arquivo.arrayBuffer();
      await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(arrayBuffer));
      arquivoUrl = `/uploads/${fileName}`;
    }

    if (!usuarioId || !produtoId || !quantidade || !valorTotal || !status) {
      return NextResponse.json({ message: 'Todos os campos obrigatórios (exceto arquivo) são necessários.' }, { status: 400 });
    }

    const novoOrcamento = await prisma.orcamento.create({
      data: {
        usuarioId,
        produtoId,
        quantidade,
        valorTotal,
        status,
        arquivoUrl,
      },
    });

    return NextResponse.json(novoOrcamento, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar orçamento com upload:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao criar orçamento.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
