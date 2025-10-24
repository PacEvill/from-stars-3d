'use client'

import { useCart } from '@/components/CartProvider'
import { ShoppingCart } from 'lucide-react'

interface AddToCartButtonProps {
  productId: number;
  disponibilidade: string | null;
}

export default function AddToCartButton({ productId, disponibilidade }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  return (
    <button 
      onClick={() => addToCart(productId, 1)}
      className="btn-primary w-full flex items-center justify-center mt-4"
      disabled={disponibilidade === 'Esgotado'}
    >
      <ShoppingCart size={18} className="mr-2" />
      {disponibilidade === 'Esgotado' ? 'Esgotado' : 'Adicionar ao Carrinho'}
    </button>
  )
}
