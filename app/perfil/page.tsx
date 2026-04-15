'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import HistoricoPedidos from '@/components/HistoricoPedidos'

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const [message, setMessage] = useState('')
  const [verificationMessage, setVerificationMessage] = useState('')
  const [activeTab, setActiveTab] = useState('perfil')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setMessage('Atualizando imagem...')
    try {
      const response = await fetch('/api/usuarios/imagem', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao atualizar a imagem.')
      }

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

  const handleSendVerificationEmail = async () => {
    setVerificationMessage('Enviando e-mail de verificação...');
    // A lógica para chamar a API de envio de e-mail virá aqui
    setTimeout(() => {
      setVerificationMessage('Um novo e-mail de verificação foi enviado para o seu endereço.');
    }, 2000);
  };

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12 pt-24 min-h-screen flex justify-center items-center">
        <p className="text-white">Carregando...</p>
      </div>
    )
  }

  if (status === 'authenticated' && session?.user) {
    return (
      <div className="container mx-auto px-4 py-12 pt-24 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-white">Sua Conta</h1>
        
        <div className="mb-8 border-b border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('perfil')}
              className={`${ activeTab === 'perfil' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500' } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Perfil
            </button>
            <button
              onClick={() => setActiveTab('pedidos')}
              className={`${ activeTab === 'pedidos' ? 'border-accent text-accent' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500' } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Histórico de Pedidos
            </button>
          </nav>
        </div>

        <div>
          {activeTab === 'perfil' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center self-start">
                <div className="relative w-40 h-40 mb-4">
                  <Image
                    src={session.user.image || '/default-avatar.svg'}
                    alt="Foto de Perfil"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">{session.user.name || 'Usuário'}</h2>
                <p className="text-md text-gray-400">{session.user.email || 'Sem e-mail'}</p>
                
                <label htmlFor="imageUpload" className="mt-6 cursor-pointer bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded transition duration-300">
                  Trocar Imagem
                </label>
                <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>

              <div className="md:col-span-2 bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-white">Segurança</h2>
                <p className="text-gray-400 mb-6">Para sua segurança, você pode alterar sua senha a qualquer momento.</p>
                <Link href="/perfil/mudar-senha" className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded transition duration-300 inline-block">
                  Alterar Senha
                </Link>
                {message && <p className="mt-4 text-center text-accent">{message}</p>}

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h2 className="text-2xl font-bold mb-6 text-white">Verificação de E-mail</h2>
                  {session.user.emailVerified ? (
                    <p className="text-green-400">Seu e-mail foi verificado com sucesso.</p>
                  ) : (
                    <div>
                      <p className="text-yellow-400 mb-4">Seu e-mail ainda não foi verificado. Por favor, verifique sua caixa de entrada ou clique no botão abaixo para reenviar o e-mail de verificação.</p>
                      <button
                        onClick={handleSendVerificationEmail}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                      >
                        Reenviar E-mail de Verificação
                      </button>
                      {verificationMessage && <p className="mt-4 text-center text-accent">{verificationMessage}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pedidos' && (
            <HistoricoPedidos />
          )}
        </div>
      </div>
    )
  }

  return null
}