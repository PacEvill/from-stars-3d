import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cookieStore = cookies()
    const allCookies = cookieStore.getAll()

    const cookieInfo = allCookies.map(cookie => ({
      name: cookie.name,
      size: cookie.value.length,
      sizeKB: (cookie.value.length / 1024).toFixed(2),
      preview: cookie.value.substring(0, 50) + (cookie.value.length > 50 ? '...' : '')
    }))

    const totalSize = allCookies.reduce((sum, c) => sum + c.value.length, 0)

    return NextResponse.json({
      totalCookies: allCookies.length,
      totalSizeBytes: totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      cookies: cookieInfo,
      recommendation: totalSize > 4096 
        ? '⚠️ Total cookies > 4KB! This may cause 431 errors. Clear cookies or reduce payload.'
        : '✅ Cookie size looks acceptable.'
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to read cookies',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
