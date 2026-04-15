import React from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Painel Administrativo</h1>
      <p className="text-lg text-center mb-12">Bem-vindo ao painel de controle da From Stars 3D. Aqui você pode gerenciar pedidos, usuários e conteúdo do site.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card de Gerenciamento de Pedidos */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Gerenciar Pedidos</h2>
          <p className="text-gray-300 mb-4">Visualize e gerencie todos os orçamentos e pedidos recebidos.</p>
          <Link href="/admin/pedidos" className="btn-primary">Ver Pedidos</Link>
        </div>

        {/* Card de Gerenciamento de Usuários */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Gerenciar Usuários</h2>
          <p className="text-gray-300 mb-4">Administre os usuários cadastrados na plataforma.</p>
          <Link href="/admin/usuarios" className="btn-primary">Ver Usuários</Link>
        </div>

        {/* Card de Gerenciamento de Conteúdo */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Gerenciar Conteúdo</h2>
          <p className="text-gray-300 mb-4">Edite e atualize o conteúdo das páginas do site.</p>
          <Link href="/admin/conteudo" className="btn-primary">Editar Conteúdo</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;