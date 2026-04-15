'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Palette, Zap, ExternalLink, Instagram } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-gray-800 to-primary">
        <div className="absolute inset-0 bg-gray-800 opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <motion.h1 
              className="text-5xl md:text-7xl font-heading font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-secondary">Arte feita por uma</span>
              <br />
              <span className="text-gradient">fã, para fãs</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transforme seu personagem favorito em uma peça única de arte colecionável. 
              Action figures personalizadas em resina 3D, pintadas à mão com amor e dedicação.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-accent" />
              <span className="text-secondary font-medium">100% Artesanal</span>
            </div>
            <div className="flex items-center space-x-3">
              <Palette className="w-6 h-6 text-accent" />
              <span className="text-secondary font-medium">Pintura Manual</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="w-6 h-6 text-accent" />
              <span className="text-secondary font-medium">Alta Qualidade</span>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              href="/encomendas" 
              className="btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Encomende Agora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accentAlt to-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            
            <Link 
              href="/galeria" 
              className="btn-secondary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Ver Galeria
                <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a
              href="https://wa.me/5521986333478?text=Olá! Vi seu site e gostaria de conversar sobre uma encomenda."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">💬</span>
              WhatsApp Direto
            </a>
            
            <a
              href="https://instagram.com/from.stars.3d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="w-4 h-4 mr-2" />
              Instagram
            </a>
          </motion.div>

          <motion.div 
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <p className="text-gray-400 text-lg">
              Criado com ❤️ por <span className="text-accent font-medium">Camila</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">From Stars 3D</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-20 right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 bg-accentAlt/20 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </section>
  )
}

export default Hero 