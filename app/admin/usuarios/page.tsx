import React from 'react';

const AdminUsersPage = () => {
  const users = [
    { id: '1', name: 'João Silva', email: 'joao.silva@example.com', role: 'Cliente', registered: '2023-09-01' },
    { id: '2', name: 'Maria Souza', email: 'maria.souza@example.com', role: 'Cliente', registered: '2023-09-05' },
    { id: '3', name: 'Pedro Costa', email: 'pedro.costa@example.com', role: 'Cliente', registered: '2023-09-10' },
    { id: '4', name: 'Ana Pereira', email: 'ana.pereira@example.com', role: 'Admin', registered: '2023-08-15' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gerenciar Usuários</h1>
      <p className="text-lg text-center mb-12">Visualize e gerencie os usuários cadastrados na plataforma.</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID do Usuário</th>
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">E-mail</th>
              <th className="py-3 px-6 text-left">Função</th>
              <th className="py-3 px-6 text-left">Data de Registro</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm font-light">
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">
                  <span className={`py-1 px-3 rounded-full text-xs ${user.role === 'Admin' ? 'bg-purple-700 text-purple-100' : 'bg-gray-600 text-gray-100'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{user.registered}</td>
                <td className="py-3 px-6 text-center">
                  <button className="btn-primary py-1 px-3 text-xs mr-2">Editar</button>
                  <button className="btn-secondary py-1 px-3 text-xs">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;