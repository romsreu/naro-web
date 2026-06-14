import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register', '/recuperar-password']

function getTokenExpiry(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return typeof payload.exp === 'number' ? payload.exp : null
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r))

  const accessToken = request.cookies.get('access_token')?.value
  const hasRefresh = request.cookies.has('refresh_token')

  const tokenValid = (() => {
    if (!accessToken) return false
    const exp = getTokenExpiry(accessToken)
    return exp === null || exp * 1000 > Date.now()
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
