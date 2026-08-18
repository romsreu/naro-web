import { cookies } from 'next/headers'
import { decodeToken } from '@/lib/auth/token'
import { getUsuarioPerfil } from '@/lib/usuarios/perfil'
import styles from './page.module.css'

function formatMiembroDesde(fecha?: string): string {
  if (!fecha) return '—'
  return new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(
    new Date(fecha),
  )
}

function formatFechaNacimiento(fecha?: string): string {
  if (!fecha) return '—'
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date(fecha))
}

export default async function PerfilPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')?.value
  const payload = token ? decodeToken(token) : {}
  const perfil =
    token && typeof payload.id === 'number' ? await getUsuarioPerfil(payload.id, token) : null

  const nombre = perfil ? `${perfil.nombre} ${perfil.apellido}` : 'Usuario'
  const email = perfil?.email ?? payload.email ?? 'usuario@email.com'
  const inicial = nombre.charAt(0).toUpperCase()

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.avatar}>{inicial}</div>
        <div>
          <h1 className={styles.nombre}>{nombre}</h1>
          <p className={styles.since}>Miembro desde {formatMiembroDesde(perfil?.miembroDesde)}</p>
        </div>
      </div>

      {/* ── Información personal ── */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Información personal</span>
          <button className={styles.btnEdit} type="button">Editar</button>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Nombre completo</span>
            <span className={styles.rowValue}>{nombre}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>DNI</span>
            <span className={styles.rowValue}>{perfil?.dni ? '•••••••••' : '—'}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Fecha de nacimiento</span>
            <span className={styles.rowValue}>{formatFechaNacimiento(perfil?.fechaNacimiento)}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Género</span>
            <span className={styles.rowValue}>{perfil?.genero ?? '—'}</span>
          </div>
        </div>
      </div>

      {/* ── Contacto ── */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Contacto</span>
          <button className={styles.btnEdit} type="button">Editar</button>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Correo electrónico</span>
            <span className={styles.rowValue}>{email}</span>
            <span className={`${styles.badge} ${styles.badgeOk}`}>Verificado</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Teléfono</span>
            <span className={styles.rowValue}>{perfil?.telefono ?? '—'}</span>
            <span className={`${styles.badge} ${styles.badgePending}`}>Sin verificar</span>
          </div>
        </div>
      </div>

      {/* ── Ubicación ── */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Ubicación</span>
          <button className={styles.btnEdit} type="button">Editar</button>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Ciudad</span>
            <span className={styles.rowValue}>{perfil?.ciudad ?? '—'}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Provincia</span>
            <span className={styles.rowValue}>{perfil?.provincia ?? '—'}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>País</span>
            <span className={styles.rowValue}>{perfil?.pais ?? '—'}</span>
          </div>
        </div>
      </div>

    </div>
  )
}
