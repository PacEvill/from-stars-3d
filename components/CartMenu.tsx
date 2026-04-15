'use client'

import { useCart } from '@/components/CartProvider'
import Link from 'next/link'
import Image from 'next/image'
import { PlusCircle, MinusCircle, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function CartMenu() {
  const { isCartOpen, closeCart, cart, loading, updateItemQuantity, removeFromCart } = useCart()

  const subtotal = cart?.itens.reduce((acc, item) => acc + item.Produto.preco * item.quantidade, 0) || 0

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={closeCart}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md h-full bg-gray-900 text-white flex flex-col shadow-lg"
            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o menu
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Seu Carrinho</h2>
              <button onClick={closeCart} className="hover:text-accent transition-colors">
                <X size={24} />
              </button>
            </div>

            {loading ? (
              <div className="flex-grow flex items-center justify-center">
                <p>Carregando...</p>
              </div>
            ) : !cart || cart.itens.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-lg font-semibold mb-2">Seu carrinho está vazio</h3>
                <p className="text-gray-400 mb-4">Adicione itens para vê-los aqui.</p>
                <Link href="/catalogo" onClick={closeCart} className="btn-primary">
                  Ver Catálogo
                </Link>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {cart.itens.map(item => (
                  <div key={item.id} className="flex items-start bg-gray-800 p-3 rounded-lg">
                    <Image 
                      src={item.Produto.imagem || '/default-avatar.svg'} 
                      alt={item.Produto.nome}
                      width={64} 
                      height={64} 
                      className="rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold text-md">{item.Produto.nome}</h3>
                      <p className="text-sm text-gray-400">R$ {item.Produto.preco.toFixed(2)}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <button onClick={() => updateItemQuantity(item.id, item.quantidade - 1)} className="hover:text-accent transition-colors disabled:opacity-50" disabled={item.quantidade <= 1}>
                          <MinusCircle size={18} />
                        </button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => updateItemQuantity(item.id, item.quantidade + 1)} className="hover:text-accent transition-colors">
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R$ {(item.Produto.preco * item.quantidade).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="mt-2 text-gray-500 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart && cart.itens.length > 0 && (
              <div className="p-4 border-t border-gray-700">
                <div className="flex justify-between mb-2 font-semibold">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Frete e impostos calculados no checkout.</p>
                <Link href="/carrinho" onClick={closeCart} className="btn-secondary w-full mb-2 text-center">
                  Ver Carrinho
                </Link>
                <button className="btn-primary w-full">
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
