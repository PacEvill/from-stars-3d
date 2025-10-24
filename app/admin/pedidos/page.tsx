"use client";
import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  user: string;
  email: string;
  message: string;
  file: { name: string; type: string; size: number } | null;
  status: string;
  date: string;
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/pedidos');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gerenciar Pedidos</h1>
      <p className="text-lg text-center mb-12">Visualize e gerencie os orçamentos e pedidos recebidos.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID do Pedido</th>
              <th className="py-3 px-6 text-left">Usuário</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Mensagem</th>
              <th className="py-3 px-6 text-left">Arquivo</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Data</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                <td className="py-3 px-6 text-left">{order.user}</td>
                <td className="py-3 px-6 text-left">{order.email}</td>
                <td className="py-3 px-6 text-left">{order.message}</td>
                <td className="py-3 px-6 text-left">{order.file ? order.file.name : 'N/A'}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${order.status === 'Pendente' ? 'bg-yellow-700 text-yellow-100' : order.status === 'Em Produção' ? 'bg-blue-700 text-blue-100' : 'bg-green-700 text-green-100'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{order.date}</td>
                <td className="py-3 px-6 text-center">
                  <button className="btn-primary py-1 px-3 text-xs mr-2">Ver Detalhes</button>
                  <button className="btn-secondary py-1 px-3 text-xs">Atualizar Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;