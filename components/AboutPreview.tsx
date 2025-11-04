'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Palette, Sparkles } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'

const AboutPreview = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Array de imagens para o carrossel
  const artistImages = [
    '/frieren/Frieren_01.png',
    '/mercy/mercy_01.png',
    '/roxy-migurdia/roxy_migurdia_01.png',
    '/going-merry/going_merry_01.png',
    '/this-is-fine/this_is_fine_01.png',
    '/frieren/Frieren_02.png',
    '/mercy/mercy_02.png',
    '/roxy-migurdia/roxy_migurdia_02.png',
    '/going-merry/going_merry_02.png',
    '/this-is-fine/this_is_fine_02.png',
  ]

  // Função para mudar para uma imagem aleatória
  const changeToRandomImage = useCallback(() => {
    setCurrentImageIndex(prevIndex => {
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * artistImages.length)
      } while (newIndex === prevIndex && artistImages.length > 1)
      return newIndex
    })
  }, [artistImages.length])

  // Efeito para mudar imagem automaticamente a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(changeToRandomImage, 4000)
    return () => clearInterval(interval)
  }, [changeToRandomImage])

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.h2 
                className="text-4xl md:text-5xl font-heading font-bold text-secondary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Olá, sou <span className="text-gradient">Camila</span>
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                A artista por trás da <span className="text-accent font-medium">From Stars 3D</span>. 
                Minha jornada começou com uma paixão por dar vida aos personagens que amo através da arte 3D.
              </motion.p>
              <motion.p
                className="text-lg text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Junto com Diego Silva e Victor Costa, formamos a equipe que dá vida a este projeto, unindo arte e tecnologia para criar algo único.
              </motion.p>
            </div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  Cada peça que crio é uma expressão do meu amor pelos universos que me inspiram - 
                  desde animes clássicos até jogos modernos.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Palette className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  Uso técnicas de pintura manual que aprendi ao longo dos anos, combinando precisão técnica 
                  com criatividade artística.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  Minha primeira peça foi a <span className="text-accent font-medium">Frieren</span>, 
                  que marcou o início desta jornada incrível de transformar sonhos em realidade.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/sobre" 
                className="inline-flex items-center text-accent hover:text-accentAlt transition-colors duration-300 font-medium group"
              >
                Conheça nossa história completa
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-accent/20 to-accentAlt/20 rounded-2xl p-8">
              <div className="w-full h-80 relative rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={artistImages[currentImageIndex]}
                      alt={`Camila - From Stars 3D - Imagem ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentImageIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-lg font-medium">Camila</p>
                      <p className="text-sm opacity-90">From Stars 3D</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Indicadores de progresso */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {artistImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        index === currentImageIndex 
                          ? 'bg-accent scale-125' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Botão para mudar manualmente */}
              <button
                onClick={changeToRandomImage}
                className="absolute top-4 left-4 bg-accent/80 hover:bg-accent text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
                aria-label="Mudar imagem"
              >
                <Sparkles size={16} />
              </button>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accentAlt/30 rounded-full blur-sm"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview