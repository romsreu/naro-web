import { cookies } from 'next/headers'
import Link from 'next/link'
import { logoutAction } from '@/app/actions/auth'
import styles from './Navbar.module.css'

function getNombreFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.nombre ?? null
  } catch {
    return null
  }
}

export default async function Navbar() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  const nombre = accessToken ? getNombreFromToken(accessToken) : null

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
          <kbd className={styles.searchKbd}>⌘K</kbd>
        </div>

        <div className={styles.actions}>
          <Link href="/cuenta/compras" className={styles.navLink}>Mis compras</Link>
          <Link href="/favoritos" className={styles.navLink}>Favoritos</Link>

          {nombre ? (
            <div className={styles.userRow}>
              <span className={styles.userName}>Hola, {nombre}</span>
              <form action={logoutAction}>
                <button type="submit" className={styles.btnLogout}>Cerrar sesión</button>
              </form>
            </div>
          ) : (
            <Link href="/login" className={styles.btnLogin}>Iniciar sesión</Link>
          )}

          <Link href="/carrito" className={styles.cartBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" />
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            <span className={styles.cartBadge}>2</span>
          </Link>
        </div>

      </div>
    </nav>
  )
}
