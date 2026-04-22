import Link from "next/link"
import styles from "./ProductCard.module.css"

type Props = {
    id: string
    nombre: string
    precio: number
    precioOriginal?: number
    imagen: string
    vendedor: string
    rating: number
    totalReseñas: number
    badge?: "sale" | "nuevo" | "tendencia"
    onAgregarCarrito?: (id: string) => void
}

export default function ProductCard({
                                        id,
                                        nombre,
                                        precio,
                                        precioOriginal,
                                        imagen,
                                        vendedor,
                                        rating,
                                        totalReseñas,
                                        badge,
                                        onAgregarCarrito,
                                    }: Props) {
    const descuento = precioOriginal
        ? Math.round(((precioOriginal - precio) / precioOriginal) * 100)
        : null

    const estrellas = Array.from({ length: 5 }, (_, i) =>
        i < Math.round(rating) ? "★" : "☆"
    ).join("")

    return (
        <div className={styles.card}>
            <Link href={`/productos/${id}`} className={styles.imgWrap}>

                {/* Badge */}
                {badge && (
                    <span className={`${styles.badge} ${styles[badge]}`}>
            {badge === "sale" && `−${descuento}%`}
                        {badge === "nuevo" && "Nuevo"}
                        {badge === "tendencia" && "Tendencia"}
          </span>
                )}

                {/* Imagen */}
                <div className={styles.img}>
                    <span className={styles.emoji}>{imagen}</span>
                </div>

            </Link>

            <div className={styles.info}>
                {/* Vendedor */}
                <div className={styles.vendedor}>{vendedor}</div>

                {/* Nombre */}
                <Link href={`/productos/${id}`} className={styles.nombre}>
                    {nombre}
                </Link>

                {/* Rating */}
                <div className={styles.ratingRow}>
                    <span className={styles.estrellas}>{estrellas}</span>
                    <span className={styles.reseñas}>({totalReseñas.toLocaleString("es-AR")})</span>
                </div>

                {/* Precio */}
                <div className={styles.bottom}>
                    <div className={styles.precios}>
            <span className={styles.precio}>
              ${precio.toLocaleString("es-AR")}
            </span>
                        {precioOriginal && (
                            <span className={styles.precioOriginal}>
                ${precioOriginal.toLocaleString("es-AR")}
              </span>
                        )}
                    </div>

                    <button
                        className={styles.btnCarrito}
                        onClick={() => onAgregarCarrito?.(id)}
                        aria-label="Agregar al carrito"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}