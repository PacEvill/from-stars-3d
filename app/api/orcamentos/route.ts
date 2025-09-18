import { PrismaClient } from '../../generated/prisma';
import { NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs/promises'; // Usar fs/promises para async/await

const prisma = new PrismaClient();

// Desabilita o body-parser padrão do Next.js para lidar com FormData manualmente
export const config = {
  api: {
    bodyParser: false,
  },
};

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
    // Cria o diretório de uploads se não existir
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const form = new IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    // Promisify form.parse
    const parseForm = () => {
      return new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(request as any, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });
    };

    const { fields, files } = await parseForm();

    const usuarioId = parseInt(fields.usuarioId[0]);
    const produtoId = parseInt(fields.produtoId[0]);
    const quantidade = parseInt(fields.quantidade[0]);
    const valorTotal = parseFloat(fields.valorTotal[0]);
    const status = fields.status[0];
    let arquivoUrl: string | undefined;

    if (files.arquivo && files.arquivo[0]) {
      const file = files.arquivo[0];
      const fileName = path.basename(file.filepath);
      arquivoUrl = `/uploads/${fileName}`; // URL pública do arquivo
    }

    if (!usuarioId || !produtoId || !quantidade || !valorTotal || !status) {
      return NextResponse.json({ message: 'Todos os campos obrigatórios (exceto arquivo) são necessários para criar um orçamento.' }, { status: 400 });
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