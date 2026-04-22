import Link from "next/link"
import styles from "./page.module.css"

export default function RegisterPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>

                <div className={styles.header}>
                    <div className={styles.icon}>🛍️</div>
                    <h1 className={styles.title}>Crear cuenta gratis</h1>
                    <p className={styles.subtitle}>
                        Unite a NARO y empezá a comprar y vender hoy.
                    </p>
                </div>

                <div className={styles.socialRow}>
                    <button className={styles.socialBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </button>
                    <button className={styles.socialBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                    </button>
                </div>

                <div className={styles.divider}>
                    <div className={styles.dividerLine} />
                    <span className={styles.dividerText}>o registrate con tu email</span>
                    <div className={styles.dividerLine} />
                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="nombre">NOMBRE</label>
                            <input
                                id="nombre"
                                type="text"
                                placeholder="Juan"
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="apellido">APELLIDO</label>
                            <input
                                id="apellido"
                                type="text"
                                placeholder="García"
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">EMAIL</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="tu@email.com"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">CONTRASEÑA</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Mínimo 8 caracteres"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="confirm">CONFIRMAR CONTRASEÑA</label>
                        <input
                            id="confirm"
                            type="password"
                            placeholder="Repetí tu contraseña"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.checkRow}>
                        <input type="checkbox" id="terms" className={styles.checkbox} />
                        <label htmlFor="terms" className={styles.checkLabel}>
                            Acepto los{" "}
                            <Link href="/terminos" className={styles.checkLink}>
                                términos y condiciones
                            </Link>{" "}
                            y la{" "}
                            <Link href="/privacidad" className={styles.checkLink}>
                                política de privacidad
                            </Link>
                        </label>
                    </div>

                    <button type="submit" className={styles.btnSubmit}>
                        Crear mi cuenta
                    </button>
                </form>

                <p className={styles.loginRow}>
                    ¿Ya tenés cuenta?{" "}
                    <Link href="/login" className={styles.loginLink}>
                        Iniciá sesión
                    </Link>
                </p>

                <div className={styles.trust}>
                    <div className={styles.trustItem}><span>🔒</span> Conexión segura</div>
                    <div className={styles.trustItem}><span>🛡️</span> Datos protegidos</div>
                    <div className={styles.trustItem}><span>✅</span> SSL encriptado</div>
                </div>

            </div>

            <div className={styles.legal}>
                <Link href="#">Términos y condiciones</Link>
                <Link href="#">Privacidad</Link>
                <Link href="#">Ayuda</Link>
            </div>
        </div>
    )
}