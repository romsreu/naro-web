'use server'

import { NextRequest, NextResponse } from 'next/server'
import { AUTH_BASE_URL } from '@/lib/auth/config'
import { forwardSetCookies } from '@/lib/auth/cookies'

const AUTH_BASE = AUTH_BASE_URL

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

  forwardSetCookies(res, response.cookies)

  return response
}
