import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PortfolioPage = () => {
  const categories = [
    { name: 'Engenharia', slug: 'engenharia' },
    { name: 'Arquitetura', slug: 'arquitetura' },
    { name: 'Arte', slug: 'arte' },
    { name: 'Design de Produto', slug: 'design-produto' },
    { name: 'Outros', slug: 'outros' },
  ];

  const projects = [
    { id: 1, name: 'Protótipo de Peça Industrial', category: 'Engenharia', image: '/frieren/Frieren_01.png', description: 'Desenvolvimento de protótipo funcional para indústria automotiva.' },
    { id: 2, name: 'Maquete de Edifício Residencial', category: 'Arquitetura', image: '/going-merry/going_merry_01.png', description: 'Maquete detalhada de um projeto arquitetônico moderno.' },
    { id: 3, name: 'Escultura Abstrata', category: 'Arte', image: '/frieren/Frieren_02.png', description: 'Obra de arte contemporânea impressa em resina com alta precisão.' },
    { id: 4, name: 'Case de Smartphone Personalizado', category: 'Design de Produto', image: '/going-merry/going_merry_02.png', description: 'Design e impressão de um case ergonômico e exclusivo para smartphone.' },
    { id: 5, name: 'Miniatura de Personagem', category: 'Outros', image: '/frieren/Frieren_03.png', description: 'Reprodução fiel de personagem de ficção em miniatura.' },
    { id: 6, name: 'Componente Robótico', category: 'Engenharia', image: '/going-merry/going_merry_03.png', description: 'Peça de alta complexidade para aplicação em robótica.' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Nosso Portfólio</h1>
      <p className="text-lg text-center mb-12">Explore alguns dos projetos que transformamos em realidade com a impressão 3D.</p>

      {/* Filtro de Categorias */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Link key={category.slug} href={`/portfolio?category=${category.slug}`}>
            <span className="btn-secondary px-4 py-2 rounded-full cursor-pointer hover:bg-accent hover:text-primary transition-colors duration-300">
              {category.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Galeria de Projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.name}
              width={500}
              height={300}
              layout="responsive"
              objectFit="cover"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-purple-400 mb-2">{project.name}</h2>
              <p className="text-gray-300 text-sm mb-4">Categoria: {project.category}</p>
              <p className="text-gray-400 text-base">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;