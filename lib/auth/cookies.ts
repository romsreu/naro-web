export type CookieOptions = {
  httpOnly?: boolean
  secure?: boolean
  maxAge?: number
  path?: string
  sameSite?: 'strict' | 'lax' | 'none'
}

export interface CookieJar {
  set(name: string, value: string, options?: CookieOptions): unknown
}

/**
 * Parses the `Set-Cookie` headers from a backend `Response` and forwards
 * them to the given cookie jar — either the Server Action `cookies()`
 * store or a Route Handler's `NextResponse.cookies`.
 */
export function forwardSetCookies(response: Response, cookieJar: CookieJar): void {
  const setCookies = response.headers.getSetCookie()

  for (const cookieStr of setCookies) {
    const parts = cookieStr.split(';').map((p) => p.trim())
    const [nameValue, ...attrs] = parts
    const eqIdx = nameValue.indexOf('=')
    const name = nameValue.substring(0, eqIdx)
    const value = nameValue.substring(eqIdx + 1)

    const options: CookieOptions = {}
    for (const attr of attrs) {
      const lower = attr.toLowerCase()
      if (lower === 'httponly') options.httpOnly = true
      else if (lower === 'secure') options.secure = true
      else if (lower.startsWith('max-age=')) options.maxAge = parseInt(attr.split('=')[1])
      else if (lower.startsWith('path=')) options.path = attr.split('=')[1]
      else if (lower.startsWith('samesite='))
        options.sameSite = attr.split('=')[1].toLowerCase() as 'strict' | 'lax' | 'none'
    }

    cookieJar.set(name, value, options)
  }
}
