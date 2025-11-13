import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  if (!(session.user as any)?.isAdmin) {
    redirect('/')
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Painel Administrativo</h1>
      <p className="text-lg text-center mb-12">Bem-vindo ao painel de controle da From Stars 3D. Aqui você pode gerenciar pedidos, usuários e conteúdo do site.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card de Gerenciamento de Orçamentos */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700 transition">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Orçamentos</h2>
          <p className="text-gray-300 mb-4">Gerencie solicitações de orçamento com arquivos STL/OBJ.</p>
          <Link href="/admin/orcamentos" className="btn-primary">Ver Orçamentos</Link>
        </div>

        {/* Card de Gerenciamento de Pedidos */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700 transition">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Pedidos</h2>
          <p className="text-gray-300 mb-4">Visualize e gerencie todos os pedidos recebidos.</p>
          <Link href="/admin/pedidos" className="btn-primary">Ver Pedidos</Link>
        </div>

        {/* Card de Gerenciamento de Usuários */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700 transition">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Usuários</h2>
          <p className="text-gray-300 mb-4">Administre os usuários cadastrados na plataforma.</p>
          <Link href="/admin/usuarios" className="btn-primary">Ver Usuários</Link>
        </div>

        {/* Card de Gerenciamento de Conteúdo */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center hover:bg-gray-700 transition">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Conteúdo</h2>
          <p className="text-gray-300 mb-4">Edite e atualize o conteúdo das páginas do site.</p>
          <Link href="/admin/conteudo" className="btn-primary">Editar Conteúdo</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;