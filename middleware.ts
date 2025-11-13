import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')

  if (!isAdminRoute) return NextResponse.next()

  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Não autenticado
    if (!token) {
      console.log('[MIDDLEWARE] Token ausente, redirecionando para /login')
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    // Sem permissão
    if (!(token as any).isAdmin) {
      console.log('[MIDDLEWARE] Usuário não admin, redirecionando para /')
      const homeUrl = new URL('/', req.url)
      return NextResponse.redirect(homeUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('[MIDDLEWARE] Erro ao processar token JWT:', error)
    // Se falhar ao ler token, assume não autenticado
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
