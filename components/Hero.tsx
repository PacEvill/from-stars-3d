'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const SLIDE_INTERVAL = 6000

const Hero = () => {
  const bannerImages = [
    { src: '/fotos/Velma/0.jpg', alt: 'Velma' },
    { src: '/fotos/Alice/0.jpg', alt: 'Alice' },
    { src: '/fotos/Hornet/0.jpg', alt: 'Hornet' },
    { src: '/fotos/Roxy/0.jpg', alt: 'Roxy' },
    { src: '/fotos/2B/0.jpg', alt: '2B' },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bannerImages.length)
    }, SLIDE_INTERVAL)

    return () => clearInterval(interval)
  }, [bannerImages.length])

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:min-h-[90vh]">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {bannerImages.map((image, index) => (
            <div key={image.alt} className="relative h-full w-full flex-shrink-0">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === activeIndex}
                className="object-cover brightness-75"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-primary/70 to-primary" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-secondary sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-[28px] bg-primary/80 shadow-[0_0_40px_rgba(138,43,226,0.45)] sm:h-40 sm:w-40 sm:rounded-[32px] md:h-44 md:w-44">
            <Image
              src="/fotos/itens/FROM STARS icon.png"
              alt="From Stars 3D"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-heading font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              From Stars 3D
            </h1>
            <p className="text-lg font-medium text-gray-200 sm:text-xl md:text-2xl lg:text-3xl">
              Dê vida ao seu personagem favorito!
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="https://wa.me/5521986333478?text=ola%20gostaria%20de%20fazer%20uma%20encomenda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300 sm:gap-3 sm:px-8 sm:py-4 sm:text-lg"
            >
              <MessageCircle size={24} className="sm:hidden" />
              <MessageCircle size={28} className="hidden sm:block" />
              Faça sua encomenda
            </Link>
          </div>

          <div className="flex justify-center gap-2 pt-2 sm:pt-4">
            {bannerImages.map((_, index) => (
              <button
                key={`banner-dot-${index}`}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-6 rounded-full transition-all duration-300 sm:h-2.5 sm:w-8 ${
                  index === activeIndex ? 'bg-accent' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero;