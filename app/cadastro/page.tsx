'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // Importar useRouter

export default function CadastroPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // Novo estado para loading
  const router = useRouter() // Inicializar useRouter

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('') // Limpa erros anteriores
    setLoading(true) // Ativa o estado de loading

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.')
      setLoading(false)
      return
    }
    if (password !== confirmPassword) {
      setLoading(false)
      setError('As senhas não coincidem.')
      return
    }

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: name, email, senha: password }),
      })

      if (response.ok) {
        alert('Cadastro realizado com sucesso!')
        router.push('/login') // Redireciona para a página de login após o cadastro
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Erro ao cadastrar usuário.')
      }
    } catch (err) {
      console.error('Erro na requisição:', err)
      setError('Ocorreu um erro ao tentar cadastrar o usuário. Tente novamente.')
    } finally {
      setLoading(false) // Desativa o estado de loading
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-center text-secondary">Criar Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block mb-1 text-secondary font-medium">Nome</label>
            <input
              type="text"
              id="name"
              className="input-field"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading} // Desabilita enquanto carrega
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 text-secondary font-medium">E-mail</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading} // Desabilita enquanto carrega
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-secondary font-medium">Senha</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading} // Desabilita enquanto carrega
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-secondary font-medium">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              disabled={loading} // Desabilita enquanto carrega
            />
          </div>
          {error && <p className="text-red-500 text-sm -mt-2 mb-2 min-h-[1.2rem]">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>
        <div className="mt-4 text-center text-secondary">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-accent hover:underline">Faça login</Link>
        </div>
      </div>
    </main>
  )
}
