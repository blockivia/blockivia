import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Blockivia',
  description: 'Certificados Web3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}