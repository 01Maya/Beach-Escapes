import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' })
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Beach Escapes - Premium Travel Experiences',
  description: 'Discover breathtaking beaches, exciting activities and unforgettable memories with Beach Escapes.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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
