'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageModal from './ImageModal'

interface ProductCarouselProps {
  images: string[]
  productName: string
  className?: string
}

const ProductCarousel = ({ images, productName, className = '' }: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  if (images.length === 0) return null

  return (
    <>
      <div className={`relative group ${className}`}>
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg bg-gray-800">
          <div className="relative w-full">
            <div className="relative aspect-[3/4] w-full sm:aspect-[4/5] md:aspect-[5/6] lg:aspect-[7/8]">
              <Image
                src={images[currentIndex]}
                alt={`${productName} - Imagem ${currentIndex + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                priority={currentIndex === 0}
              />
            </div>
          </div>
          
          {/* Overlay with Expand Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openModal}
              className="opacity-0 rounded-full bg-accent/90 p-3 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-accent group-hover:opacity-100"
              aria-label="Ver imagem em destaque"
            >
              <Eye size={20} />
            </motion.button>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent group-hover:opacity-100 md:opacity-0"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent group-hover:opacity-100 md:opacity-0"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}


        </div>

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="flex justify-center mt-3 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        currentIndex={currentIndex}
        onImageChange={setCurrentIndex}
        productName={productName}
      />
    </>
  )
}

export default ProductCarousel