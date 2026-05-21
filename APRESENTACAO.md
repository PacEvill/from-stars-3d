# Roteiro da Apresentação Final - Star3D

Este documento contém a estruturação dos slides exigidos para as apresentações dos dias 22 e 29 de maio, baseado no material das aulas e nos requisitos do projeto (incluindo o orçamento do notebook).

## Slide 1: Capa
- **Título**: From Stars 3D - Transformando suas Ideias em Realidade
- **Subtítulo**: Análise de Mercado, Segurança e Estrutura do Projeto
- **Equipe**: [Nomes dos Integrantes, incluindo Camila Martins Novak - Designer UI/UX]

---

## Slide 2: Análise de Mercado e Benchmarking
- **O que fazemos**: Especialistas em impressão 3D (Figures, Decorativos, RPG e mais).
- **Problema**: A dificuldade de encontrar peças personalizadas e acessíveis no mercado local com agilidade.
- **Público-Alvo**: Entusiastas de cultura geek, empresas que buscam brindes personalizados, jogadores de RPG e decoradores.
- **Benchmarking (Spotify x Deezer, mas para o nosso nicho)**: Avaliamos competidores como Cults3D (apenas modelos) e impressoras genéricas do Mercado Livre. O diferencial da Star3D é a personalização aliada à produção física local rápida.

---

## Slide 3: Análise SWOT (Matriz FOFA)
- **Forças (Strengths)**: Modelagem sob demanda, alta personalização, catálogo variado (desde fidgets até figures de alta resolução), site próprio e estruturado.
- **Fraquezas (Weaknesses)**: Capacidade de produção limitada pelas máquinas (tempo de impressão), custos logísticos para envio fora do estado.
- **Oportunidades (Opportunities)**: Crescimento da cultura geek e jogos de RPG, parcerias com influenciadores (Instagram/TikTok), popularização das resinas e filamentos especiais.
- **Ameaças (Threats)**: Concorrentes com impressoras industriais, variação do dólar afetando custo da matéria-prima (filamento/resina).

---

## Slide 4: Posicionamento e as 5 Forças de Porter
- **1. Rivalidade entre os Concorrentes**: Alta nos produtos genéricos, mas baixa na área de customização premium sob demanda.
- **2. Poder de Negociação dos Clientes**: Médio. Clientes valorizam qualidade e precisão, mas procuram preços justos comparados ao mercado externo.
- **3. Poder de Negociação dos Fornecedores**: Alto. Dependemos de poucos importadores para filamentos (PLA/ABS) e resinas de qualidade.
- **4. Ameaça de Novos Entrantes**: Alta, pois o custo de adquirir impressoras básicas caiu, porém, o know-how técnico (UX e qualidade de impressão) é uma barreira de entrada.
- **5. Ameaça de Produtos Substitutos**: Baixa em nichos ultra-customizados, mas alta para brindes comuns (que podem ser injetados em plástico em larga escala).
- **Posicionamento**: "Oceano Azul" focando em UX superior, catálogo curado e excelente atendimento focado na retenção.

---

## Slide 5: Métricas Pós-Venda e Experiência do Usuário (UX)
- A tecnologia sozinha não garante sucesso, precisamos medir o impacto de ponta a ponta:
- **Retenção e Fidelização**: Taxa de clientes que voltam para encomendar novas peças de RPG ou decorações após a primeira compra.
- **Engajamento do Usuário**: Tempo de permanência na página de catálogo e utilização dos filtros de categoria/preço.
- **NPS (Net Promoter Score)**: Pesquisa periódica via email/WhatsApp perguntando: *"De 0 a 10, o quanto você recomendaria a From Stars 3D?"*. Foco em notas 9 e 10 (Promotores).
- **Taxa de Abandono (Churn/Cart Abandonment)**: Redução de carrinhos abandonados através de um fluxo de checkout otimizado.

---

## Slide 6: Segurança: Front-end, Backend e Tríade CIA
- **Tríade CIA**:
  - **Confidencialidade**: Uso de sessões seguras e JWT (JSON Web Tokens) na API de autenticação.
  - **Integridade**: Validação de dados de orçamento e cadastro, banco de dados relacional via Prisma.
  - **Disponibilidade**: Deploy otimizado na Vercel com respostas rápidas e uptime garantido.
- **Segurança Prática (DevSecOps)**:
  - **Front-end**: Proteção contra Cross-Site Scripting (XSS) via React/Next.js. Sanitização de inputs nos formulários de orçamento e contato.
  - **Backend**: Proteção nas chamadas de API, senhas criptografadas usando `bcryptjs` (evitando armazenar texto plano), rotas de admin protegidas por Role-Based Access Control (RBAC).

---

## Slide 7: Versionamento e Políticas de Backup
- **Versionamento de Código**:
  - Uso de **Git** e hospedagem no GitHub.
  - Fluxo focado em estabilidade (não desenvolver apenas na `main`). Uso de *branches* para `features/`, com revisões antes do merge para garantir integração contínua (CI).
- **Pós-entrega e Backup**:
  - O banco de dados (PostgreSQL hospedado externamente, gerenciado via Prisma) deve possuir **backups automáticos diários**.
  - Plano de contingência de *Restore*: Testar a recuperação dos dados trimestralmente para não ter "falsas esperanças" de backup.

---

## Slide 8: Infraestrutura e Orçamento (Hardware de Trabalho)
Visando lidar com o pipeline de compilação da aplicação, modelagem e edição de vídeos para Instagram/TikTok, investimos em hardware robusto:

- **Notebook Framework 13 Customizável**:
  - **Processador**: AMD Ryzen™ AI 300 Series - Ryzen™ AI 7 350
  - **Tela**: 2.2K
  - **Memória**: 16GB DDR5-5600
  - **Armazenamento**: 1TB SANDISK 850X PCIe® 4.0 M.2
  - **Placas de Expansão**: USB-C, USB-A, HDMI (3rd Gen), DisplayPort, SD Card Reader (para câmeras de filmagem das peças).
  - **Investimento Total**: **$ 1,645.00**

---

## Slide 9: Encerramento
- "O diferencial está em resolver problemas reais."
- Muito obrigado! Dúvidas?
- **Siga nossas redes**: `@from.stars.3d`
