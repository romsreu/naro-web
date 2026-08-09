"use client"

import ProductCard from "@/components/product/ProductCard"
import styles from "./page.module.css"

const PRODUCTOS_PRUEBA = [
    {
        id: "1",
        nombre: "Auriculares Inalámbricos BT Pro Max",
        precio: 12499,
        precioOriginal: 19999,
        icono: "auriculares" as const,
        vendedor: "TechStore Argentina",
        rating: 5,
        totalReseñas: 1247,
        badge: "sale" as const,
    },
    {
        id: "2",
        nombre: "Smartwatch Serie 9 AMOLED 44mm",
        precio: 34900,
        icono: "smartwatch" as const,
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
        icono: "zapatillas" as const,
        vendedor: "SportZone Arg",
        rating: 5,
        totalReseñas: 3400,
        badge: "tendencia" as const,
    },
    {
        id: "4",
        nombre: "Notebook 15 pulgadas Intel i7 16GB RAM",
        precio: 289000,
        icono: "notebook" as const,
        vendedor: "CompuCenter",
        rating: 4,
        totalReseñas: 512,
    },
    {
        id: "5",
        nombre: "Cámara Mirrorless 24MP Kit 18-55mm",
        precio: 179000,
        precioOriginal: 239000,
        icono: "camara" as const,
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
                    <h2 className={styles.sectionTitle}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M23 6l-9.5 9.5-5-5L1 18" />
                            <path d="M17 6h6v6" />
                        </svg>
                        Más vendidos hoy
                    </h2>
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