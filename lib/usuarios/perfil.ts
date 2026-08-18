import { USER_SERVICE_URL } from '@/lib/auth/config'

export type UsuarioPerfil = {
  id: number
  nombre: string
  apellido: string
  dni: string
  fechaNacimiento: string
  genero: string
  email: string
  telefono?: string
  ciudad?: string
  provincia?: string
  pais?: string
  miembroDesde: string
}

/**
 * Fetches the caller's own profile through the gateway. The gateway derives
 * X-User-Id from the JWT in the forwarded cookie, and user-service rejects
 * any id that doesn't match it — so this can only ever return the profile
 * of the user the access token belongs to.
 */
export async function getUsuarioPerfil(
  id: number,
  accessToken: string,
): Promise<UsuarioPerfil | null> {
  try {
    const res = await fetch(`${USER_SERVICE_URL}/${id}`, {
      headers: { Cookie: `access_token=${accessToken}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}
