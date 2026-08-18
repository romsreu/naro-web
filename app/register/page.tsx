'use client'

import Link from 'next/link'
import { useState, useActionState } from 'react'
import { registerAction } from '../actions/auth'
import { PAISES, PROVINCIAS, PROVINCIAS_ARGENTINA } from '@/lib/geo/argentina'
import styles from './page.module.css'

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerAction, {})
  const [localError, setLocalError] = useState<string | null>(null)
  const [provincia, setProvincia] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    const confirm = (form.elements.namedItem('confirm') as HTMLInputElement).value

    if (password !== confirm) {
      e.preventDefault()
      setLocalError('Las contraseñas no coinciden')
      return
    }
    setLocalError(null)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        <div className={styles.header}>
          <div className={styles.icon}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h1 className={styles.title}>Crear cuenta gratis</h1>
          <p className={styles.subtitle}>
            Unite a NARO y empezá a comprar y vender hoy.
          </p>
        </div>

        <div className={styles.socialRow}>
          <button className={styles.socialBtn} type="button">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button className={styles.socialBtn} type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </button>
        </div>

        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>o registrate con tu email</span>
          <div className={styles.dividerLine} />
        </div>

        <form action={action} onSubmit={handleSubmit} className={styles.form}>

          {(localError ?? state.error) && (
            <div className={styles.error} role="alert">
              {localError ?? state.error}
            </div>
          )}

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="nombre">NOMBRE</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Juan"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="apellido">APELLIDO</label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                placeholder="García"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="dni">DNI</label>
              <input
                id="dni"
                name="dni"
                type="text"
                inputMode="numeric"
                placeholder="12345678"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fechaNacimiento">FECHA DE NACIMIENTO</label>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="genero">GÉNERO</label>
            <select id="genero" name="genero" className={styles.input} required defaultValue="">
              <option value="" disabled>Seleccioná una opción</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="pais">PAÍS</label>
            <select id="pais" name="pais" className={styles.input} defaultValue={PAISES[0]}>
              {PAISES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="provincia">PROVINCIA (opcional)</label>
              <select
                id="provincia"
                name="provincia"
                className={styles.input}
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
              >
                <option value="">Sin especificar</option>
                {PROVINCIAS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="ciudad">CIUDAD (opcional)</label>
              <select
                key={provincia}
                id="ciudad"
                name="ciudad"
                className={styles.input}
                defaultValue=""
                disabled={!provincia}
              >
                <option value="">{provincia ? 'Sin especificar' : 'Elegí una provincia primero'}</option>
                {(PROVINCIAS_ARGENTINA[provincia] ?? []).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">EMAIL</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">CONTRASEÑA</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              className={styles.input}
              required
              minLength={8}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirm">CONFIRMAR CONTRASEÑA</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Repetí tu contraseña"
              className={styles.input}
              required
              minLength={8}
            />
          </div>

          <div className={styles.checkRow}>
            <input type="checkbox" id="terms" className={styles.checkbox} required />
            <label htmlFor="terms" className={styles.checkLabel}>
              Acepto los{' '}
              <Link href="/terminos" className={styles.checkLink}>términos y condiciones</Link>
              {' '}y la{' '}
              <Link href="/privacidad" className={styles.checkLink}>política de privacidad</Link>
            </label>
          </div>

          <button type="submit" disabled={isPending} className={styles.btnSubmit}>
            {isPending ? 'Creando cuenta...' : 'Crear mi cuenta'}
          </button>

        </form>

        <p className={styles.loginRow}>
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className={styles.loginLink}>Iniciá sesión</Link>
        </p>

        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Conexión segura
          </div>
          <div className={styles.trustItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Datos protegidos
          </div>
          <div className={styles.trustItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            SSL encriptado
          </div>
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
