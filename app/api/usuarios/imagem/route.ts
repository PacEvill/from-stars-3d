import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      console.log('[UPLOAD IMAGEM] Não autenticado')
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    console.log('[UPLOAD IMAGEM] Recebendo upload para:', session.user.email)

    const formData = await request.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      console.log('[UPLOAD IMAGEM] Nenhum arquivo enviado')
      return NextResponse.json({ error: 'Nenhuma imagem foi enviada.' }, { status: 400 })
    }

    console.log('[UPLOAD IMAGEM] Arquivo recebido:', {
      nome: file.name,
      tipo: file.type,
      tamanho: `${(file.size / 1024).toFixed(2)} KB`
    })

    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      console.log('[UPLOAD IMAGEM] Tipo inválido:', file.type)
      return NextResponse.json({ error: 'Formato de imagem não suportado. Use JPG, PNG, WEBP ou GIF.' }, { status: 400 })
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.log('[UPLOAD IMAGEM] Arquivo muito grande:', file.size)
      return NextResponse.json({ error: 'Imagem muito grande. Tamanho máximo: 5MB.' }, { status: 400 })
    }

    // Converter arquivo para base64 para armazenar no banco
    console.log('[UPLOAD IMAGEM] Convertendo para base64...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`
    
    const base64Size = base64Image.length
    console.log('[UPLOAD IMAGEM] Base64 gerado:', {
      tamanhoOriginal: `${(file.size / 1024).toFixed(2)} KB`,
      tamanhoBase64: `${(base64Size / 1024).toFixed(2)} KB`
    })

    // Atualizar imagem do usuário no banco
    console.log('[UPLOAD IMAGEM] Atualizando no banco de dados...')
    const updatedUser = await prisma.usuario.update({
      where: { email: session.user.email },
      data: { imagem: base64Image },
    })

    console.log('[UPLOAD IMAGEM] ✅ Imagem atualizada com sucesso para:', session.user.email)

    return NextResponse.json({
      message: 'Imagem de perfil atualizada com sucesso!',
      imageUrl: base64Image,
    })
  } catch (error) {
    console.error('[UPLOAD IMAGEM] ❌ Erro ao atualizar imagem:', error)
    console.error('[UPLOAD IMAGEM] Stack:', error instanceof Error ? error.stack : 'N/A')
    console.error('[UPLOAD IMAGEM] Mensagem:', error instanceof Error ? error.message : String(error))
    return NextResponse.json({ 
      error: 'Ocorreu um erro ao atualizar a imagem.',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}