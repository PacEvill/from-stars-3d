import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin')

  if (!isAdminRoute) return NextResponse.next()

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Não autenticado
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Sem permissão
  if (!(token as any).isAdmin) {
    const homeUrl = new URL('/', req.url)
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}
