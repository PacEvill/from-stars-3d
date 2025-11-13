import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    // Permite pedido sem login, mas requer email
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const email = formData.get('email') as string | null
    const message = formData.get('message') as string | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo foi enviado.' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório.' }, { status: 400 })
    }

    // Validar tipo de arquivo
    const validExtensions = ['.stl', '.obj']
    const fileName = file.name.toLowerCase()
    const isValid = validExtensions.some(ext => fileName.endsWith(ext))
    
    if (!isValid) {
      return NextResponse.json({ 
        error: 'Formato de arquivo não suportado. Use .STL ou .OBJ.' 
      }, { status: 400 })
    }

    // Validar tamanho (máximo 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'Arquivo muito grande. Tamanho máximo: 10MB.' 
      }, { status: 400 })
    }

    // Converter arquivo para base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64File = `data:${file.type || 'application/octet-stream'};base64,${buffer.toString('base64')}`

    // Buscar ou criar usuário pelo email
    let usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    // Se não existe e não está logado, criar usuário temporário
    if (!usuario && !session) {
      usuario = await prisma.usuario.create({
        data: {
          email,
          nome: email.split('@')[0], // Nome provisório baseado no email
        }
      })
    }

    const usuarioId = session?.user?.id 
      ? parseInt(session.user.id) 
      : usuario!.id

    // Criar produto temporário para o orçamento (será editado depois pelo admin)
    const produto = await prisma.produto.create({
      data: {
        nome: `Orçamento - ${file.name}`,
        descricao: message || 'Orçamento solicitado via formulário',
        preco: 0, // Será definido pelo admin
        imagem: base64File.substring(0, 500), // Preview do arquivo
        categoria: 'Orçamento',
        disponibilidade: 'Pendente',
        usuarioId,
        materialId: 1, // Material padrão (ajuste conforme seu banco)
      }
    })

    // Criar orçamento
    const orcamento = await prisma.orcamento.create({
      data: {
        usuarioId,
        produtoId: produto.id,
        quantidade: 1,
        valorTotal: 0, // Será definido pelo admin
        status: 'Pendente',
        arquivoUrl: base64File, // Arquivo completo em base64
      }
    })

    console.log('[ORÇAMENTO] Novo orçamento criado:', {
      id: orcamento.id,
      email,
      arquivo: file.name,
      tamanho: `${(file.size / 1024).toFixed(2)} KB`
    })

    return NextResponse.json({
      message: 'Orçamento solicitado com sucesso! Entraremos em contato em breve.',
      orcamentoId: orcamento.id,
    }, { status: 201 })

  } catch (error) {
    console.error('[ORÇAMENTO] Erro ao criar orçamento:', error)
    return NextResponse.json({ 
      error: 'Erro ao processar solicitação de orçamento.',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

// GET - Listar orçamentos do usuário logado
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    const orcamentos = await prisma.orcamento.findMany({
      where: {
        usuarioId: parseInt(session.user.id)
      },
      include: {
        Produto: true
      },
      orderBy: {
        id: 'desc'
      }
    })

    return NextResponse.json(orcamentos, { status: 200 })
  } catch (error) {
    console.error('[ORÇAMENTO] Erro ao buscar orçamentos:', error)
    return NextResponse.json({ 
      error: 'Erro ao buscar orçamentos.' 
    }, { status: 500 })
  }
}
