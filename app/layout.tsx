import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: "NARO — Marketplace",
  description: "Comprá y vendé en el marketplace de NARO",
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="es">
      <body>
      <Navbar />
      <main>{children}</main>
      </body>
      </html>
  )
}