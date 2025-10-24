'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define a interface para um Pedido
interface Pedido {
  id: number;
  createdAt: string;
  valorTotal: number;
  status: string;
  itens: any[]; // Simplificado por enquanto
}

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await fetch('/api/pedidos');
        if (!response.ok) {
          throw new Error('Falha ao buscar os pedidos.');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPedidos();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Carregando pedidos...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>
      
      {pedidos.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Pedido #{String(pedido.id).padStart(4, '0')}</h2>
                  <p className="text-sm text-gray-600">
                    Data: {new Date(pedido.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">
                    R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}
                  </p>
                  <span 
                    className={`px-3 py-1 text-sm rounded-full ${pedido.status === 'Pendente' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                    {pedido.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Link href={`/pedidos/${pedido.id}`}>
                  <a className="text-indigo-600 hover:text-indigo-800 font-semibold">Ver Detalhes</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
