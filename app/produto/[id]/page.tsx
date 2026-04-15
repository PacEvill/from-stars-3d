import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from '@/components/AddToCartButton'

// Definindo o tipo do produto que vem da API
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
  categoria: string | null;
  tamanho: string | null;
  disponibilidade: string | null;
  Material: {
    nome: string;
  } | null;
  // Supondo que o modelo possa ter uma galeria de imagens no futuro.
  // Por enquanto, usaremos a imagem principal.
}

async function getProduct(id: string): Promise<Produto | null> {
  try {
    // Em um ambiente real, a URL da API estaria em uma variável de ambiente
    const res = await fetch(`http://localhost:3000/api/produtos/${id}`, { cache: 'no-store' })
    if (!res.ok) {
      return null
    }
    return res.json()
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return (
        <main className="min-h-screen bg-primary py-16 px-4 flex flex-col items-center justify-center">
            <p className="text-secondary text-2xl mb-4">Produto não encontrado.</p>
            <Link href="/catalogo" className="btn-primary">
              Voltar ao Catálogo
            </Link>
        </main>
    )
  }

  return (
    <main className="min-h-screen bg-primary py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Imagem Principal */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={product.imagem || '/default-avatar.svg'}
              alt={product.nome}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Detalhes do Produto */}
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

        {/* Galeria de Imagens (se houver) */}
        
      </div>
    </main>
  )
}
