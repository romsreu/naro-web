export type TokenPayload = {
  nombre?: string
  email?: string
  [key: string]: unknown
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  return atob(base64)
}

export function decodeToken(token: string): TokenPayload {
  try {
    return JSON.parse(base64UrlDecode(token.split('.')[1]))
  } catch {
    return {}
  }
}

/**
 * Extracts the `exp` claim (seconds since epoch) from a JWT.
 * Returns `null` when the token is malformed/undecodable or has no
 * numeric `exp` claim.
 */
export function getTokenExpiry(token: string): number | null {
  const payload = decodeToken(token)
  return typeof payload.exp === 'number' ? payload.exp : null
}
