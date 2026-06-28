import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "NARO — Marketplace",
    description: "Comprá y vendé en el marketplace de NARO",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    )
}