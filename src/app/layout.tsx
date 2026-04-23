import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sitelo SAL — AMPM El Salvador',
  description: 'Sistema de scoring y evaluación de ubicaciones AMPM El Salvador',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
