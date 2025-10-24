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
        // Login bem-sucedido
        router.push('/') // Redireciona para a página de home
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
        <div className="mt-6 text-center">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="btn-secondary w-full flex items-center justify-center space-x-2"
            disabled={loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.767-2.088 5.97-6.806 5.97-4.163 0-7.542-3.317-7.542-7.48S8.077 2.525 12.24 2.525c2.448 0 3.986 1.008 4.909 1.891l3.562-3.562C18.95 1.19 16.272 0 12.24 0 5.463 0 0 5.336 0 12c0 6.284 5.04 11.36 12.24 11.36 7.152 0 11.875-5.07 11.875-11.025 0-.805-.13-1.39-.284-1.985H12.24z"/>
            </svg>
            <span>Entrar com Google</span>
          </button>
        </div>
        <div className="mt-4 text-center text-secondary">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="text-accent hover:underline">Crie uma</Link>
        </div>
      </div>
    </main>
  )
}