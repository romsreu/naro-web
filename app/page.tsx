"use client"

import ProductCard from "@/components/product/ProductCard"
import styles from "./page.module.css"

const PRODUCTOS_PRUEBA = [
    {
        id: "1",
        nombre: "Auriculares Inalámbricos BT Pro Max",
        precio: 12499,
        precioOriginal: 19999,
        imagen: "🎧",
        vendedor: "TechStore Argentina",
        rating: 5,
        totalReseñas: 1247,
        badge: "sale" as const,
    },
    {
        id: "2",
        nombre: "Smartwatch Serie 9 AMOLED 44mm",
        precio: 34900,
        imagen: "⌚",
        vendedor: "GadgetMundo",
        rating: 4,
        totalReseñas: 847,
        badge: "nuevo" as const,
    },
    {
        id: "3",
        nombre: "Zapatillas Running Air Suela Amortiguada",
        precio: 28500,
        precioOriginal: 35000,
        imagen: "👟",
        vendedor: "SportZone Arg",
        rating: 5,
        totalReseñas: 3400,
        badge: "tendencia" as const,
    },
    {
        id: "4",
        nombre: "Notebook 15 pulgadas Intel i7 16GB RAM",
        precio: 289000,
        imagen: "💻",
        vendedor: "CompuCenter",
        rating: 4,
        totalReseñas: 512,
    },
    {
        id: "5",
        nombre: "Cámara Mirrorless 24MP Kit 18-55mm",
        precio: 179000,
        precioOriginal: 239000,
        imagen: "📷",
        vendedor: "FotoShop",
        rating: 5,
        totalReseñas: 298,
        badge: "sale" as const,
    },
]

export default function HomePage() {
    return (
        <div className={styles.wrapper}>
            <section className={styles.section}>
                <div className={styles.sectionHead}>
                    <h2 className={styles.sectionTitle}>🔥 Más vendidos hoy</h2>
                    <span className={styles.sectionLink}>Ver todos →</span>
                </div>
                <div className={styles.grid}>
                    {PRODUCTOS_PRUEBA.map((producto) => (
                        <ProductCard key={producto.id} {...producto} />
                    ))}
                </div>
            </section>
        </div>
    )
}