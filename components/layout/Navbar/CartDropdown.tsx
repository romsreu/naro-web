'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './CartDropdown.module.css'

const CART_ITEMS = [
  { id: '1', nombre: 'Auriculares Inalámbricos BT Pro Max', precio: 12499, cantidad: 1, imagen: '🎧' },
  { id: '2', nombre: 'Smartwatch Serie 9 AMOLED 44mm', precio: 34900, cantidad: 1, imagen: '⌚' },
  { id: '3', nombre: 'Zapatillas Running Air Suela Amortiguada', precio: 28500, cantidad: 2, imagen: '👟' },
]

export default function CartDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  const subtotal = CART_ITEMS.reduce((s, i) => s + i.precio * i.cantidad, 0)

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        type="button"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        Carrito
        <span className={styles.badge}>{CART_ITEMS.length}</span>
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Mi carrito</span>
            <span className={styles.panelCount}>{CART_ITEMS.length} productos</span>
          </div>

          <div className={styles.items}>
            {CART_ITEMS.map(item => (
              <div key={item.id} className={styles.item}>
                <span className={styles.itemImg}>{item.imagen}</span>
                <div className={styles.itemInfo}>
                  <span className={styles.itemNombre}>{item.nombre}</span>
                  <span className={styles.itemMeta}>Cantidad: {item.cantidad}</span>
                </div>
                <span className={styles.itemPrecio}>
                  ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                </span>
              </div>
            ))}
          </div>

          <div className={styles.panelFooter}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span className={styles.subtotalVal}>${subtotal.toLocaleString('es-AR')}</span>
            </div>
            <button className={styles.btnVer} type="button">
              Ver carrito completo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
