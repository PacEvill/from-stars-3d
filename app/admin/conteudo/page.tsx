import React from 'react';

const AdminContentPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gerenciar Conteúdo do Site</h1>
      <p className="text-lg text-center mb-12">Edite e atualize o conteúdo das páginas do seu site.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card de Edição de Páginas */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Páginas do Site</h2>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            <li>Home Page</li>
            <li>Sobre Nós</li>
            <li>FAQ</li>
            <li>Serviços</li>
            <li>Portfólio</li>
            <li>Guia de Materiais</li>
            <li>Orçamento</li>
            <li>Contato</li>
          </ul>
          <button className="btn-primary">Editar Páginas</button>
        </div>

        {/* Card de Gerenciamento de Imagens */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Imagens e Mídia</h2>
          <p className="text-gray-300 mb-4">Gerencie as imagens e outros arquivos de mídia do site.</p>
          <button className="btn-primary">Gerenciar Mídia</button>
        </div>
      </div>
    </div>
  );
};

export default AdminContentPage;