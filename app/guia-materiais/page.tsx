import Image from 'next/image';
import prisma from '@/lib/prisma';

// Forçar a página a ser dinâmica para evitar chamadas ao DB durante build
export const dynamic = 'force-dynamic';

export default async function MaterialGuidePage() {
  const materials = await prisma.material.findMany();

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Guia de Materiais</h1>
      <p className="text-lg text-center mb-12 text-gray-300">Conheça os principais materiais que utilizamos na impressão 3D e suas aplicações.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <div key={material.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="relative w-full h-48">
              <Image
                src={material.imagem} // Imagem vinda do banco de dados
                alt={material.nome}   // Nome vindo do banco de dados
                fill
                style={{ objectFit: 'cover' }}
                className="w-full"
              />
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h2 className="text-2xl font-semibold text-purple-400 mb-2">{material.nome}</h2>
              <p className="text-gray-400 text-base mb-4 flex-grow">{material.descricao}</p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Propriedades:</h3>
                {/* O campo 'propriedades' é uma String; separamos por vírgula para exibir como lista */}
                <ul className="list-disc list-inside text-gray-300">
                  {material.propriedades.split(',').map((prop, i) => (
                    <li key={i}>{prop.trim()}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Aplicações Comuns:</h3>
                {/* O campo 'aplicacoes' é uma String; separamos por vírgula para exibir como lista */}
                <ul className="list-disc list-inside text-gray-300">
                  {material.aplicacoes.split(',').map((app, i) => (
                    <li key={i}>{app.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};