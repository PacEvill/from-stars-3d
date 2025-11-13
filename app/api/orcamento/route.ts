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
    const referenceImageCount = parseInt(formData.get('referenceImageCount') as string || '0')

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo foi enviado.' }, { status: 400 })
    }

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório.' }, { status: 400 })
    }

    // Validar tipo de arquivo principal: pode ser 3D (stl/obj) ou imagem
    const fileName = file.name.toLowerCase()
    const is3D = ['.stl', '.obj'].some(ext => fileName.endsWith(ext))
    const isImage = (file.type?.startsWith('image/') ?? false) || ['.jpg','.jpeg','.png','.webp','.gif'].some(ext => fileName.endsWith(ext))
    if (!is3D && !isImage) {
      return NextResponse.json({ 
        error: 'Formato de arquivo não suportado. Use .STL, .OBJ ou uma imagem (JPG/PNG/WEBP/GIF).' 
      }, { status: 400 })
    }

    // Validar tamanho (máximo 10MB para 3D e 5MB para imagens)
    const max3DSize = 10 * 1024 * 1024
    const maxImgSize = 5 * 1024 * 1024
    if ((is3D && file.size > max3DSize) || (isImage && file.size > maxImgSize)) {
      return NextResponse.json({ 
        error: is3D ? 'Arquivo 3D muito grande. Máximo: 10MB.' : 'Imagem muito grande. Máximo: 5MB.' 
      }, { status: 400 })
    }

    // Converter arquivo para base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64File = `data:${file.type || 'application/octet-stream'};base64,${buffer.toString('base64')}`

    // Processar múltiplas imagens de referência
    const base64RefImages: string[] = []
    if (referenceImageCount > 0) {
      for (let i = 0; i < referenceImageCount; i++) {
        const refImg = formData.get(`referenceImage${i}`) as File | null
        if (refImg) {
          if (!refImg.type.startsWith('image/')) {
            return NextResponse.json({ error: `Imagem ${i + 1} não é válida.` }, { status: 400 })
          }
          if (refImg.size > maxImgSize) {
            return NextResponse.json({ error: `Imagem ${i + 1} excede 5MB.` }, { status: 400 })
          }
          const refBytes = await refImg.arrayBuffer()
          const refBuffer = Buffer.from(refBytes)
          base64RefImages.push(`data:${refImg.type};base64,${refBuffer.toString('base64')}`)
        }
      }
    }

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
        // Se houver imagens de referência, usar a primeira; caso contrário, usar preview do arquivo
        imagem: base64RefImages.length > 0 ? base64RefImages[0] : base64File.substring(0, 500),
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
        // Se foi enviado um arquivo 3D, salvar o arquivo 3D; se foi imagem, salvar a imagem (o admin poderá baixar)
        arquivoUrl: base64File,
        // Salvar todas as imagens de referência como JSON
        imagensRef: base64RefImages.length > 0 ? JSON.stringify(base64RefImages) : null,
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
