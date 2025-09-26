'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Em uma aplicação real, você usaria FormData para enviar o arquivo.
    // Como estamos simulando, apenas chamamos o endpoint.
    setMessage('Atualizando imagem...')
    try {
      const response = await fetch('/api/usuarios/imagem', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao atualizar a imagem.')
      }

      // Atualiza a sessão do NextAuth para refletir a nova imagem
      await update({
        ...session,
        user: {
          ...session?.user,
          image: data.imageUrl,
        },
      })

      setMessage(data.message)
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

  if (status === 'authenticated') {
    return (
      <div className="container mx-auto px-4 py-12 pt-24 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-white">Seu Perfil</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coluna da Imagem e Info */}
          <div className="md:col-span-1 bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <Image
                src={session.user.image || '/default-avatar.svg'} // Use uma imagem padrão
                alt="Foto de Perfil"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold text-white">{session.user.name}</h2>
            <p className="text-md text-gray-400">{session.user.email}</p>
            
            <label htmlFor="imageUpload" className="mt-6 cursor-pointer bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded transition duration-300">
              Trocar Imagem
            </label>
            <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          {/* Coluna da Troca de Senha */}
          <div className="md:col-span-2 bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">Alterar Senha</h2>
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

  return null
}