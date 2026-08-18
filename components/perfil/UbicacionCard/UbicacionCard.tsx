'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { PAISES, PROVINCIAS, PROVINCIAS_ARGENTINA } from '@/lib/geo/argentina'
import styles from './UbicacionCard.module.css'

type UbicacionCardProps = {
  pais: string
  provincia: string
  ciudad: string
  onGuardar: (valores: Record<string, string>) => Promise<{ error?: string }>
}

export default function UbicacionCard({ pais, provincia, ciudad, onGuardar }: UbicacionCardProps) {
  const router = useRouter()
  const [editando, setEditando] = useState(false)
  const [selPais, setSelPais] = useState(pais)
  const [selProvincia, setSelProvincia] = useState(provincia)
  const [selCiudad, setSelCiudad] = useState(ciudad)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const ciudadesDisponibles = selProvincia ? PROVINCIAS_ARGENTINA[selProvincia] ?? [] : []

  function empezarEdicion() {
    setSelPais(pais || PAISES[0])
    setSelProvincia(PROVINCIAS.includes(provincia) ? provincia : '')
    setSelCiudad(ciudad)
    setError(null)
    setEditando(true)
  }

  function cancelar() {
    setError(null)
    setEditando(false)
  }

  function elegirProvincia(nuevaProvincia: string) {
    setSelProvincia(nuevaProvincia)
    // La ciudad ya elegida puede no existir en la nueva provincia -> se resetea.
    setSelCiudad((actual) => (PROVINCIAS_ARGENTINA[nuevaProvincia]?.includes(actual) ? actual : ''))
  }

  function guardar() {
    if (!selPais || !selProvincia || !selCiudad) {
      setError('Completá país, provincia y ciudad')
      return
    }

    setError(null)
    startTransition(async () => {
      const result = await onGuardar({ pais: selPais, provincia: selProvincia, ciudad: selCiudad })
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
        <span className={styles.cardTitle}>Ubicación</span>
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
        <div className={styles.row}>
          <span className={styles.rowLabel}>País</span>
          {editando ? (
            <select
              className={styles.input}
              value={selPais}
              onChange={(e) => {
                setSelPais(e.target.value)
                setSelProvincia('')
                setSelCiudad('')
              }}
            >
              {PAISES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          ) : (
            <span className={styles.rowValue}>{pais || '—'}</span>
          )}
        </div>

        <div className={styles.row}>
          <span className={styles.rowLabel}>Provincia</span>
          {editando ? (
            <select
              className={styles.input}
              value={selProvincia}
              onChange={(e) => elegirProvincia(e.target.value)}
              disabled={!selPais}
            >
              <option value="" disabled>Seleccioná una provincia</option>
              {PROVINCIAS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          ) : (
            <span className={styles.rowValue}>{provincia || '—'}</span>
          )}
        </div>

        <div className={styles.row}>
          <span className={styles.rowLabel}>Ciudad</span>
          {editando ? (
            <select
              className={styles.input}
              value={selCiudad}
              onChange={(e) => setSelCiudad(e.target.value)}
              disabled={!selProvincia}
            >
              <option value="" disabled>
                {selProvincia ? 'Seleccioná una ciudad' : 'Elegí una provincia primero'}
              </option>
              {ciudadesDisponibles.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <span className={styles.rowValue}>{ciudad || '—'}</span>
          )}
        </div>
      </div>
    </div>
  )
}
