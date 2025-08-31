import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'From Stars 3D - Impressão 3D de Qualidade',
  description: 'Serviços de impressão 3D de alta qualidade, modelagem, prototipagem e consultoria. Transforme suas ideias em realidade com a From Stars 3D.',
  metadataBase: new URL('https://fromstars3d.com'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/pt-BR',
    },
  },
  openGraph: {
    images: '/og-image.png',
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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
