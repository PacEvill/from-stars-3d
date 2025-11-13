import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL || ''

    // Parse minimal, without exposing secrets
    let parsed: {
      protocol?: string
      host?: string
      port?: string
      database?: string
      sslMode?: string | null
    } = {}

    try {
      const u = new URL(dbUrl)
      parsed = {
        protocol: u.protocol.replace(':', ''),
        host: u.hostname,
        port: u.port,
        database: u.pathname?.replace(/^\//, '') || undefined,
        sslMode: u.searchParams.get('ssl-mode'),
      }
    } catch {
      // ignore parse errors; still attempt prisma check
    }

    // Tiny connectivity check and some lightweight stats
    let canConnect = false
    let usuarioCount: number | null = null
    try {
      await prisma.$queryRaw`SELECT 1`
      canConnect = true
      usuarioCount = await prisma.usuario.count()
    } catch (e) {
      canConnect = false
    }

    return NextResponse.json(
      {
        envHasDatabaseUrl: Boolean(dbUrl),
        connection: parsed,
        prisma: {
          canConnect,
          usuarioCount,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao obter informações do banco.', error: (error as Error).message },
      { status: 500 }
    )
  }
}
