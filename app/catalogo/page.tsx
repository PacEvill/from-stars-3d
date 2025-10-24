'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/CartProvider'
import { ShoppingCart } from 'lucide-react'

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
}

export default function CatalogoPage() {
  const { addToCart } = useCart()
  const [modelos, setModelos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('Todos')
  const [filterMaterial, setFilterMaterial] = useState('Todos')
  const [filterTamanho, setFilterTamanho] = useState('Todos')
  const [filterDisponibilidade, setFilterDisponibilidade] = useState('Todos')
  const [filteredModelos, setFilteredModelos] = useState<Produto[]>([])

  // Fetch dos produtos da API
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('/api/produtos')
        if (!response.ok) throw new Error('Falha ao buscar produtos')
        const data = await response.json()
        setModelos(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProdutos()
  }, [])

  // Lógica de filtragem
  useEffect(() => {
    let currentModelos = modelos

    if (filterCategory !== 'Todos') {
      currentModelos = currentModelos.filter(m => m.categoria === filterCategory)
    }
    if (filterMaterial !== 'Todos') {
      currentModelos = currentModelos.filter(m => m.Material?.nome === filterMaterial)
    }
    if (filterTamanho !== 'Todos') {
      currentModelos = currentModelos.filter(m => m.tamanho === filterTamanho)
    }
    if (filterDisponibilidade !== 'Todos') {
      currentModelos = currentModelos.filter(m => m.disponibilidade === filterDisponibilidade)
    }
    if (searchTerm) {
      currentModelos = currentModelos.filter(m =>
        m.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredModelos(currentModelos)
  }, [searchTerm, filterCategory, filterMaterial, filterTamanho, filterDisponibilidade, modelos])

  // Extrai opções para os filtros a partir dos dados carregados
  const categories = ['Todos', ...new Set(modelos.map(m => m.categoria).filter(Boolean) as string[])]
  const materials = ['Todos', ...new Set(modelos.map(m => m.Material?.nome).filter(Boolean) as string[])]
  const tamanhos = ['Todos', ...new Set(modelos.map(m => m.tamanho).filter(Boolean) as string[])]
  const disponibilidades = ['Todos', ...new Set(modelos.map(m => m.disponibilidade).filter(Boolean) as string[])]

  if (loading) {
    return <div className="min-h-screen bg-primary py-16 px-4 text-center text-white">Carregando produtos...</div>
  }

  return (
    <main className="min-h-screen bg-primary py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-10 text-center">Catálogo de Modelos 3D</h1>
        <p className="text-secondary text-lg text-center mb-8 max-w-2xl mx-auto">Explore alguns dos modelos 3D criados com dedicação e criatividade. Cada modelo é único, pensado para colecionadores e apaixonados por arte digital e impressões 3D.</p>

        {/* Filtros */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="col-span-2 md:col-span-1 p-3 rounded-lg bg-gray-900 text-secondary placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* ... outros filtros ... */}
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredModelos.length > 0 ? (
            filteredModelos.map(modelo => (
              <div key={modelo.id} className="card flex flex-col bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                <Link href={`/produto/${modelo.id}`} className="block">
                  <div className="w-full h-56 relative bg-gray-900">
                    <Image 
                      src={modelo.imagem || '/default-avatar.svg'}
                      alt={modelo.nome}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-heading font-semibold text-accent mb-2 truncate">{modelo.nome}</h2>
                    <p className="text-secondary text-sm mb-4 h-10 overflow-hidden">{modelo.descricao}</p>
                    <p className="text-lg font-bold text-white mb-4">R$ {modelo.preco.toFixed(2)}</p>
                  </div>
                </Link>
                <div className="mt-auto p-4 pt-0">
                  <button 
                    onClick={() => addToCart(modelo.id, 1)}
                    className="btn-primary w-full flex items-center justify-center"
                    disabled={modelo.disponibilidade === 'Esgotado'}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    {modelo.disponibilidade === 'Esgotado' ? 'Esgotado' : 'Adicionar ao Carrinho'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-secondary text-center col-span-full">Nenhum modelo encontrado com os critérios de busca.</p>
          )}
        </div>
      </div>
    </main>
  )
}
