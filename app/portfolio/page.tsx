'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

type GalleryCollection = {
  id: string
  title: string
  category: 'Catálogo' | 'Portfólio'
  description: string
  images: string[]
}

const createPaths = (baseFolder: string, folderName: string, files: string[]) =>
  files.map((file) => `/${baseFolder}/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`)

const catalogCollections: GalleryCollection[] = [
  {
    id: 'catalogo-ahri1',
    title: 'Ahri – Versão Clássica',
    category: 'Catálogo',
    description: 'Detalhes suaves e acabamento brilhante que destacam cada curva dessa campeã.',
    images: createPaths('catalogo', 'Ahri 1', ['0.jpg', '1.jpg']),
  },
  {
    id: 'catalogo-ahri2',
    title: 'Ahri – Edição Especial',
    category: 'Catálogo',
    description: 'Texturas translúcidas e pintura vibrante para uma peça de alto impacto visual.',
    images: createPaths('catalogo', 'Ahri 2', ['0.png', '2.jpg', '3.jpg', '4.jpg']),
  },
  {
    id: 'catalogo-ahrisb',
    title: 'Ahri – Star Guardian',
    category: 'Catálogo',
    description: 'Combinação de tons neon e efeitos luminosos inspirados em magia estelar.',
    images: createPaths('catalogo', 'Ahri SB', ['0.jpg', '1.jpg', '2.jpg', '3.jpg']),
  },
  {
    id: 'catalogo-batman',
    title: 'Batman',
    category: 'Catálogo',
    description: 'Uma escultura sombria, com contrastes pensados para realçar o traje tático.',
    images: createPaths('catalogo', 'Batman', ['0.jpg', '1.png']),
  },
  {
    id: 'catalogo-booette',
    title: 'Booette',
    category: 'Catálogo',
    description: 'Peça com efeito etéreo, aproveitando camadas translúcidas para dar profundidade.',
    images: createPaths('catalogo', 'Booette', ['0.jpg', '1.jpg', '2.jpg', '3.jpg']),
  },
  {
    id: 'catalogo-bowsette',
    title: 'Bowsette',
    category: 'Catálogo',
    description: 'Mistura de texturas entre casco, chamas e vestido para um visual poderoso.',
    images: createPaths('catalogo', 'Bowsette', ['0.jpg', '1.jpg', '2.jpg']),
  },
  {
    id: 'catalogo-furina',
    title: 'Furina',
    category: 'Catálogo',
    description: 'Detalhes delicados e camadas translúcidas que evocam a fluidez da Hydro Archon.',
    images: createPaths('catalogo', 'Furina', ['0.jpg', '1.jpg', '2.jpg']),
  },
  {
    id: 'catalogo-gwen',
    title: 'Gwen',
    category: 'Catálogo',
    description: 'Costuras, rendas e efeitos perolados garantem um acabamento premium.',
    images: createPaths('catalogo', 'Gwen', ['0.jpg', '1.jpg', '2.jpg']),
  },
  {
    id: 'catalogo-levi',
    title: 'Levi Ackerman',
    category: 'Catálogo',
    description: 'Pose dinâmica com destaque para a capa esvoaçante e lâminas cuidadosamente polidas.',
    images: createPaths('catalogo', 'Levi', ['1.png', '2.png']),
  },
  {
    id: 'catalogo-maomao',
    title: 'Maomao',
    category: 'Catálogo',
    description: 'Cores suaves e expressão serena para transmitir a personalidade da personagem.',
    images: createPaths('catalogo', 'Maomao', ['0.jpg', '1.jpg', '2.jpg']),
  },
  {
    id: 'catalogo-maomao-jinshi',
    title: 'Maomao & Jinshi',
    category: 'Catálogo',
    description: 'Composição dupla com contraste de cores para destacar a parceria icônica.',
    images: createPaths('catalogo', 'Maomao e Jinshi', ['0.jpg', '1.jpg', '2.jpg']),
  },
  {
    id: 'catalogo-mikasa',
    title: 'Mikasa Ackerman',
    category: 'Catálogo',
    description: 'Armadura com pintura metálica e base texturizada inspirada nas muralhas.',
    images: createPaths('catalogo', 'Mikasa', ['0.jpg', '1.jpg']),
  },
  {
    id: 'catalogo-sett',
    title: 'Sett',
    category: 'Catálogo',
    description: 'Combinação de pelagem, metal e tatuagens com acabamento em camadas.',
    images: createPaths('catalogo', 'Sett', ['0.jpg', '1.jpg', '2.jpg']),
  },
]

