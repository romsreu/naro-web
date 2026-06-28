import styles from './page.module.css'

export default function ConfiguracionesPage() {
  return (
    <div className={styles.page}>

      {/* ── Seguridad ── */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Seguridad</span>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>Contraseña</span>
              <span className={styles.rowDesc}>Última modificación hace 3 meses</span>
            </div>
            <button className={styles.btnAction} type="button">Cambiar</button>
          </div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>Autenticación en dos pasos</span>
              <span className={styles.rowDesc}>Añadí una capa extra de seguridad a tu cuenta</span>
            </div>
            <div className={`${styles.toggle} ${styles.toggleOff}`}>
              <div className={styles.toggleThumb} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Notificaciones ── */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Notificaciones</span>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>Correo electrónico</span>
              <span className={styles.rowDesc}>Recibí novedades, ofertas y estado de tus pedidos</span>
            </div>
            <div className={`${styles.toggle} ${styles.toggleOn}`}>
              <div className={styles.toggleThumb} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>Notificaciones push</span>
              <span className={styles.rowDesc}>Alertas en tiempo real en tu navegador</span>
            </div>
            <div className={`${styles.toggle} ${styles.toggleOn}`}>
              <div className={styles.toggleThumb} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>SMS</span>
              <span className={styles.rowDesc}>Mensajes de texto para confirmaciones importantes</span>
            </div>
            <div className={`${styles.toggle} ${styles.toggleOff}`}>
              <div className={styles.toggleThumb} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Zona de peligro ── */}
      <div className={`${styles.card} ${styles.cardDanger}`}>
        <div className={styles.cardHeader}>
          <span className={styles.cardTitle}>Zona de peligro</span>
        </div>
        <div className={styles.rows}>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>Desactivar cuenta</span>
              <span className={styles.rowDesc}>Tu cuenta se pausará temporalmente y no será visible</span>
            </div>
            <button className={styles.btnDangerOutline} type="button">Desactivar</button>
          </div>
          <div className={styles.row}>
            <div className={styles.rowInfo}>
              <span className={styles.rowLabel}>Eliminar cuenta</span>
              <span className={styles.rowDesc}>Esta acción es permanente y no se puede deshacer</span>
            </div>
            <button className={styles.btnDanger} type="button">Eliminar</button>
          </div>
        </div>
      </div>

    </div>
  )
}
