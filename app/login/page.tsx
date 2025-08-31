'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }
    setError('')
    // Simulação de login
    alert('Login (simulado) bem-sucedido!')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-heading font-semibold mb-6 text-center text-secondary">Entrar</h2>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block mb-1 text-secondary font-medium">E-mail</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            />
          </div>
          {error && <p className="text-red-500 text-sm -mt-2 mb-2 min-h-[1.2rem]">{error}</p>}
          <button type="submit" className="btn-primary w-full">Entrar</button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 text-gray-400 text-sm">Ou entre com</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-100 transition mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.973 5.887 29.803 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.973 5.887 29.803 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12h-8c0 11.045 8.955 20 20 20z"/><path fill="#1976D2" d="M43.611 20.083H24v8h11.303a12.04 12.04 0 0 1-4.087 6.462l6.19 5.238C42.012 35.245 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
          <span>Continuar com Google</span>
        </button>
        <div className="mt-4 text-center text-secondary">
          Não tem uma conta?{' '}
          <Link href="/cadastro" className="text-accent hover:underline">Registre-se</Link>
        </div>
      </div>
    </main>
  )
} 