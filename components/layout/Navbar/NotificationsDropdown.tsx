'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './NotificationsDropdown.module.css'

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'order',
    text: 'Tu pedido #4521 fue enviado y está en camino',
    time: 'hace 5 min',
    unread: true,
  },
  {
    id: '2',
    type: 'promo',
    text: '¡Aprovechá 30% OFF en toda la categoría electrónica!',
    time: 'hace 2 horas',
    unread: true,
  },
  {
    id: '3',
    type: 'message',
    text: 'Romi te preguntó por el iPhone 14 Pro que publicaste',
    time: 'hace 1 día',
    unread: false,
  },
  {
    id: '4',
    type: 'view',
    text: 'Tu publicación "Bicicleta de montaña" tuvo 47 visitas hoy',
    time: 'ayer',
    unread: false,
  },
]

const ICONS: Record<string, React.ReactNode> = {
  order: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  promo: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  message: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  view: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
}

const UNREAD_COUNT = NOTIFICATIONS.filter(n => n.unread).length

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        type="button"
        aria-label="Notificaciones"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {UNREAD_COUNT > 0 && <span className={styles.badge}>{UNREAD_COUNT}</span>}
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Notificaciones</span>
            {UNREAD_COUNT > 0 && (
              <span className={styles.unreadPill}>{UNREAD_COUNT} nuevas</span>
            )}
          </div>

          <div className={styles.list}>
            {NOTIFICATIONS.map(notif => (
              <div key={notif.id} className={`${styles.notif} ${notif.unread ? styles.unread : ''}`}>
                <span className={`${styles.notifIcon} ${styles[`icon_${notif.type}`]}`}>
                  {ICONS[notif.type]}
                </span>
                <div className={styles.notifBody}>
                  <p className={styles.notifText}>{notif.text}</p>
                  <span className={styles.notifTime}>{notif.time}</span>
                </div>
                {notif.unread && <span className={styles.dot} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
