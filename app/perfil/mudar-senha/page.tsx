'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MudarSenhaPage() {
  const { status } = useSession()
  const router = useRouter()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (newPassword !== confirmPassword) {
      setMessage('A nova senha e a confirmação não correspondem.')
      return
    }

    if (!newPassword || !currentPassword) {
      setMessage('Por favor, preencha todos os campos de senha.')
      return
    }

    setMessage('Alterando senha...')

    try {
      const response = await fetch('/api/usuarios/mudar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao alterar a senha.')
      }

      setMessage(data.message)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

    } catch (error: any) {
      setMessage(error.message)
    }
  }

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12 pt-24 min-h-screen flex justify-center items-center">
        <p className="text-white">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-24 min-h-screen">
      <div className="max-w-md mx-auto">
        <Link href="/perfil" className="text-accent hover:text-accent-dark mb-8 inline-block">
          &larr; Voltar para o Perfil
        </Link>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-white">Alterar Senha</h1>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="currentPassword">Senha Atual</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-accent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="newPassword">Nova Senha</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-accent"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">Confirmar Nova Senha</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-accent"
              />
            </div>
            <button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded transition duration-300">
              Salvar Nova Senha
            </button>
          </form>
          {message && <p className="mt-4 text-center text-accent">{message}</p>}
        </div>
      </div>
    </div>
  )
}
