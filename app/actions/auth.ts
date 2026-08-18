'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AUTH_BASE_URL } from '@/lib/auth/config'
import { forwardSetCookies } from '@/lib/auth/cookies'

const AUTH_BASE = AUTH_BASE_URL

export type AuthState = {
  error?: string
}

async function forwardCookies(response: Response) {
  const cookieStore = await cookies()
  forwardSetCookies(response, cookieStore)
}

async function extractError(res: Response): Promise<string> {
  const body = await res.json().catch(() => ({}))
  if (typeof body.error === 'string') return body.error
  if (typeof body.message === 'string') return body.message
  // Spring validation errors: { field: "message", ... }
  const messages = Object.values(body as Record<string, string>).filter(
    (v) => typeof v === 'string',
  )
  return messages.length > 0 ? messages.join('. ') : 'Error inesperado'
}

export async function loginAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = formData.get('next') as string | null
  const redirectTo = next?.startsWith('/') ? next : '/'

  let res: Response
  try {
    res = await fetch(`${AUTH_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    return { error: 'No se pudo conectar con el servidor. Intentá más tarde.' }
  }

  if (!res.ok) {
    return { error: await extractError(res) }
  }

  await forwardCookies(res)
  redirect(redirectTo)
}

export async function registerAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const nombre = formData.get('nombre') as string
  const apellido = formData.get('apellido') as string
  const dni = formData.get('dni') as string
  const fechaNacimiento = formData.get('fechaNacimiento') as string
  const genero = formData.get('genero') as string
  const pais = formData.get('pais') as string
  const provincia = formData.get('provincia') as string
  const ciudad = formData.get('ciudad') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm') as string

  let res: Response
  try {
    res = await fetch(`${AUTH_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        genero,
        pais,
        provincia,
        ciudad,
        email,
        password,
        confirmPassword,
      }),
    })
  } catch {
    return { error: 'No se pudo conectar con el servidor. Intentá más tarde.' }
  }

  if (!res.ok) {
    return { error: await extractError(res) }
  }

  await forwardCookies(res)
  redirect('/')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value

  try {
    await fetch(`${AUTH_BASE}/logout`, {
      method: 'POST',
      headers: refreshToken ? { Cookie: `refresh_token=${refreshToken}` } : {},
    })
  } catch {
    // limpieza local igual
  }

  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
  redirect('/login')
}

export async function refreshAction(): Promise<boolean> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh_token')?.value

  if (!refreshToken) return false

  let res: Response
  try {
    res = await fetch(`${AUTH_BASE}/refresh`, {
      method: 'POST',
      headers: { Cookie: `refresh_token=${refreshToken}` },
    })
  } catch {
    return false
  }

  if (!res.ok) return false

  await forwardCookies(res)
  return true
}
