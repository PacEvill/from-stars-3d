import { useRouter } from 'next/router';
import Image from 'next/image';

const modelos = [
  { id: 1, nome: 'Frieren', descricao: 'Modelo 3D em resina, pintado à mão, inspirado na personagem Frieren.', categoria: 'Anime', material: 'Resina', tamanho: 'Pequeno', disponibilidade: 'Em estoque', imagens: ['/frieren/Frieren_01.png', '/frieren/Frieren_02.png', '/frieren/Frieren_03.png', '/frieren/Frieren_04.png'] },
  { id: 2, nome: 'Going Merry', descricao: 'Modelo 3D do navio Going Merry, com acabamento detalhado.', categoria: 'Navios', material: 'PLA', tamanho: 'Médio', disponibilidade: 'Sob encomenda', imagens: ['/going-merry/going_merry_01.png', '/going-merry/going_merry_02.png', '/going-merry/going_merry_03.png', '/going-merry/going_merry_04.png'] },
  { id: 3, nome: 'Mercy', descricao: 'Modelo 3D da personagem Mercy, pintura manual e base personalizada.', categoria: 'Jogos', material: 'Resina', tamanho: 'Grande', disponibilidade: 'Em estoque', imagens: ['/mercy/mercy_01.png', '/mercy/mercy_02.png', '/mercy/mercy_03.png', '/mercy/mercy_04.png', '/mercy/mercy_05.png', '/mercy/mercy_06.png'] },
  { id: 4, nome: 'Roxy Migurdia', descricao: 'Modelo 3D da Roxy Migurdia, acabamento premium e pintura artística.', categoria: 'Anime', material: 'ABS', tamanho: 'Pequeno', disponibilidade: 'Em estoque', imagens: ['/roxy-migurdia/roxy_migurdia_01.png', '/roxy-migurdia/roxy_migurdia_02.png', '/roxy-migurdia/roxy_migurdia_03.png', '/roxy-migurdia/roxy_migurdia_04.png', '/roxy-migurdia/roxy_migurdia_05.png'] },
  { id: 5, nome: 'This is Fine', descricao: 'Modelo 3D divertido inspirado no meme "This is Fine".', categoria: 'Memes', material: 'PLA', tamanho: 'Médio', disponibilidade: 'Esgotado', imagens: ['/this-is-fine/this_is_fine_01.png', '/this-is-fine/this_is_fine_02.png', '/this-is-fine/this_is_fine_03.png', '/this-is-fine/this_is_fine_04.png'] },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const product = modelos.find(modelo => modelo.id === Number(id));

  if (!product) {
    return <p className="text-secondary text-center">Produto não encontrado.</p>;
  }

  return (
    <main className="min-h-screen bg-primary py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-6 text-center">{product.nome}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <Image
              src={product.imagens[0]} // Exibe a primeira imagem como principal
              alt={product.nome}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="text-secondary text-lg mb-4">{product.descricao}</p>
            <p className="text-secondary text-md mb-2"><span className="font-semibold">Categoria:</span> {product.categoria}</p>
            <p className="text-secondary text-md mb-2"><span className="font-semibold">Material:</span> {product.material}</p>
            <p className="text-secondary text-md mb-2"><span className="font-semibold">Tamanho:</span> {product.tamanho}</p>
            <p className="text-secondary text-md mb-4"><span className="font-semibold">Disponibilidade:</span> {product.disponibilidade}</p>
            
            {/* Botão para voltar ao catálogo */}
            <button
              onClick={() => router.push('/catalogo')}
              className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Voltar ao Catálogo
            </button>
          </div>
        </div>

        {/* Galeria de imagens adicionais */}
        {product.imagens.length > 1 && (
          <div className="mt-8">
            <h2 className="text-2xl font-heading font-bold text-secondary mb-4">Mais Imagens</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.imagens.map((image, index) => (
                <div key={index} className="relative w-full h-40 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${product.nome} - Imagem ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}