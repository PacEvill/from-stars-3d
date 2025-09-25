import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

// Define o tipo das props que a página recebe, incluindo os parâmetros da URL
type ProductPageProps = {
  params: {
    id: string;
  };
};

/**
 * Função para gerar metadados de SEO dinamicamente.
 * Ela é executada no servidor antes da renderização da página.
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto que você está procurando não existe ou foi movido.',
    };
  }

  const product = await prisma.produto.findUnique({
    where: { id },
  });

  if (!product) {
    return {
      title: 'Produto não encontrado',
      description: 'O produto que você está procurando não existe ou foi movido.',
    };
  }

  return {
    title: `${product.nome} | From Stars 3D`,
    description: product.descricao,
    openGraph: {
      title: `${product.nome} | From Stars 3D`,
      description: product.descricao,
      images: [
        {
          url: product.imagem, // A imagem principal do produto
          width: 1200,
          height: 630,
          alt: product.nome,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
  };
}

/**
 * Componente da página de detalhes do produto.
 * Agora é um Server Component assíncrono que busca dados diretamente do banco.
 */
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const id = parseInt(params.id, 10);

  // Se o ID não for um número, retorna página 404
  if (isNaN(id)) {
    notFound();
  }

  const product = await prisma.produto.findUnique({
    where: { id },
    include: {
      Material: true, // Inclui os dados do material relacionado
    },
  });

  // Se nenhum produto for encontrado com o ID, retorna página 404
  if (!product) {
    notFound();
  }

  // Nota: O modelo de dados atual só tem uma imagem. A galeria foi removida.
  // Para ter uma galeria, o schema do Prisma precisaria ser atualizado.

  return (
    <main className="min-h-screen bg-primary py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-6 text-center">
          {product.nome}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <Image
              src={product.imagem} // Imagem vinda do banco de dados
              alt={product.nome}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="text-secondary text-lg mb-4">{product.descricao}</p>
            <p className="text-secondary text-md mb-2">
              <span className="font-semibold">Material:</span> {product.Material.nome}
            </p>
            <p className="text-accent-light text-xl mb-4">
              <span className="font-semibold">Preço:</span> R$ {product.preco.toFixed(2).replace('.', ',')}
            </p>

            <a
              href="/catalogo"
              className="mt-4 inline-block bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Voltar ao Catálogo
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
