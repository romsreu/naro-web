import { cookies } from 'next/headers'
import { decodeToken } from '@/lib/auth/token'
import { getUsuarioPerfil } from '@/lib/usuarios/perfil'
import { actualizarPerfilAction } from '@/app/actions/perfil'
import EditableCard from '@/components/perfil/EditableCard/EditableCard'
import UbicacionCard from '@/components/perfil/UbicacionCard/UbicacionCard'
import styles from './page.module.css'

const OPCIONES_GENERO = ['Femenino', 'Masculino', 'Otro', 'Prefiero no decir']

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

      <EditableCard
        titulo="Información personal"
        onGuardar={actualizarPerfilAction}
        campos={[
          { key: 'nombre', label: 'Nombre', value: perfil?.nombre ?? '', requerido: true },
          { key: 'apellido', label: 'Apellido', value: perfil?.apellido ?? '', requerido: true },
          {
            key: 'dni',
            label: 'DNI',
            value: perfil?.dni ? '•••••••••' : '',
            soloLectura: true,
          },
          {
            key: 'fechaNacimiento',
            label: 'Fecha de nacimiento',
            value: perfil?.fechaNacimiento ?? '',
            mostrar: formatFechaNacimiento(perfil?.fechaNacimiento),
            type: 'date',
            requerido: true,
          },
          {
            key: 'genero',
            label: 'Género',
            value: perfil?.genero ?? '',
            type: 'select',
            options: OPCIONES_GENERO,
            requerido: true,
          },
        ]}
      />

      <EditableCard
        titulo="Contacto"
        onGuardar={actualizarPerfilAction}
        campos={[
          {
            key: 'email',
            label: 'Correo electrónico',
            value: email,
            soloLectura: true,
            badge: { texto: 'Verificado', variante: 'ok' },
          },
          {
            key: 'telefono',
            label: 'Teléfono',
            value: perfil?.telefono ?? '',
            badge: { texto: 'Sin verificar', variante: 'pendiente' },
          },
        ]}
      />

      <UbicacionCard
        pais={perfil?.pais ?? ''}
        provincia={perfil?.provincia ?? ''}
        ciudad={perfil?.ciudad ?? ''}
        onGuardar={actualizarPerfilAction}
      />

    </div>
  )
}
