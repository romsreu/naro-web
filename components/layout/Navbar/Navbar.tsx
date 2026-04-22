import Link from "next/link"
import styles from "./Navbar.module.css"

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
        <div className={styles.inner}>

            {/* Logo */}
            <Link href="/public" className={styles.logo}>
        NA<span className={styles.logoAccent}>R</span>O
        </Link>

    {/* Buscador */}
    <div className={styles.searchWrap}>
    <svg
        className={styles.searchIcon}
    width="15" height="15"
    viewBox="0 0 20 20" fill="none"
    >
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M15 15l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
    type="text"
    placeholder="Buscar productos, marcas, vendedores…"
    className={styles.searchInput}
    />
    <kbd className={styles.searchKbd}>⌘K</kbd>
    </div>

    {/* Acciones */}
    <div className={styles.actions}>
    <Link href="/cuenta/compras" className={styles.navLink}>
        Mis compras
    </Link>
    <Link href="/favoritos" className={styles.navLink}>
        Favoritos
        </Link>
        <Link href="/login" className={styles.btnLogin}>
        Iniciar sesión
    </Link>

    {/* Carrito */}
    <Link href="/carrito" className={styles.cartBtn}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
    stroke="currentColor" strokeWidth="1.8"
    />
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
        <span className={styles.cartBadge}>2</span>
        </Link>
        </div>

        </div>
        </nav>
)
}