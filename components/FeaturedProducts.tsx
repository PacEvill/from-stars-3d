'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Eye } from 'lucide-react'
import ProductCarousel from './ProductCarousel'
import { useState } from 'react'

const featuredProducts = [
  {
    id: 'frieren',
    name: 'Frieren',
    category: 'Anime',
    description: 'A maga imortal em sua forma mais elegante e misteriosa.',
    images: [
      '/frieren/Frieren_01.png',
      '/frieren/Frieren_02.png',
      '/frieren/Frieren_03.png',
      '/frieren/Frieren_04.png'
    ],
    tags: ['Anime', 'Fantasia', 'Magia'],
    featured: true
  },
  {
    id: 'mercy',
    name: 'Mercy',
    category: 'Gaming',
    description: 'A anjo da guarda de Overwatch em detalhes realistas impressionantes.',
    images: [
      '/mercy/mercy_01.png',
      '/mercy/mercy_02.png',
      '/mercy/mercy_03.png',
      '/mercy/mercy_04.png',
      '/mercy/mercy_05.png',
      '/mercy/mercy_06.png'
    ],
    tags: ['Gaming', 'FPS', 'Heroico'],
    featured: true
  },
  {
    id: 'roxy-migurdia',
    name: 'Roxy Migurdia',
    category: 'Anime',
    description: 'A professora de magia com sua personalidade única e carismática.',
    images: [
      '/roxy-migurdia/roxy_migurdia_01.png',
      '/roxy-migurdia/roxy_migurdia_02.png',
      '/roxy-migurdia/roxy_migurdia_03.png',
      '/roxy-migurdia/roxy_migurdia_04.png',
      '/roxy-migurdia/roxy_migurdia_05.png'
    ],
    tags: ['Anime', 'Fantasia', 'Magia'],
    featured: true
  },
  {
    id: 'going-merry',
    name: 'Going Merry',
    category: 'Anime',
    description: 'O navio mais querido de One Piece em formato chibi adorável.',
    images: [
      '/going-merry/going_merry_01.png',
      '/going-merry/going_merry_02.png',
      '/going-merry/going_merry_03.png',
      '/going-merry/going_merry_04.png'
    ],
    tags: ['Anime', 'Aventura', 'Chibi'],
    featured: true
  },
  {
    id: 'this-is-fine',
    name: 'This is Fine',
    category: 'Meme',
    description: 'O meme clássico do cachorro em situação de caos, perfeitamente capturado.',
    images: [
      '/this-is-fine/this_is_fine_01.png',
      '/this-is-fine/this_is_fine_02.png',
      '/this-is-fine/this_is_fine_03.png',
      '/this-is-fine/this_is_fine_04.png'
    ],
    tags: ['Meme', 'Humor', 'Internet'],
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