const portfolioCollections: GalleryCollection[] = [
  {
    id: 'portfolio-2b',
    title: '2B – Nier Automata',
    category: 'Portfólio',
    description: 'Projeto completo com múltiplas poses e variações de pintura para colecionadores.',
    images: createPaths('fotos', '2B', ['0.jpg', '1.jpg', '2.jpg', '4.jpg', '5.jpg', '6.jpg']),
  },
  {
    id: 'portfolio-alice',
    title: 'Alice no País das Maravilhas',
    category: 'Portfólio',
    description: 'Uma visão delicada de Alice com cores pastel e detalhes minuciosos nos acessórios.',
    images: createPaths('fotos', 'Alice', ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']),
  },
  {
    id: 'portfolio-hornet',
    title: 'Hornet – Hollow Knight',
    category: 'Portfólio',
    description: 'Escultura dinâmica com ênfase nas linhas fluidas da personagem e no cenário.',
    images: createPaths('fotos', 'Hornet', ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']),
  },
  {
    id: 'portfolio-momo',
    title: 'Momo – Dandadan',
    category: 'Portfólio',
    description: 'Expressões vibrantes e pintura contrastante para dar vida à heroína.',
    images: createPaths('fotos', 'Momo', ['0.jpg', '1.jpg', '2.jpg', '3.jpg']),
  },
  {
    id: 'portfolio-roxy',
    title: 'Roxy Migurdia',
    category: 'Portfólio',
    description: 'Tons mágicos e brilho suave ressaltando a aura encantadora da personagem.',
    images: createPaths('fotos', 'Roxy', ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']),
  },
  {
    id: 'portfolio-velma',
    title: 'Velma Dinkley',
    category: 'Portfólio',
    description: 'Estilo cartoon com texturas que simulam tricô e óculos translúcidos.',
    images: createPaths('fotos', 'Velma', ['0.jpg', '1.jpg', '2.jpg', '3.jpg']),
  },
]

const sections = [
  {
    id: 'colecao-catalogo',
    title: 'Coleção Catálogo',
    description: 'Peças prontas para encomenda, produzidas com foco em fidelidade e acabamento premium.',
    collections: catalogCollections,
  },
  {
    id: 'portfolio-autorais',
    title: 'Portfólio Autorais e Fanarts',
    description: 'Projetos especiais, fanarts e estudos que mostram a versatilidade da From Stars 3D.',
    collections: portfolioCollections,
  },
]

const PortfolioPage = () => {
  return (
    <main className="bg-primary text-secondary">
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-1 text-xs uppercase tracking-[0.4em] text-accent"
          >
            <Sparkles size={14} />
            Portfólio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-3xl font-heading font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            Cada peça é uma história impressa em 3D
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base text-gray-300 sm:text-lg"
          >
            Explore coleções completas, fanarts exclusivas e projetos sob medida que traduzem nossa paixão por escultura digital, pintura e acabamento artesanal.
          </motion.p>
        </div>
      </section>

      {sections.map((section, sectionIndex) => (
        <section key={section.id} className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="mb-10 flex flex-col gap-4 text-center sm:mb-12 sm:text-left"
            >
              <h2 className="text-2xl font-heading font-semibold sm:text-3xl">
                {section.title}
              </h2>
              <p className="text-sm text-gray-300 sm:text-base">
                {section.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {section.collections.map((collection, index) => (
                <motion.article
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/30 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
                    {collection.images.map((image, imageIndex) => (
                      <div
                        key={`${collection.id}-${imageIndex}`}
                        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-800"
                      >
                        <Image
                          src={image}
                          alt={`${collection.title} - Visual ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 px-6 pb-6 text-center sm:text-left">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent">
                      {collection.category}
                    </span>
                    <h3 className="text-xl font-heading font-semibold sm:text-2xl">
                      {collection.title}
                    </h3>
                    <p className="text-sm text-gray-300 sm:text-base">
                      {collection.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {sectionIndex === sections.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto mt-16 max-w-3xl rounded-3xl border border-accent/40 bg-accent/10 p-8 text-center shadow-lg shadow-accent/20"
            >
              <h3 className="text-2xl font-heading font-semibold">Quer ver sua ideia ganhar vida?</h3>
              <p className="mt-4 text-gray-200">
                Envie uma referência ou conte o que você imaginou. Nós cuidamos de modelagem, impressão, pintura e envio.
              </p>
              <a
                href="https://wa.me/5521986333478?text=ola%20gostaria%20de%20transformar%20minha%20ideia%20em%203D"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-accentAlt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accentAlt"
              >
                Falar com a From Stars 3D
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          )}
        </section>
      ))}
    </main>
  )
}

export default PortfolioPage