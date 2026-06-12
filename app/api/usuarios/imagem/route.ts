import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-options'
import prisma from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'
import fs from 'fs'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    const imageUrl = `/uploads/${filename}`

    await prisma.usuario.update({
      where: { id: Number(session.user.id) },
      data: { imagem: imageUrl }
    })

    return NextResponse.json({ message: 'Imagem atualizada com sucesso!', imageUrl })
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error)
    return NextResponse.json({ error: 'Ocorreu um erro ao atualizar a imagem.' }, { status: 500 })
  }
}