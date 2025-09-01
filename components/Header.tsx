'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Instagram, Video } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Types
type NavItem = {
  name: string
  href: string
}

const Header = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

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

          {/* Login/Cadastro e Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="btn-secondary py-1 px-3 text-sm">Entrar</Link>
            <Link href="/cadastro" className="btn-primary py-1 px-3 text-sm">Cadastrar</Link>
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
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/login" className="btn-secondary py-1 px-3 text-sm w-full text-center">Entrar</Link>
                <Link href="/cadastro" className="btn-primary py-1 px-3 text-sm w-full text-center">Cadastrar</Link>
              </div>
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