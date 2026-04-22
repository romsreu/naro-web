import Link from "next/link"
import styles from "./Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>

                <div className={styles.top}>
                    {/* Logo y descripción */}
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            NA<span className={styles.logoAccent}>R</span>O
                        </div>
                        <p className={styles.desc}>
                            El marketplace donde todos compran y venden.
                            Simple, seguro y con millones de artículos.
                        </p>
                    </div>

                    {/* Links */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Comprar</h4>
                        <ul className={styles.links}>
                            <li><Link href="#">Ofertas del día</Link></li>
                            <li><Link href="#">Categorías</Link></li>
                            <li><Link href="#">Mis compras</Link></li>
                            <li><Link href="#">Favoritos</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Vender</h4>
                        <ul className={styles.links}>
                            <li><Link href="#">Publicar gratis</Link></li>
                            <li><Link href="#">Centro de vendedores</Link></li>
                            <li><Link href="#">Cuentas empresa</Link></li>
                            <li><Link href="#">Tarifas</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Ayuda</h4>
                        <ul className={styles.links}>
                            <li><Link href="#">Centro de ayuda</Link></li>
                            <li><Link href="#">Envíos y devoluciones</Link></li>
                            <li><Link href="#">Resolución de problemas</Link></li>
                            <li><Link href="#">Contacto</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
          <span className={styles.copy}>
            © 2026 NARO — Todos los derechos reservados
          </span>
                    <div className={styles.legal}>
                        <Link href="#">Términos</Link>
                        <Link href="#">Privacidad</Link>
                        <Link href="#">Cookies</Link>
                    </div>
                </div>

            </div>
        </footer>
    )
}