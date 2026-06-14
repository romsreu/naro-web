'use server'

import { NextRequest, NextResponse } from 'next/server'

const AUTH_BASE = process.env.AUTH_SERVICE_URL ?? 'http://localhost:8443/auth-service/api/auth'

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get('next') ?? '/'
  const refreshToken = request.cookies.get('refresh_token')?.value

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  let res: Response
  try {
    res = await fetch(`${AUTH_BASE}/refresh`, {
      method: 'POST',
      headers: { Cookie: `refresh_token=${refreshToken}` },
    })
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (!res.ok) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('access_token')
    response.cookies.delete('refresh_token')
    return response
  }

  const response = NextResponse.redirect(new URL(next, request.url))

  for (const cookieStr of res.headers.getSetCookie()) {
    const parts = cookieStr.split(';').map((p) => p.trim())
    const [nameValue, ...attrs] = parts
    const eqIdx = nameValue.indexOf('=')
    const name = nameValue.substring(0, eqIdx)
    const value = nameValue.substring(eqIdx + 1)

    const options: Parameters<typeof response.cookies.set>[2] = {}
    for (const attr of attrs) {
      const lower = attr.toLowerCase()
      if (lower === 'httponly') options.httpOnly = true
      else if (lower === 'secure') options.secure = true
      else if (lower.startsWith('max-age=')) options.maxAge = parseInt(attr.split('=')[1])
      else if (lower.startsWith('path=')) options.path = attr.split('=')[1]
      else if (lower.startsWith('samesite='))
        options.sameSite = attr.split('=')[1].toLowerCase() as 'strict' | 'lax' | 'none'
    }

    response.cookies.set(name, value, options)
  }

  return response
}
