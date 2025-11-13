'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Eye } from 'lucide-react'
import ProductCarousel from './ProductCarousel'
import { useState } from 'react'

const featuredProducts = [
  {
    id: '2B',
    name: '2B',
    category: 'Gaming',
    description: 'A androide de combate de Nier: Automata, em sua pose icônica.',
    images: [
      '/fotos/2B/0.jpg',
      '/fotos/2B/1.jpg',
      '/fotos/2B/2.jpg',
      '/fotos/2B/4.jpg',
      '/fotos/2B/5.jpg',
      '/fotos/2B/6.jpg'
    ],
    tags: ['Gaming', 'Action RPG', 'Sci-Fi'],
    featured: true
  },
  {
    id: 'Alice',
    name: 'Alice',
    category: 'Anime',
    description: 'A sonhadora exploradora de Wonderland, pronta para novas aventuras.',
    images: [
      '/fotos/Alice/0.jpg',
      '/fotos/Alice/1.jpg',
      '/fotos/Alice/2.jpg',
      '/fotos/Alice/3.jpg',
      '/fotos/Alice/4.jpg',
      '/fotos/Alice/5.jpg',
      '/fotos/Alice/6.jpg',
      '/fotos/Alice/7.jpg'
    ],
    tags: ['Anime', 'Fantasia', 'VRMMORPG'],
    featured: true
  },
  {
    id: 'Hornet',
    name: 'Hornet',
    category: 'Gaming',
    description: 'A princesa protetora de Hallownest, do jogo Hollow Knight.',
    images: [
      '/fotos/Hornet/0.jpg',
      '/fotos/Hornet/1.jpg',
      '/fotos/Hornet/2.jpg',
      '/fotos/Hornet/3.jpg',
      '/fotos/Hornet/4.jpg',
      '/fotos/Hornet/5.jpg',
      '/fotos/Hornet/6.jpg'
    ],
    tags: ['Gaming', 'Metroidvania', 'Indie'],
    featured: true
  },
  {
    id: 'Momo',
    name: 'Momo',
    category: 'Anime',
    description: 'A médium destemida de Dandadan, enfrentando ameaças paranormais.',
    images: [
      '/fotos/Momo/0.jpg',
      '/fotos/Momo/1.jpg',
      '/fotos/Momo/2.jpg',
      '/fotos/Momo/3.jpg'
    ],
    tags: ['Anime', 'Super-Herói', 'Shonen'],
    featured: true
  },
  {
    id: 'Roxy',
    name: 'Roxy',
    category: 'Anime',
    description: 'A maga sem-teto de Mushoku Tensei, em sua jornada.',
    images: [
      '/fotos/Roxy/0.jpg',
      '/fotos/Roxy/1.jpg',
      '/fotos/Roxy/2.jpg',
      '/fotos/Roxy/3.jpg',
      '/fotos/Roxy/4.jpg',
      '/fotos/Roxy/5.jpg',
      '/fotos/Roxy/6.jpg'
    ],
    tags: ['Anime', 'Isekai', 'Fantasia'],
    featured: true
  },
  {
    id: 'Velma',
    name: 'Velma',
    category: 'Desenho',
    description: 'A detetive inteligente de Scooby-Doo, pronta para resolver mistérios.',
    images: [
      '/fotos/Velma/0.jpg',
      '/fotos/Velma/1.jpg',
      '/fotos/Velma/2.jpg',
      '/fotos/Velma/3.jpg'
    ],
    tags: ['Desenho', 'Mistério', 'Clássico'],
    featured: true
  }
]

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary mb-6">
            Peças em <span className="text-gradient">Destaque</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça algumas das minhas criações mais especiais. Cada peça conta uma história 
            única e representa horas de dedicação e amor pela arte.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card hover:scale-105 transition-transform duration-300 cursor-pointer">
                {/* Product Carousel */}
                <div className="mb-6">
                  <ProductCarousel
                    images={product.images}
                    productName={product.name}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-secondary mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/produto/${product.id}`}
                    className="inline-flex items-center text-accent hover:text-accentAlt transition-colors duration-300 font-medium text-sm group"
                  >
                    Ver detalhes
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link 
            href="/galeria" 
            className="inline-flex items-center justify-center bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/25"
          >
            Ver Galeria Completa
            <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts