'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Palette, Zap, ExternalLink, Instagram } from 'lucide-react'
import { useState, useEffect } from 'react'

const Hero = () => {
  const bgImages = [
    '/frieren/Frieren_01.png',
    '/mercy/mercy_01.png',
    '/going-merry/going_merry_01.png',
    '/roxy-migurdia/roxy_migurdia_01.png',
    '/this-is-fine/this_is_fine_01.png'
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000); // changes every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gray-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgImages[currentBg]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-[1px]"></div>
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
              className="text-5xl md:text-7xl font-heading font-bold leading-tight uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-secondary">Transformando suas</span>
              <br />
              <span className="text-gradient">ideias em realidade</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Soluções em impressão 3D para projetos criativos, decorativos e funcionais.
              Acabamento cuidadoso, alta precisão e produção personalizada para cada ideia.
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
