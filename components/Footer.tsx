'use client'

import Link from 'next/link'
import { Instagram, Video, Heart, ArrowUp } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-accentAlt rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">3D</span>
              </div>
              <span className="text-xl font-heading font-bold text-gradient">
                From Stars 3D
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Transformando paixões em arte colecionável. Action figures personalizadas 
              em resina 3D, pintadas à mão com amor e dedicação pela artista Camila.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/from.stars.3d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@from.stars.3d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors duration-300"
                aria-label="TikTok"
              >
                <Video size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-heading font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/servicos" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-accent transition-colors duration-300">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-secondary font-heading font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="font-medium text-secondary">Camila</span>
              </li>
              <li>
                <a
                  href="https://wa.me/5521986333478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-accent transition-colors duration-300"
                >
                  +55 21 98633-3478
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@fromstars3d.com"
                  className="text-gray-400 hover:text-accent transition-colors duration-300"
                >
                  contato@fromstars3d.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
            <span>© 2024 From Stars 3D. Criado com</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>por Camila, Diego Silva & Victor.</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="text-gray-400 hover:text-accent transition-colors duration-300 p-2 hover:bg-gray-800 rounded-lg"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer