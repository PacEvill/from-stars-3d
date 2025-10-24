import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import type { Metadata } from 'next'

type ProductPageProps = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const id = parseInt(params.id, 10)
  if (isNaN(id)) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto que você está procurando não existe ou foi movido.',
    }
  }

  const product = await prisma.produto.findUnique({ where: { id } })
  if (!product) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto que você está procurando não existe ou foi movido.',
    }
  }

  return {
    title: `${product.nome} | From Stars 3D`,
    description: product.descricao,
    openGraph: {
      title: `${product.nome} | From Stars 3D`,
      description: product.descricao,
      images: [
        {
          url: product.imagem,
          width: 1200,
          height: 630,
          alt: product.nome,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const id = parseInt(params.id, 10)
  if (isNaN(id)) notFound()

  const product = await prisma.produto.findUnique({
    where: { id },
    include: { Material: true },
  })

  if (!product) notFound()

  return (
    <main className="min-h-screen bg-primary py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={product.imagem || '/default-avatar.svg'}
              alt={product.nome}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-4">{product.nome}</h1>
            <p className="text-secondary text-lg mb-4">{product.descricao}</p>

            <div className="mb-4 space-y-2 text-secondary">
              <p><span className="font-semibold">Categoria:</span> {product.categoria || 'N/A'}</p>
              <p><span className="font-semibold">Material:</span> {product.Material?.nome || 'N/A'}</p>
              <p><span className="font-semibold">Tamanho:</span> {product.tamanho || 'N/A'}</p>
              <p><span className="font-semibold">Disponibilidade:</span> {product.disponibilidade || 'N/A'}</p>
            </div>

            <p className="text-3xl font-bold text-white mb-6">R$ {product.preco.toFixed(2)}</p>

            <AddToCartButton productId={product.id} disponibilidade={product.disponibilidade} />

            <Link href="/catalogo" className="block text-center mt-4 text-accent hover:underline">
              Voltar ao Catálogo
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
