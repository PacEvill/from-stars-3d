import React from 'react';
import Image from 'next/image';

const MateriaisPage = () => {
  const materials = [
    {
      id: 1,
      name: 'PLA (Ácido Polilático)',
      image: '/frieren/Frieren_04.png',
      description: 'Material biodegradável e fácil de usar, ideal para prototipagem e peças decorativas. Disponível em diversas cores',
      properties: ['Biodegradável', 'Fácil de imprimir', 'Variedade de cores'],
      applications: ['Prototipagem', 'Brinquedos', 'Modelos arquitetônicos'],
    },
    {
      id: 2,
      name: 'ABS (Acrilonitrila Butadieno Estireno)',
      image: '/going-merry/going_merry_04.png',
      description: 'Plástico resistente e durável, adequado para peças funcionais e de engenharia. Requer impressora com mesa aquecida.',
      properties: ['Resistente ao impacto', 'Durável', 'Boa resistência térmica'],
      applications: ['Peças automotivas', 'Invólucros eletrônicos', 'Ferramentas'],
    },
    {
      id: 3,
      name: 'PETG (Tereftalato de Polietileno Glicol)',
      image: '/mercy/mercy_01.png',
      description: 'Combina a facilidade de impressão do PLA com a durabilidade do ABS. Ótima opção para peças que precisam de resistência e flexibilidade.',
      properties: ['Resistente', 'Flexível', 'Baixa contração'],
      applications: ['Embalagens', 'Componentes mecânicos', 'Garrafas'],
    },
    {
      id: 4,
      name: 'Resina UV (SLA/DLP)',
      image: '/mercy/mercy_02.png',
      description: 'Para impressões com altíssimo nível de detalhe e acabamento liso. Ideal para joias, miniaturas e protótipos de alta precisão.',
      properties: ['Alta precisão', 'Superfície lisa', 'Detalhes finos'],
      applications: ['Joias', 'Miniaturas', 'Odontologia', 'Prototipagem de alta resolução'],
    },
    {
      id: 5,
      name: 'TPU (Poliuretano Termoplástico)',
      image: '/mercy/mercy_03.png',
      description: 'Material flexível e elástico, perfeito para peças que precisam de maleabilidade, como capas de celular e vedações.',
      properties: ['Flexível', 'Elástico', 'Resistente à abrasão'],
      applications: ['Capas de celular', 'Vedações', 'Peças flexíveis'],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Guia de Materiais para Impressão 3D</h1>
      <p className="text-lg text-center mb-12">Conheça os principais materiais que utilizamos em nossas impressões 3D e descubra qual é o ideal para o seu projeto.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.map((material) => (
          <div key={material.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
              <p className="text-gray-300 text-base mb-4">{material.description}</p>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Propriedades:</h3>
              <ul className="list-disc list-inside text-gray-400 mb-4">
                {material.properties.map((prop, index) => (
                  <li key={index}>{prop}</li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Aplicações Comuns:</h3>
              <ul className="list-disc list-inside text-gray-400">
                {material.applications.map((app, index) => (
                  <li key={index}>{app}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MateriaisPage;