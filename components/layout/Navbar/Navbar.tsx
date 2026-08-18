import { cookies } from 'next/headers'
import Link from 'next/link'
import { decodeToken } from '@/lib/auth/token'
import { getUsuarioPerfil } from '@/lib/usuarios/perfil'
import CartDropdown from './CartDropdown'
import NotificationsDropdown from './NotificationsDropdown'
import UserDropdown from './UserDropdown'
import styles from './Navbar.module.css'

export default async function Navbar() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const { id } = accessToken ? decodeToken(accessToken) : { id: undefined }
  const perfil = accessToken && typeof id === 'number' ? await getUsuarioPerfil(id, accessToken) : null
  // El dropdown depende solo de estar autenticado, no de que el fetch del
  // perfil haya funcionado -> si user-service no responde, cae a un nombre
  // generico pero la navegacion (Mi perfil, Configuraciones, salir) sigue andando.
  const nombre = accessToken ? (perfil ? `${perfil.nombre} ${perfil.apellido}` : 'Usuario') : null

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>

        <Link href="/" className={styles.logo}>
          NA<span className={styles.logoAccent}>R</span>O
        </Link>

        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
            <path d="M15 15l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Buscar productos, marcas, vendedores…"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.actions}>

          <CartDropdown />
          <NotificationsDropdown />

          {nombre ? (
            <UserDropdown nombre={nombre} />
          ) : (
            <Link href="/login" className={styles.accountBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Mi cuenta
            </Link>
          )}

        </div>
      </div>
    </nav>
  )
}
