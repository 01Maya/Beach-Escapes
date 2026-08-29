import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' })
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Beach Escapes 🏖️ - Premium Travel Experiences✨',
  description: 'Discover breathtaking beaches, exciting activities and unforgettable memories with Beach Escapes✨',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-[#EAF7FB]`} style={{ scrollBehavior: 'smooth' }}>
      <body className="font-inter antialiased bg-[#EAF7FB] text-[#0F172A] min-h-screen" style={{ minHeight: '100svh' }}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
