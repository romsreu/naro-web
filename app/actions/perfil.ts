'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { decodeToken } from '@/lib/auth/token'
import { USER_SERVICE_URL } from '@/lib/auth/config'

export type ActualizarPerfilResult = { error?: string }

export async function actualizarPerfilAction(
  campos: Record<string, string>,
): Promise<ActualizarPerfilResult> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const payload = accessToken ? decodeToken(accessToken) : {}

  if (!accessToken || typeof payload.id !== 'number') {
    return { error: 'Tu sesión expiró, volvé a iniciar sesión.' }
  }

  let res: Response
  try {
    res = await fetch(`${USER_SERVICE_URL}/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `access_token=${accessToken}`,
      },
      body: JSON.stringify(campos),
    })
  } catch {
    return { error: 'No se pudo conectar con el servidor. Intentá más tarde.' }
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    return {
      error: typeof body.error === 'string' ? body.error : 'No se pudieron guardar los cambios.',
    }
  }

  revalidatePath('/cuenta/perfil')
  return {}
}
