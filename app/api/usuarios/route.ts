import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany();
    return NextResponse.json(usuarios, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json({ message: 'Erro interno do servidor ao buscar usuários.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('[CADASTRO] Iniciando processo de cadastro...');
    const body = await request.json();
    const { nome, email, senha } = body;
    
    console.log('[CADASTRO] Dados recebidos:', { nome, email, senhaLength: senha?.length });

    if (!nome || !email || !senha) {
      console.log('[CADASTRO] Campos obrigatórios faltando');
      return NextResponse.json({ message: 'Nome, email e senha são obrigatórios.' }, { status: 400 });
    }

    console.log('[CADASTRO] Verificando se email já existe...');
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (usuarioExistente) {
      console.log('[CADASTRO] Email já cadastrado:', email);
      return NextResponse.json({ message: 'Email já cadastrado.' }, { status: 409 });
    }

    console.log('[CADASTRO] Gerando hash da senha...');
    const hashedPassword = await bcrypt.hash(senha, 10);
    console.log('[CADASTRO] Hash gerado com sucesso');

    console.log('[CADASTRO] Criando usuário no banco...');
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });

    console.log('[CADASTRO] Usuário criado com sucesso! ID:', novoUsuario.id);
    
    // Não retorna a senha no response
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    return NextResponse.json(usuarioSemSenha, { status: 201 });
  } catch (error) {
    console.error('[CADASTRO] Erro ao criar usuário:', error);
    // Log mais detalhado do erro
    if (error instanceof Error) {
      console.error('[CADASTRO] Mensagem do erro:', error.message);
      console.error('[CADASTRO] Stack trace:', error.stack);
    }
    return NextResponse.json({ 
      message: 'Erro interno do servidor ao criar usuário.',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}