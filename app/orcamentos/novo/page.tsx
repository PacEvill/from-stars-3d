'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovoOrcamentoPage() {
  const [usuarioId, setUsuarioId] = useState('')
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [valorTotal, setValorTotal] = useState('')
  const [status, setStatus] = useState('Pendente') // Valor padrão
  const [arquivo, setArquivo] = useState<File | null>(null) // Novo estado para o arquivo
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validação básica
    if (!usuarioId || !produtoId || !quantidade || !valorTotal || !status) {
      setError('Por favor, preencha todos os campos.')
      setLoading(false)
      return
    }

    // Converter IDs e valores para número
    const parsedUsuarioId = parseInt(usuarioId)
    const parsedProdutoId = parseInt(produtoId)
    const parsedQuantidade = parseInt(quantidade)
    const parsedValorTotal = parseFloat(valorTotal)

    if (isNaN(parsedUsuarioId) || isNaN(parsedProdutoId) || isNaN(parsedQuantidade) || isNaN(parsedValorTotal)) {
      setError('IDs, quantidade e valor total devem ser números válidos.')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('usuarioId', usuarioId)
    formData.append('produtoId', produtoId)
    formData.append('quantidade', quantidade)
    formData.append('valorTotal', valorTotal)
    formData.append('status', status)
    if (arquivo) {
      formData.append('arquivo', arquivo)
    }

    try {
      const response = await fetch('/api/orcamentos', {
        method: 'POST',
        // Não defina 'Content-Type' para FormData, o navegador fará isso automaticamente
        body: formData,
      })

      if (response.ok) {
        alert('Orçamento criado com sucesso!')
        router.push('/orcamentos') // Redireciona para a lista de orçamentos ou similar
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Erro ao criar orçamento.')
      }
    } catch (err) {
      console.error('Erro na requisição:', err)
      setError('Ocorreu um erro ao tentar criar o orçamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-center text-secondary">Criar Novo Orçamento</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="usuarioId" className="block mb-1 text-secondary font-medium">ID do Usuário</label>
            <input type="number" id="usuarioId" className="input-field !text-white placeholder-white" value={usuarioId} onChange={e => setUsuarioId(e.target.value)} disabled={loading} placeholder="Ex: 1" />
          </div>
          <div>
            <label htmlFor="produtoId" className="block mb-1 text-secondary font-medium">ID do Produto</label>
            <input type="number" id="produtoId" className="input-field !text-white placeholder-white" value={produtoId} onChange={e => setProdutoId(e.target.value)} disabled={loading} placeholder="Ex: 101" />
          </div>
          <div>
            <label htmlFor="quantidade" className="block mb-1 text-secondary font-medium">Quantidade</label>
            <input type="number" id="quantidade" className="input-field !text-white placeholder-white" value={quantidade} onChange={e => setQuantidade(e.target.value)} disabled={loading} placeholder="Ex: 5" />
          </div>
          <div>
            <label htmlFor="valorTotal" className="block mb-1 text-secondary font-medium">Valor Total</label>
            <input type="number" id="valorTotal" className="input-field !text-white placeholder-white" value={valorTotal} onChange={e => setValorTotal(e.target.value)} disabled={loading} step="0.01" placeholder="Ex: 150.75" />
          </div>
          <div>
            <label htmlFor="status" className="block mb-1 text-secondary font-medium">Status</label>
            <select id="status" className="input-field !text-white" value={status} onChange={e => setStatus(e.target.value)} disabled={loading}>
              <option value="Pendente">Pendente</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Rejeitado">Rejeitado</option>
              <option value="Concluido">Concluído</option>
            </select>
          </div>
          <div>
            <label htmlFor="arquivo" className="block mb-1 text-secondary font-medium">Anexar Arquivo (Opcional)</label>
            <input
              type="file"
              id="arquivo"
              className="input-field !text-white" // Adicionei !text-white aqui também
              onChange={e => setArquivo(e.target.files ? e.target.files[0] : null)}
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 text-sm -mt-2 mb-2 min-h-[1.2rem]">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Orçamento'}
          </button>
        </form>
      </div>
    </main>
  )
}