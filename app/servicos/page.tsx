import React from 'react';

const ServicosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Nossos Serviços</h1>
      <p className="text-lg text-center mb-12">Na From Stars 3D, oferecemos uma gama completa de serviços de impressão 3D para transformar suas ideias em realidade.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Serviço 1: Consultoria em Impressão 3D */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Consultoria em Impressão 3D</h2>
          <p className="text-gray-300 mb-4">Precisa de ajuda para iniciar seu projeto? Nossos especialistas oferecem consultoria personalizada para escolher o material certo, otimizar seu design e garantir os melhores resultados.</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Análise de viabilidade do projeto</li>
            <li>Seleção de materiais (resina, filamento)</li>
            <li>Otimização de design para impressão</li>
          </ul>
        </div>

        {/* Serviço 2: Modelagem e Otimização de Arquivos */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Modelagem e Otimização de Arquivos</h2>
          <p className="text-gray-300 mb-4">Não tem um arquivo 3D? Nossa equipe pode criar modelos do zero ou otimizar seus arquivos existentes para garantir uma impressão perfeita e eficiente.</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Criação de modelos 3D personalizados</li>
            <li>Reparo e otimização de malhas</li>
            <li>Conversão de formatos de arquivo (.STL, .OBJ)</li>
          </ul>
        </div>

        {/* Serviço 3: Impressão e Pós-processamento */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Impressão e Pós-processamento</h2>
          <p className="text-gray-300 mb-4">Oferecemos impressão 3D de alta qualidade com tecnologias de resina (SLA/DLP) e filamento (FDM), além de serviços de pós-processamento para um acabamento impecável.</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Impressão em resina para detalhes finos</li>
            <li>Impressão em filamento para peças robustas</li>
            <li>Lixamento, pintura e montagem</li>
          </ul>
        </div>

        {/* Serviço 4: Gestão de Projetos e Atendimento ao Cliente */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Gestão de Projetos e Atendimento ao Cliente</h2>
          <p className="text-gray-300 mb-4">Desde a concepção até a entrega, gerenciamos seu projeto com total transparência e comunicação constante, garantindo que suas expectativas sejam superadas.</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Acompanhamento detalhado do projeto</li>
            <li>Canais de comunicação diretos</li>
            <li>Suporte técnico pós-entrega</li>
          </ul>
        </div>

        {/* Serviço 5: Marketing Digital e Criação de Portfólio */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">Marketing Digital e Criação de Portfólio</h2>
          <p className="text-gray-300 mb-4">Ajudamos você a divulgar seus projetos impressos em 3D, criando conteúdo visual atraente e estratégias de marketing digital para destacar seu trabalho.</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Fotografia e renderização de produtos</li>
            <li>Criação de conteúdo para redes sociais</li>
            <li>Estratégias de SEO para portfólio online</li>
          </ul>
        </div>

        {/* Seção de Encomendas e Orçamento */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-full text-center">
          <h2 className="text-3xl font-semibold text-purple-400 mb-4">Pronto para Encomendar seu Projeto?</h2>
          <p className="text-gray-300 mb-6">Se você já tem uma ideia ou um arquivo 3D, solicite um orçamento personalizado. Nossa equipe está pronta para transformar sua visão em realidade.</p>
          <a href="/contato" className="btn-primary px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">Solicitar Orçamento</a>
        </div>

        {/* Seção de Guia de Materiais */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-full text-center">
          <h2 className="text-3xl font-semibold text-purple-400 mb-4">Conheça Nossos Materiais</h2>
          <p className="text-gray-300 mb-6">Explore nosso guia completo de materiais para impressão 3D e descubra qual é o ideal para o seu projeto.</p>
          <a href="/materiais" className="btn-secondary px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">Ver Guia de Materiais</a>
        </div>
      </div>
    </div>
  );
};

export default ServicosPage;