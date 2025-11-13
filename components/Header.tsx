'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/components/CartProvider'
import { Menu, X, Instagram, Video, User, LogOut, ShoppingCart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Types
type NavItem = {
  name: string
  href: string
}

const Header = () => {
  // State
  const { data: session, status } = useSession()
  const { cart, openCart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const itemCount = cart?.itens?.reduce((acc, item) => acc + item.quantidade, 0) || 0

  // Constants
  const NAV_ITEMS: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Serviços', href: '/servicos' },
    { name: 'Portfólio', href: '/portfolio' },
    { name: 'Materiais', href: '/guia-materiais' },
    { name: 'Orçamento', href: '/orcamento' },
    { name: 'Sobre', href: '/sobre' },

  ]

  const SOCIAL_LINKS = [
    {
      icon: <Instagram size={20} />,
      href: 'https://instagram.com/from.stars.3d',
      label: 'Instagram'
    },
    {
      icon: <Video size={20} />,
      href: 'https://tiktok.com/@from.stars.3d',
      label: 'TikTok'
    }
  ]

  // Handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const AuthLinks = () => {
    if (status === "loading") {
      return <div className="w-24 h-8 bg-gray-700 rounded animate-pulse"></div>
    }

    if (status === "authenticated") {
      const isAdmin = (session?.user as any)?.isAdmin
      
      return (
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link href="/admin" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Admin
            </Link>
          )}
          <Link href="/perfil" className="flex items-center text-secondary hover:text-accent transition-colors duration-300">
            <User size={20} className="mr-1" />
            Perfil
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center text-secondary hover:text-accent transition-colors duration-300">
            <LogOut size={20} className="mr-1" />
            Sair
          </button>
        </div>
      )
    }

    return (
      <div className="flex items-center space-x-4">
        <Link href="/login" className="btn-secondary py-1 px-3 text-sm">Entrar</Link>
        <Link href="/cadastro" className="btn-primary py-1 px-3 text-sm">Cadastrar</Link>
      </div>
    )
  }

  const CartIcon = () => (
    <button onClick={openCart} className="relative text-secondary hover:text-accent transition-colors duration-300">
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
          {itemCount}
        </span>
      )}
    </button>
  )

  const MobileAuthLinks = () => {
    if (status === "loading") {
      return <div className="w-full h-10 bg-gray-700 rounded animate-pulse"></div>
    }

    if (status === "authenticated") {
      return (
        <div className="space-y-4">
            <Link href="/perfil" onClick={() => setIsMenuOpen(false)} className="flex items-center text-secondary hover:text-accent transition-colors duration-300 font-medium py-2">
                <User size={20} className="mr-2" />
                Perfil
            </Link>
            <button onClick={() => { signOut({ callbackUrl: '/' }); setIsMenuOpen(false); }} className="flex items-center w-full text-left text-secondary hover:text-accent transition-colors duration-300 font-medium py-2">
                <LogOut size={20} className="mr-2" />
                Sair
            </button>
        </div>
      )
    }

    return (
        <div className="flex items-center space-x-2">
            <Link href="/login" className="btn-secondary py-1 px-3 text-sm w-full text-center">Entrar</Link>
            <Link href="/cadastro" className="btn-primary py-1 px-3 text-sm w-full text-center">Cadastrar</Link>
        </div>
    )
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary/98 backdrop-blur-lg shadow-lg border-b border-gray-600' 
        : 'bg-primary/95 backdrop-blur-md border-b border-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo e Navegação Principal */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-12">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-accentAlt rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <span className="text-xl font-heading font-bold text-gradient">
                From Stars 3D
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative text-secondary hover:text-accent transition-all duration-300 font-medium py-2 px-1 group ${
                      isActive ? 'text-accent' : ''
                    }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Login/Cadastro, Carrinho e Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthLinks />
            <div className="border-l border-gray-600 h-6 mx-2"></div>
            <CartIcon />
            <div className="border-l border-gray-600 h-6 mx-2"></div>
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-secondary hover:text-accent transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800 border-t border-gray-700"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="mb-4">
                <MobileAuthLinks />
              </div>
              <button onClick={() => { openCart(); setIsMenuOpen(false); }} className="flex items-center text-secondary hover:text-accent transition-colors duration-300 font-medium py-2">
                  <ShoppingCart size={20} className="mr-2" />
                  Carrinho ({itemCount})
              </button>
              <div className="border-t border-gray-700"></div>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-secondary hover:text-accent transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-600">
                {SOCIAL_LINKS.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-accent transition-colors duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
