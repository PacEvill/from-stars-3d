import React from 'react';
import Image from 'next/image';

const MaterialGuidePage = () => {
  const materials = [
    {
      name: 'PLA (Ácido Polilático)',
      description: 'Material biodegradável e fácil de imprimir, ideal para protótipos e peças decorativas. Baixa contração e boa adesão de camada.',
      image: '/images/materials/pla.jpg',
      properties: [
        'Biodegradável',
        'Fácil de usar',
        'Baixo custo',
        'Variedade de cores',
        'Não tóxico'
      ],
      applications: [
        'Protótipos rápidos',
        'Modelos conceituais',
        'Brinquedos',
        'Peças decorativas'
      ]
    },
    {
      name: 'ABS (Acrilonitrila Butadieno Estireno)',
      description: 'Material resistente e durável, com boa resistência ao calor e impacto. Requer impressora com mesa aquecida e ambiente ventilado.',
      image: '/images/materials/abs.jpg',
      properties: [
        'Alta resistência mecânica',
        'Resistência ao calor',
        'Durável',
        'Pode ser lixado e pintado'
      ],
      applications: [
        'Peças funcionais',
        'Componentes automotivos',
        'Caixas para eletrônicos',
        'Ferramentas'
      ]
    },
    {
      name: 'PETG (Tereftalato de Polietileno Glicol)',
      description: 'Combina a facilidade de impressão do PLA com a durabilidade do ABS. Boa resistência química e transparência.',
      image: '/images/materials/petg.jpg',
      properties: [
        'Fácil de imprimir (como PLA)',
        'Durável (como ABS)',
        'Resistência química',
        'Transparência',
        'Baixa contração'
      ],
      applications: [
        'Embalagens de alimentos',
        'Garrafas de água',
        'Peças mecânicas',
        'Componentes transparentes'
      ]
    },
    {
      name: 'TPU (Poliuretano Termoplástico)',
      description: 'Material flexível e elástico, ideal para peças que precisam de maleabilidade e resistência à abrasão.',
      image: '/images/materials/tpu.jpg',
      properties: [
        'Flexível e elástico',
        'Resistência à abrasão',
        'Boa aderência de camada',
        'Resistência a óleos e graxas'
      ],
      applications: [
        'Capas de celular',
        'Peças de amortecimento',
        'Vedantes',
        'Calçados'
      ]
    },
    {
      name: 'Resina (SLA/DLP)',
      description: 'Utilizada em impressoras de resina para alta precisão e detalhes finos, ideal para joias, miniaturas e protótipos complexos.',
      image: '/images/materials/resin.jpg',
      properties: [
        'Alta precisão e detalhes',
        'Superfície lisa',
        'Variedade de propriedades (rígida, flexível, transparente)',
        'Cura UV'
      ],
      applications: [
        'Joias e miniaturas',
        'Modelos odontológicos',
        'Protótipos de alta resolução',
        'Peças com detalhes finos'
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Guia de Materiais</h1>
      <p className="text-lg text-center mb-12">Conheça os principais materiais que utilizamos na impressão 3D e suas aplicações.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Image
              src={material.image}
              alt={material.name}
              width={500}
              height={300}
              layout="responsive"
              objectFit="cover"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-purple-400 mb-2">{material.name}</h2>
              <p className="text-gray-400 text-base mb-4">{material.description}</p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Propriedades:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {material.properties.map((prop, i) => (
                    <li key={i}>{prop}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">Aplicações Comuns:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {material.applications.map((app, i) => (
                    <li key={i}>{app}</li>
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

export default MaterialGuidePage;