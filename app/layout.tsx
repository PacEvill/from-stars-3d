import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { CartProvider } from '@/components/CartProvider'
import Header from '@/components/Header'
import CartMenu from '@/components/CartMenu'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'From Stars 3D',
  description: 'Impressões 3D de alta qualidade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CartProvider>
            <Header />
            <CartMenu />
            {children}
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
