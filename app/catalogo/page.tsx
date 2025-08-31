'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

const modelos = [
  { id: 1, nome: 'Frieren', descricao: 'Modelo 3D em resina, pintado à mão, inspirado na personagem Frieren.', categoria: 'Anime', material: 'Resina', tamanho: 'Pequeno', disponibilidade: 'Em estoque' },
  { id: 2, nome: 'Going Merry', descricao: 'Modelo 3D do navio Going Merry, com acabamento detalhado.', categoria: 'Navios', material: 'PLA', tamanho: 'Médio', disponibilidade: 'Sob encomenda' },
  { id: 3, nome: 'Mercy', descricao: 'Modelo 3D da personagem Mercy, pintura manual e base personalizada.', categoria: 'Jogos', material: 'Resina', tamanho: 'Grande', disponibilidade: 'Em estoque' },
  { id: 4, nome: 'Roxy Migurdia', descricao: 'Modelo 3D da Roxy Migurdia, acabamento premium e pintura artística.', categoria: 'Anime', material: 'ABS', tamanho: 'Pequeno', disponibilidade: 'Em estoque' },
  { id: 5, nome: 'This is Fine', descricao: 'Modelo 3D divertido inspirado no meme "This is Fine".', categoria: 'Memes', material: 'PLA', tamanho: 'Médio', disponibilidade: 'Esgotado' },
];

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [filterMaterial, setFilterMaterial] = useState('Todos');
  const [filterTamanho, setFilterTamanho] = useState('Todos');
  const [filterDisponibilidade, setFilterDisponibilidade] = useState('Todos');
  const [filteredModelos, setFilteredModelos] = useState(modelos);

  useEffect(() => {
    let currentModelos = modelos;

    if (filterCategory !== 'Todos') {
      currentModelos = currentModelos.filter(modelo => modelo.categoria === filterCategory);
    }

    if (filterMaterial !== 'Todos') {
      currentModelos = currentModelos.filter(modelo => modelo.material === filterMaterial);
    }

    if (filterTamanho !== 'Todos') {
      currentModelos = currentModelos.filter(modelo => modelo.tamanho === filterTamanho);
    }

    if (filterDisponibilidade !== 'Todos') {
      currentModelos = currentModelos.filter(modelo => modelo.disponibilidade === filterDisponibilidade);
    }

    if (searchTerm) {
      currentModelos = currentModelos.filter(modelo =>
        modelo.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredModelos(currentModelos);
  }, [searchTerm, filterCategory, filterMaterial, filterTamanho, filterDisponibilidade]);

  const categories = ['Todos', ...new Set(modelos.map(modelo => modelo.categoria))];
  const materials = ['Todos', ...new Set(modelos.map(modelo => modelo.material))];
  const tamanhos = ['Todos', ...new Set(modelos.map(modelo => modelo.tamanho))];
  const disponibilidades = ['Todos', ...new Set(modelos.map(modelo => modelo.disponibilidade))];
  return (
    <main className="min-h-screen bg-primary py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-10 text-center">Catálogo de Modelos 3D</h1>
        <p className="text-secondary text-lg text-center mb-8 max-w-2xl mx-auto">Explore alguns dos modelos 3D criados com dedicação e criatividade. Cada modelo é único, pensado para colecionadores e apaixonados por arte digital e impressões 3D.</p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="flex-grow p-3 rounded-lg bg-gray-900 text-secondary placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col">
            <label htmlFor="category-filter" className="text-secondary text-sm mb-1">Categoria:</label>
            <select
              id="category-filter"
              className="p-3 rounded-lg bg-gray-900 text-secondary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="material-filter" className="text-secondary text-sm mb-1">Material:</label>
            <select
              id="material-filter"
              className="p-3 rounded-lg bg-gray-900 text-secondary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={filterMaterial}
              onChange={(e) => setFilterMaterial(e.target.value)}
            >
              {materials.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="size-filter" className="text-secondary text-sm mb-1">Tamanho:</label>
            <select
              id="size-filter"
              className="p-3 rounded-lg bg-gray-900 text-secondary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={filterTamanho}
              onChange={(e) => setFilterTamanho(e.target.value)}
            >
              {tamanhos.map(tamanho => (
                <option key={tamanho} value={tamanho}>{tamanho}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="availability-filter" className="text-secondary text-sm mb-1">Disponibilidade:</label>
            <select
              id="availability-filter"
              className="p-3 rounded-lg bg-gray-900 text-secondary border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              value={filterDisponibilidade}
              onChange={(e) => setFilterDisponibilidade(e.target.value)}
            >
              {disponibilidades.map(disponibilidade => (
                <option key={disponibilidade} value={disponibilidade}>{disponibilidade}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredModelos.length > 0 ? (
            filteredModelos.map(modelo => (
              <Link key={modelo.id} href={`/produto/${modelo.id}`} className="card flex flex-col items-center cursor-pointer">
                <div className="w-full h-56 relative mb-4 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
                  <span className="text-gray-400 text-5xl">🖼️</span>
                </div>
                <h2 className="text-xl font-heading font-semibold text-accent mb-2 text-center">{modelo.nome}</h2>
                <p className="text-secondary text-sm mb-4 text-center">{modelo.descricao}</p>
              </Link>
            ))
          ) : (
            <p className="text-secondary text-center col-span-full">Nenhum modelo encontrado com os critérios de busca.</p>
          )}
        </div>
      </div>
    </main>
  );
}