'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

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
        redirect: false,
        email,
        senha: password,
      })

      if (result?.error) {
        setError(result.error === 'CredentialsSignin' ? 'Email ou senha inválidos.' : result.error)
      } else {
        router.push('/')
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
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/5 border-b border-gray-500 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-400 uppercase">ou faça login com</span>
          <span className="w-1/5 border-b border-gray-500 lg:w-1/4"></span>
        </div>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/perfil' })}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <div className="mt-6 text-center text-secondary">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="text-accent hover:underline">Crie uma</Link>
        </div>
      </div>
    </main>
  )
}