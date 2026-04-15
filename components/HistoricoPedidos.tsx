'use client'

import { useState, useEffect } from 'react'

interface Order {
  id: string;
  user: string;
  email: string;
  message: string;
  file: {
    name: string;
    type: string;
    size: number;
  } | null;
  status: string;
  date: string;
}

export default function HistoricoPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/pedidos');
        if (!response.ok) {
          throw new Error('Falha ao buscar os pedidos.');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-gray-300">Carregando histórico de pedidos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white">Histórico de Pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">Você ainda não tem nenhum pedido.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-300">
            <thead className="border-b border-gray-600 font-medium">
              <tr>
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Data</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Mensagem</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium">#{order.id}</td>
                  <td className="px-6 py-4">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                      ${order.status === 'Pendente' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${order.status === 'Enviado' ? 'bg-blue-500/20 text-blue-400' : ''}
                      ${order.status === 'Entregue' ? 'bg-green-500/20 text-green-400' : ''}
                    `}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate">{order.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
