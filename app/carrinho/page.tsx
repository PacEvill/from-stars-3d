'use client'

import { useCart } from '@/components/CartProvider'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, MinusCircle, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { cart, loading, updateItemQuantity, removeFromCart } = useCart()

  if (loading) {
    return <div className="container mx-auto px-4 py-12 pt-24 min-h-screen text-center text-white">Carregando carrinho...</div>
  }

  if (!cart || cart.itens.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 pt-24 min-h-screen text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Seu carrinho está vazio</h1>
        <p className="text-gray-400 mb-8">Parece que você ainda não adicionou nenhum item.</p>
        <Link href="/catalogo" className="btn-primary">
          Ver Catálogo
        </Link>
      </div>
    )
  }

  const subtotal = cart.itens.reduce((acc, item) => acc + item.Produto.preco * item.quantidade, 0)

  return (
    <div className="container mx-auto px-4 py-12 pt-24 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Seu Carrinho</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lista de Itens */}
        <div className="lg:col-span-2 space-y-4">
          {cart.itens.map(item => (
            <div key={item.id} className="flex items-center bg-gray-800 p-4 rounded-lg">
              <Image 
                src={item.Produto.imagem || '/default-avatar.svg'} 
                alt={item.Produto.nome}
                width={80} 
                height={80} 
                className="rounded-md mr-4"
              />
              <div className="flex-grow">
                <h2 className="font-bold text-lg">{item.Produto.nome}</h2>
                <p className="text-sm text-gray-400">R$ {item.Produto.preco.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => updateItemQuantity(item.id, item.quantidade - 1)} className="hover:text-accent transition-colors">
                  <MinusCircle size={20} />
                </button>
                <span>{item.quantidade}</span>
                <button onClick={() => updateItemQuantity(item.id, item.quantidade + 1)} className="hover:text-accent transition-colors">
                  <PlusCircle size={20} />
                </button>
              </div>
              <div className="ml-8">
                <p className="font-bold">R$ {(item.Produto.preco * item.quantidade).toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="ml-8 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg h-fit">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-4">Resumo</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Subtotal</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Frete</span>
            <span>Grátis</span>
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>R$ {subtotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary w-full mt-6">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}
