'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CadastroProdutoPage() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagem, setImagem] = useState('')
  const [usuarioId, setUsuarioId] = useState('')
  const [materialId, setMaterialId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validação básica
    if (!nome || !descricao || !preco || !imagem || !usuarioId || !materialId) {
      setError('Por favor, preencha todos os campos.')
      setLoading(false)
      return
    }

    // Converter IDs para número
    const parsedUsuarioId = parseInt(usuarioId)
    const parsedMaterialId = parseInt(materialId)
    const parsedPreco = parseFloat(preco)

    if (isNaN(parsedUsuarioId) || isNaN(parsedMaterialId) || isNaN(parsedPreco)) {
      setError('IDs de usuário e material, e preço devem ser números válidos.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco: parsedPreco,
          imagem,
          usuarioId: parsedUsuarioId,
          materialId: parsedMaterialId,
        }),
      })

      if (response.ok) {
        alert('Produto cadastrado com sucesso!')
        router.push('/produtos') // Redireciona para a lista de produtos ou similar
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Erro ao cadastrar produto.')
      }
    } catch (err) {
      console.error('Erro na requisição:', err)
      setError('Ocorreu um erro ao tentar cadastrar o produto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-center text-secondary">Cadastrar Produto</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="nome" className="block mb-1 text-secondary font-medium">Nome</label>
            <input type="text" id="nome" className="input-field" value={nome} onChange={e => setNome(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label htmlFor="descricao" className="block mb-1 text-secondary font-medium">Descrição</label>
            <textarea id="descricao" className="input-field" value={descricao} onChange={e => setDescricao(e.target.value)} disabled={loading}></textarea>
          </div>
          <div>
            <label htmlFor="preco" className="block mb-1 text-secondary font-medium">Preço</label>
            <input type="number" id="preco" className="input-field" value={preco} onChange={e => setPreco(e.target.value)} disabled={loading} step="0.01" />
          </div>
          <div>
            <label htmlFor="imagem" className="block mb-1 text-secondary font-medium">URL da Imagem</label>
            <input type="text" id="imagem" className="input-field" value={imagem} onChange={e => setImagem(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label htmlFor="usuarioId" className="block mb-1 text-secondary font-medium">ID do Usuário</label>
            <input type="number" id="usuarioId" className="input-field" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label htmlFor="materialId" className="block mb-1 text-secondary font-medium">ID do Material</label>
            <input type="number" id="materialId" className="input-field" value={materialId} onChange={e => setMaterialId(e.target.value)} disabled={loading} />
          </div>
          {error && <p className="text-red-500 text-sm -mt-2 mb-2 min-h-[1.2rem]">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Produto'}
          </button>
        </form>
      </div>
    </main>
  )
}