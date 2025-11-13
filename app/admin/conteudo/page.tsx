import prisma from '@/lib/prisma';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

// Forçar a página a ser dinâmica para evitar chamadas ao DB durante build
export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  // Busca todos os materiais no banco, ordenados por ID.
  const materials = await prisma.material.findMany({
    orderBy: { id: 'asc' },
  });

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciar Conteúdo</h1>
        {/* Este link aponta para uma página de criação que podemos implementar no futuro */}
        <Link href="/admin/conteudo/materiais/novo" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          <PlusCircle size={20} />
          Adicionar Material
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4">Materiais Cadastrados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-lg">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-mono">{material.id}</td>
                  <td className="p-4">{material.nome}</td>
                  <td className="p-4 flex gap-4">
                    {/* Botões de ação como placeholders para funcionalidades futuras */}
                    <button className="text-blue-400 hover:text-blue-300 font-semibold">Editar</button>
                    <button className="text-red-400 hover:text-red-300 font-semibold">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {materials.length === 0 && (
          <p className="text-center text-gray-400 py-8">Nenhum material cadastrado.</p>
        )}
      </div>
    </div>
  );
};