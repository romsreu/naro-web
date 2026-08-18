'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import styles from './EditableCard.module.css'

export type CampoEditable = {
  key: string
  label: string
  /** Valor crudo, el que viaja al backend y el que carga el input al editar. */
  value: string
  type?: 'text' | 'date' | 'select'
  options?: string[]
  soloLectura?: boolean
  requerido?: boolean
  /** Solo afecta cómo se muestra en modo lectura (ej. formatear una fecha). */
  formatear?: (valor: string) => string
  badge?: { texto: string; variante: 'ok' | 'pendiente' }
}

type EditableCardProps = {
  titulo: string
  campos: CampoEditable[]
  onGuardar: (valores: Record<string, string>) => Promise<{ error?: string }>
}

export default function EditableCard({ titulo, campos, onGuardar }: EditableCardProps) {
  const router = useRouter()
  const [editando, setEditando] = useState(false)
  const [valores, setValores] = useState<Record<string, string>>(
    Object.fromEntries(campos.map((c) => [c.key, c.value])),
  )
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function empezarEdicion() {
    setValores(Object.fromEntries(campos.map((c) => [c.key, c.value])))
    setError(null)
    setEditando(true)
  }

  function cancelar() {
    setError(null)
    setEditando(false)
  }

  function guardar() {
    const faltante = campos.find((c) => c.requerido && !c.soloLectura && !valores[c.key]?.trim())
    if (faltante) {
      setError(`Completá "${faltante.label}"`)
      return
    }

    setError(null)
    startTransition(async () => {
      const editables = Object.fromEntries(
        campos.filter((c) => !c.soloLectura).map((c) => [c.key, valores[c.key] ?? '']),
      )
      const result = await onGuardar(editables)
      if (result.error) {
        setError(result.error)
        return
      }
      setEditando(false)
      router.refresh()
    })
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{titulo}</span>
        {editando ? (
          <div className={styles.actions}>
            <button type="button" className={styles.btnCancel} onClick={cancelar} disabled={pending}>
              Cancelar
            </button>
            <button type="button" className={styles.btnSave} onClick={guardar} disabled={pending}>
              {pending ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        ) : (
          <button type="button" className={styles.btnEdit} onClick={empezarEdicion}>
            Editar
          </button>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.rows}>
        {campos.map((campo) => (
          <div className={styles.row} key={campo.key}>
            <span className={styles.rowLabel}>{campo.label}</span>

            {editando && !campo.soloLectura ? (
              campo.type === 'select' ? (
                <select
                  className={styles.input}
                  value={valores[campo.key] ?? ''}
                  onChange={(e) => setValores((v) => ({ ...v, [campo.key]: e.target.value }))}
                >
                  <option value="" disabled>Seleccioná una opción</option>
                  {campo.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  className={styles.input}
                  type={campo.type ?? 'text'}
                  value={valores[campo.key] ?? ''}
                  onChange={(e) => setValores((v) => ({ ...v, [campo.key]: e.target.value }))}
                />
              )
            ) : (
              <span className={styles.rowValue}>
                {campo.value ? (campo.formatear ? campo.formatear(campo.value) : campo.value) : '—'}
              </span>
            )}

            {campo.badge && (
              <span
                className={`${styles.badge} ${campo.badge.variante === 'ok' ? styles.badgeOk : styles.badgePending}`}
              >
                {campo.badge.texto}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
