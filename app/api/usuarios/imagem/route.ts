import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhuma imagem foi enviada.' }, { status: 400 })
    }

    // Validar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Formato de imagem não suportado. Use JPG, PNG, WEBP ou GIF.' }, { status: 400 })
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Imagem muito grande. Tamanho máximo: 5MB.' }, { status: 400 })
    }

    // Converter arquivo para base64 para armazenar no banco
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`

    // Atualizar imagem do usuário no banco
    const updatedUser = await prisma.usuario.update({
      where: { email: session.user.email },
      data: { imagem: base64Image },
    })

    console.log('[UPLOAD IMAGEM] Imagem atualizada para usuário:', session.user.email)

    return NextResponse.json({
      message: 'Imagem de perfil atualizada com sucesso!',
      imageUrl: base64Image,
    })
  } catch (error) {
    console.error('[UPLOAD IMAGEM] Erro ao atualizar imagem:', error)
    return NextResponse.json({ error: 'Ocorreu um erro ao atualizar a imagem.' }, { status: 500 })
  }
}