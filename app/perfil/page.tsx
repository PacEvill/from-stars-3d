'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (session?.user?.image) setProfileImage(session.user.image)
  }, [session?.user?.image])

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

    // Validar tipo de arquivo no frontend
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      setMessage('Formato de imagem não suportado. Use JPG, PNG, WEBP ou GIF.')
      return
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setMessage('Imagem muito grande. Tamanho máximo: 5MB.')
      return
    }

    setMessage('Atualizando imagem...')
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/usuarios/imagem', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao atualizar a imagem.')
      }

      // Atualiza a sessão do NextAuth e estado local para refletir a nova imagem
      await update({ user: { image: data.imageUrl } } as any)
      setProfileImage(data.imageUrl)

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna do Menu Lateral */}
          <aside className="md:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
            <nav className="space-y-2">
              <Link href="/perfil">
                <a className="block text-white font-semibold bg-gray-700 p-3 rounded-md">Meu Perfil</a>
              </Link>
              <Link href="/perfil/pedidos">
                <a className="block text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded-md">Meus Pedidos</a>
              </Link>
              <Link href="/perfil/enderecos">
                <a className="block text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded-md">Meus Endereços</a>
              </Link>
            </nav>
          </aside>

          {/* Coluna Principal de Conteúdo */}
          <main className="md:col-span-3 space-y-8">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex items-center space-x-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={profileImage || '/default-avatar.svg'}
                  alt="Foto de Perfil"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{session.user.name}</h2>
                <p className="text-lg text-gray-400">{session.user.email}</p>
                <label htmlFor="imageUpload" className="mt-4 inline-block cursor-pointer bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded transition duration-300 text-sm">
                  Trocar Imagem
                </label>
                <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-white">Alterar Senha</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="currentPassword">Senha Atual</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="newPassword">Nova Senha</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-accent"
                  />
                </div>
                <button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 px-4 rounded transition duration-300">
                  Salvar Nova Senha
                </button>
              </form>
              {message && <p className="mt-4 text-center text-accent">{message}</p>}
            </div>
          </main>
        </div>
      </div>
    )
  }

  return null
}