import styles from './page.module.css'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Producto en construcción</h1>
        <p className={styles.slug}>slug: {slug}</p>
      </div>
    </div>
  )
}
