'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Heart, MessageCircle, ExternalLink, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import ImageModal from './ImageModal'

const InstagramFeed = () => {
  const [selectedPost, setSelectedPost] = useState<{
    images: string[]
    productName: string
    currentIndex: number
  } | null>(null)

  // Mock data - in real implementation, this would come from Instagram API
  const instagramPosts = [
    {
      id: 1,
      image: '/mercy/mercy_01.png',
      caption: 'Mercy em processo de pintura! Os detalhes dos olhos são sempre os mais desafiadores 💙',
      likes: 127,
      comments: 23,
      timestamp: '2h atrás',
      productName: 'Mercy'
    },
    {
      id: 2,
      image: '/frieren/Frieren_01.png',
      caption: 'Frieren, minha primeira peça e o início de tudo. Sempre especial para mim ✨',
      likes: 89,
      comments: 15,
      timestamp: '1d atrás',
      productName: 'Frieren'
    },
    {
      id: 3,
      image: '/going-merry/going_merry_01.png',
      caption: 'Going Merry chibi ficou tão fofo! Quem mais ama One Piece? 🏴‍☠️',
      likes: 156,
      comments: 31,
      timestamp: '2d atrás',
      productName: 'Going Merry'
    },
    {
      id: 4,
      image: '/roxy-migurdia/roxy_migurdia_01.png',
      caption: 'Roxy Migurdia com toda sua personalidade única capturada na pintura 🎨',
      likes: 98,
      comments: 18,
      timestamp: '3d atrás',
      productName: 'Roxy Migurdia'
    }
  ]

  const openModal = (post: typeof instagramPosts[0]) => {
    setSelectedPost({
      images: [post.image],
      productName: post.productName,
      currentIndex: 0
    })
  }

  const closeModal = () => {
    setSelectedPost(null)
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Instagram className="w-8 h-8 text-accent" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-secondary">
              Acompanhe o <span className="text-gradient">Processo</span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Siga minha jornada criativa no Instagram e TikTok. Compartilho bastidores, processos de pintura e as histórias
            por trás de cada peça.
          </p>
        </motion.div>

        {/* Instagram Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-700">
                <div className="relative aspect-square w-full">
                  <Image
                    src={post.image}
                    alt={`Post do Instagram - ${post.productName}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Expand Button */}
                  <button
                    onClick={() => openModal(post)}
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    aria-label="Expandir imagem"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Overlay with Post Info */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 pointer-events-none">
                  <p className="text-white text-sm line-clamp-3">{post.caption}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4 text-red-400" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4 text-blue-400" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <span className="text-gray-300">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-accent hover:text-accentAlt transition-colors duration-300">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Ver no Instagram</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <p className="text-lg text-gray-300">
            Quer acompanhar em tempo real? Siga-me nas redes sociais!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://instagram.com/from.stars.3d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              <span>@from.stars.3d</span>
            </a>
            <a
              href="https://tiktok.com/@from.stars.3d"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-2xl">♪</span>
              <span>@from.stars.3d</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedPost && (
        <ImageModal
          isOpen={!!selectedPost}
          onClose={closeModal}
          images={selectedPost.images}
          currentIndex={selectedPost.currentIndex}
          onImageChange={(index) => setSelectedPost(prev => prev ? { ...prev, currentIndex: index } : null)}
          productName={selectedPost.productName}
        />
      )}
    </section>
  )
}

export default InstagramFeed 