import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary-foreground">Sobre Nós</h1>
      <div className="bg-card p-8 rounded-lg shadow-lg text-gray-300 leading-relaxed">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-accentAlt border-b border-gray-700 pb-2">Nossa Missão</h2>
          <p className="mb-4">Bem-vindo à From Stars 3D, onde a paixão pela impressão 3D se encontra com a arte e a inovação. Somos dedicados a transformar ideias em realidade tangível, criando peças únicas e personalizadas que encantam e inspiram.</p>
          <p>Nossa missão é democratizar o acesso à tecnologia de impressão 3D, oferecendo produtos de alta qualidade e um serviço excepcional, permitindo que nossos clientes transformem suas visões em objetos reais e duradouros.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-accentAlt border-b border-gray-700 pb-2">Nossa História</h2>
          <p className="mb-4">Nossa jornada começou com a fascinação pelas infinitas possibilidades que a tecnologia 3D oferece. Desde então, temos nos aprimorado constantemente, utilizando os melhores materiais e as técnicas mais avançadas para garantir a qualidade e a precisão em cada detalhe.</p>
          <p>Acreditamos que cada objeto impresso em 3D conta uma história. Seja para presentear alguém especial, decorar seu espaço ou dar vida a um projeto pessoal, estamos aqui para ajudar a materializar seus sonhos com criatividade e excelência.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-accentAlt border-b border-gray-700 pb-2">O Que Fazemos</h2>
          <p className="mb-4">Explore nosso catálogo e descubra a diversidade de produtos que oferecemos, desde miniaturas detalhadas a peças funcionais e decorativas. Utilizamos uma variedade de materiais, como PLA, PETG e ABS, para atender às suas necessidades específicas.</p>
          <p>Se você tem uma ideia específica em mente, entre em contato conosco! Adoramos desafios e estamos prontos para criar algo verdadeiramente exclusivo para você, desde o conceito inicial até a entrega final.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-accentAlt border-b border-gray-700 pb-2">Nosso Compromisso</h2>
          <p className="mb-4">Nosso compromisso é com a satisfação do cliente, a inovação contínua e a sustentabilidade. Buscamos sempre as melhores práticas para minimizar nosso impacto ambiental e garantir que nossos produtos sejam feitos com responsabilidade.</p>
          <p className="mb-4">Obrigado por escolher a From Stars 3D. Estamos ansiosos para criar algo incrível com você!</p>
          <p>Se você tiver alguma dúvida ou quiser discutir um projeto, <a href="/contato" className="text-blue-400 hover:underline">entre em contato conosco</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;