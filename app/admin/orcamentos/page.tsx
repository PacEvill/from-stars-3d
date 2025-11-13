'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Orcamento {
  id: number
  usuarioId: number
  produtoId: number
  quantidade: number
  valorTotal: number
  status: string
  arquivoUrl: string | null
  Usuario: {
    id: number
    nome: string | null
    email: string
  }
  Produto: {
    id: number
    nome: string
    descricao: string
    categoria: string | null
  }
}

export default function AdminOrcamentosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('todos')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<{ status: string; valorTotal: string }>({
    status: '',
    valorTotal: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrcamentos()
    }
  }, [status])

  const fetchOrcamentos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/orcamentos')
      if (response.ok) {
        const data = await response.json()
        setOrcamentos(data)
      } else {
        console.error('Erro ao buscar orçamentos')
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (orc: Orcamento) => {
    setEditingId(orc.id)
    setEditValues({
      status: orc.status,
      valorTotal: orc.valorTotal.toString()
    })
  }

  const handleSave = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/orcamentos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editValues.status,
          valorTotal: parseFloat(editValues.valorTotal)
        })
      })

      if (response.ok) {
        await fetchOrcamentos()
        setEditingId(null)
        alert('Orçamento atualizado com sucesso!')
      } else {
        alert('Erro ao atualizar orçamento')
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar alterações')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este orçamento?')) return

    try {
      const response = await fetch(`/api/admin/orcamentos/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchOrcamentos()
        alert('Orçamento deletado com sucesso!')
      } else {
        alert('Erro ao deletar orçamento')
      }
    } catch (error) {
      console.error('Erro ao deletar:', error)
      alert('Erro ao deletar orçamento')
    }
  }

  const downloadArquivo = (arquivoUrl: string, nomeArquivo: string) => {
    const link = document.createElement('a')
    link.href = arquivoUrl
    link.download = nomeArquivo
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredOrcamentos = orcamentos.filter(orc => {
    if (filter === 'todos') return true
    return orc.status.toLowerCase() === filter.toLowerCase()
  })

  const statusColors: Record<string, string> = {
    'Pendente': 'bg-yellow-600',
    'Em Análise': 'bg-blue-600',
    'Aprovado': 'bg-green-600',
    'Recusado': 'bg-red-600',
    'Concluído': 'bg-purple-600'
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex justify-center items-center">
        <p className="text-white text-xl">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="mb-8">
        <Link href="/admin" className="text-accent hover:underline mb-4 inline-block">
          ← Voltar ao Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-center mb-4">Gerenciar Orçamentos</h1>
        <p className="text-center text-gray-400 mb-8">
          Total de orçamentos: {orcamentos.length}
        </p>

        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {['todos', 'Pendente', 'Em Análise', 'Aprovado', 'Recusado', 'Concluído'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition ${
                filter === status
                  ? 'bg-accent text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {status === 'todos' ? 'Todos' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Orçamentos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Cliente</th>
              <th className="py-3 px-6 text-left">Arquivo</th>
              <th className="py-3 px-6 text-left">Mensagem</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Valor (R$)</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {filteredOrcamentos.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">
                  Nenhum orçamento encontrado
                </td>
              </tr>
            ) : (
              filteredOrcamentos.map((orc) => (
                <tr key={orc.id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    #{orc.id}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div>
                      <p className="font-semibold">{orc.Usuario.nome || 'Sem nome'}</p>
                      <p className="text-xs text-gray-400">{orc.Usuario.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div>
                      <p className="font-semibold text-sm">{orc.Produto.nome}</p>
                      {orc.arquivoUrl && (
                        <button
                          onClick={() => downloadArquivo(orc.arquivoUrl!, orc.Produto.nome)}
                          className="text-xs text-blue-400 hover:underline mt-1"
                        >
                          📥 Baixar arquivo
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <p className="text-xs line-clamp-2">{orc.Produto.descricao}</p>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {editingId === orc.id ? (
                      <select
                        value={editValues.status}
                        onChange={(e) => setEditValues({ ...editValues, status: e.target.value })}
                        className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Análise">Em Análise</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Recusado">Recusado</option>
                        <option value="Concluído">Concluído</option>
                      </select>
                    ) : (
                      <span className={`py-1 px-3 rounded-full text-xs ${statusColors[orc.status] || 'bg-gray-600'}`}>
                        {orc.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {editingId === orc.id ? (
                      <input
                        type="number"
                        value={editValues.valorTotal}
                        onChange={(e) => setEditValues({ ...editValues, valorTotal: e.target.value })}
                        className="bg-gray-700 text-white px-2 py-1 rounded text-sm w-24"
                        step="0.01"
                      />
                    ) : (
                      <span className="font-semibold">
                        {orc.valorTotal > 0 ? `R$ ${orc.valorTotal.toFixed(2)}` : '-'}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {editingId === orc.id ? (
                        <>
                          <button
                            onClick={() => handleSave(orc.id)}
                            className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-xs"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-xs"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(orc)}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(orc.id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xs"
                          >
                            Deletar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
