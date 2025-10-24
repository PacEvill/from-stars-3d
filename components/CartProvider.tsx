'use client'

import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react'
import { useSession } from 'next-auth/react'

// Definindo os tipos para o carrinho e itens
interface Product {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
}

interface CartItem {
  id: number;
  produtoId: number;
  quantidade: number;
  Produto: Product;
}

interface Cart {
  id: number;
  usuarioId: number;
  itens: CartItem[];
}

// Definindo o tipo para o contexto do carrinho
interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateItemQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
}

// Criando o contexto com um valor padrão
const CartContext = createContext<CartContextType | undefined>(undefined)

// O Provedor do Carrinho
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const fetchCart = useCallback(async () => {
    if (status === 'authenticated') {
      setLoading(true)
      try {
        const response = await fetch('/api/carrinho')
        if (!response.ok) {
          throw new Error('Falha ao buscar o carrinho.')
        }
        const data = await response.json()
        setCart(data)
      } catch (error) {
        console.error(error)
        setCart(null) // Limpa o carrinho em caso de erro
      } finally {
        setLoading(false)
      }
    } else {
      setCart(null)
      setLoading(false)
    }
  }, [status])

  // Efeito para buscar o carrinho quando o status da sessão muda
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  // Função para adicionar ao carrinho
  const addToCart = async (produtoId: number, quantidade: number) => {
    if (status !== 'authenticated') {
      alert('Você precisa estar logado para adicionar itens ao carrinho.')
      return
    }
    try {
      const response = await fetch('/api/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtoId, quantidade }),
      })
      if (!response.ok) throw new Error('Falha ao adicionar item.')
      const updatedCart = await response.json()
      setCart(updatedCart)
      alert('Item adicionado ao carrinho!')
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao adicionar o item.')
    }
  }

  // Função para atualizar a quantidade de um item
  const updateItemQuantity = async (itemId: number, quantidade: number) => {
    try {
      const response = await fetch(`/api/carrinho/items/${itemId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantidade }),
        }
      )
      if (!response.ok) throw new Error('Falha ao atualizar o item.')
      await fetchCart() // Re-busca o carrinho para ter o estado mais recente
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao atualizar o item.')
    }
  }

  // Função para remover um item do carrinho
  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`/api/carrinho/items/${itemId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Falha ao remover o item.')
      await fetchCart() // Re-busca o carrinho para ter o estado mais recente
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao remover o item.')
    }
  }

  return (
    <CartContext.Provider value={{ cart, loading, isCartOpen, openCart, closeCart, addToCart, updateItemQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook customizado para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
