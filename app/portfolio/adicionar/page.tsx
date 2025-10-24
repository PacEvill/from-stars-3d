'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdicionarPortfolioPage() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [imagem, setImagem] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validação básica
    if (!titulo || !descricao || !imagem) {
      setError('Por favor, preencha todos os campos.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo,
          descricao,
          imagem,
        }),
      })

      if (response.ok) {
        alert('Item de Portfólio adicionado com sucesso!')
        router.push('/portfolio') // Redireciona para a página do portfólio
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Erro ao adicionar item de portfólio.')
      }
    } catch (err) {
      console.error('Erro na requisição:', err)
      setError('Ocorreu um erro ao tentar adicionar o item de portfólio. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-center text-secondary">Adicionar Item ao Portfólio</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="titulo" className="block mb-1 text-secondary font-medium">Título</label>
            <input type="text" id="titulo" className="input-field" value={titulo} onChange={e => setTitulo(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label htmlFor="descricao" className="block mb-1 text-secondary font-medium">Descrição</label>
            <textarea id="descricao" className="input-field" value={descricao} onChange={e => setDescricao(e.target.value)} disabled={loading}></textarea>
          </div>
          <div>
            <label htmlFor="imagem" className="block mb-1 text-secondary font-medium">URL da Imagem</label>
            <input type="text" id="imagem" className="input-field" value={imagem} onChange={e => setImagem(e.target.value)} disabled={loading} />
          </div>
          {error && <p className="text-red-500 text-sm -mt-2 mb-2 min-h-[1.2rem]">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Adicionando...' : 'Adicionar Item'}
          </button>
        </form>
      </div>
    </main>
  )
}