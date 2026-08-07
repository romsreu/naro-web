import { NextRequest, NextResponse } from 'next/server'
import { getTokenExpiry } from '@/lib/auth/token'

const PUBLIC_ROUTES = ['/login', '/register', '/recuperar-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r))

  const accessToken = request.cookies.get('access_token')?.value
  const hasRefresh = request.cookies.has('refresh_token')

  const tokenValid = (() => {
    if (!accessToken) return false
    const exp = getTokenExpiry(accessToken)
    // A present-but-undecodable/corrupted token must be treated as
    // invalid, not waved through as if there were simply no expiry claim.
    if (exp === null) return false
    return exp * 1000 > Date.now()
  })()

  if (tokenValid) {
    if (isPublic) return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
  }

  // token expirado o ausente
  if (hasRefresh) {
    const refreshUrl = new URL('/api/auth/refresh', request.url)
    refreshUrl.searchParams.set('next', isPublic ? '/' : pathname)
    return NextResponse.redirect(refreshUrl)
  }

  if (!isPublic) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|api/auth/refresh).*)'],
}
