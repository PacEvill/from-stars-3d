'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react' // Importar signIn
import { useRouter } from 'next/navigation' // Importar useRouter

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      setLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        redirect: false, // Não redireciona automaticamente
        email,
        senha: password, // O nome do campo deve corresponder ao que você definiu em credentials no NextAuth config
      })

      if (result?.error) {
        setError(result.error === 'CredentialsSignin' ? 'Email ou senha inválidos.' : result.error)
      } else {
        // Login bem-sucedido: verificar sessão para redirecionar admin
        try {
          const res = await fetch('/api/auth/session')
          const session = await res.json()
          if (session?.user?.isAdmin) {
            router.replace('/admin')
          } else {
            router.replace('/')
          }
        } catch {
          router.replace('/')
        }
      }
    } catch (err) {
      console.error('Erro na requisição de login:', err)
      setError('Ocorreu um erro ao tentar fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-center text-secondary">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block mb-1 text-secondary font-medium">E-mail</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 text-sm -mt-2 mb-2 min-h-[1.2rem]">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="mt-6 text-center text-secondary">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="text-accent hover:underline">Crie uma</Link>
        </div>
      </div>
    </main>
  )
}