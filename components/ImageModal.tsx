'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  onImageChange: (index: number) => void
  productName: string
}

const ImageModal = ({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onImageChange, 
  productName 
}: ImageModalProps) => {


  const nextImage = useCallback(() => {
    onImageChange((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onImageChange])

  const prevImage = useCallback(() => {
    onImageChange((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onImageChange])





  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'ArrowLeft':
        prevImage()
        break
    }
  }, [isOpen, nextImage, prevImage, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white hover:text-accent transition-colors duration-300 p-2"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => { e.stopPropagation(); prevImage() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-accent transition-colors duration-300 p-3 bg-black/50 rounded-full backdrop-blur-sm"
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); nextImage() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-accent transition-colors duration-300 p-3 bg-black/50 rounded-full backdrop-blur-sm"
          aria-label="Próxima imagem"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image Container */}
        <div className="flex items-center justify-center h-full p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <Image
                src={images[currentIndex]}
                alt={`${productName} - Imagem ${currentIndex + 1}`}
                width={800}
                height={600}
                className="object-contain transition-all duration-300"
              />
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">

        </div>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 z-10 text-white bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ImageModal