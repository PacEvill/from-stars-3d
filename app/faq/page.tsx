"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-medium text-secondary hover:text-accent transition-colors duration-300">
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-300 leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqData = [
    {
      category: 'Sobre os Produtos',
      questions: [
        {
          question: '1. Quais materiais são utilizados nas impressões 3D?',
          answer: 'Utilizamos uma variedade de materiais de alta qualidade, como PLA, PETG e ABS, dependendo da aplicação e das características desejadas para a peça. Cada material oferece propriedades únicas de durabilidade, flexibilidade e acabamento.',
        },
        {
          question: '2. Posso solicitar um produto personalizado?',
          answer: 'Sim! Adoramos criar peças personalizadas. Entre em contato conosco através da página de contato ou por e-mail, descrevendo sua ideia e anexando referências, se tiver. Nossa equipe entrará em contato para discutir as possibilidades e o orçamento.',
        },
        {
          question: '3. Como devo cuidar do meu produto impresso em 3D?',
          answer: 'A maioria dos produtos impressos em 3D pode ser limpa com um pano úmido. Evite exposição prolongada ao sol ou a altas temperaturas, pois isso pode deformar o material. Para peças mais delicadas, recomendamos manuseio cuidadoso.',
        },
      ],
    },
    {
      category: 'Sobre Pedidos e Entrega',
      questions: [
        {
          question: '4. Qual o prazo de produção e entrega?',
          answer: 'O prazo de produção varia de acordo com a complexidade e o tamanho do produto, geralmente entre 3 a 7 dias úteis. O prazo de entrega dependerá da sua localização e do método de envio escolhido. Você receberá um código de rastreamento assim que o pedido for despachado.',
        },
        {
          question: '5. Quais são as formas de pagamento aceitas?',
          answer: 'Aceitamos diversas formas de pagamento, incluindo cartões de crédito (Visa, MasterCard, American Express), boleto bancário e PIX. Todas as transações são seguras e processadas por plataformas confiáveis.',
        },
        {
          question: '6. Posso trocar ou devolver um produto?',
          answer: 'Nossa política de troca e devolução está em conformidade com o Código de Defesa do Consumidor. Produtos com defeito de fabricação podem ser trocados ou devolvidos em até 7 dias após o recebimento. Para produtos personalizados, a troca ou devolução só é possível em caso de defeito ou não conformidade com o projeto aprovado.',
        },
      ],
    },
    {
      category: 'Outras Dúvidas',
      questions: [
        {
          question: '7. Como posso entrar em contato com o suporte?',
          answer: 'Você pode entrar em contato conosco através do formulário na página de Contato, pelo e-mail [seu_email@example.com] ou pelo telefone [seu_telefone]. Nosso horário de atendimento é de segunda a sexta-feira, das 9h às 18h.',
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary-foreground">Perguntas Frequentes (FAQ)</h1>
      <div className="bg-card p-6 rounded-lg shadow-lg">
        {faqData.map((categoryData, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <h2 className="text-2xl font-semibold mb-6 text-accentAlt border-b border-gray-700 pb-3">
              {categoryData.category}
            </h2>
            <div>
              {categoryData.questions.map((item, qIndex) => (
                <AccordionItem key={qIndex} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;