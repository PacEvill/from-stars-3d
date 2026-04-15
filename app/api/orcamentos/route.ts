import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises'; // Usar fs/promises para async/await
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const orcamentos = await prisma.orcamento.findMany({
      include: {
        Produto: true, // Inclui os dados do produto relacionado
        Usuario: true,   // Inclui os dados do usuário relacionado
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
    const formData = await request.formData();

    const usuarioId = Number(formData.get('usuarioId'));
    const produtoId = Number(formData.get('produtoId'));
    const quantidade = Number(formData.get('quantidade'));
    const valorTotal = Number(formData.get('valorTotal'));
    const status = String(formData.get('status') || '');

    if (!usuarioId || !produtoId || !quantidade || !valorTotal || !status) {
      return NextResponse.json({ message: 'Todos os campos obrigatórios (exceto arquivo) são necessários para criar um orçamento.' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    let arquivoUrl: string | undefined;

    const arquivo = formData.get('arquivo');
    if (arquivo instanceof File && arquivo.size > 0) {
      const safeExt = path.extname(arquivo.name || '').slice(0, 10);
      const fileName = `${Date.now()}-${randomUUID()}${safeExt}`;
      const filePath = path.join(uploadDir, fileName);
      const buffer = Buffer.from(await arquivo.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      arquivoUrl = `/uploads/${fileName}`;
    }

    const novoOrcamento = await prisma.orcamento.create({
      data: {
        usuarioId,
        produtoId,
        quantidade,
        valorTotal,
        status,
        arquivoUrl, // Adiciona a URL do arquivo, se existir
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