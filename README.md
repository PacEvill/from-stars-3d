# From Stars 3D - Plataforma Digital

Este é o repositório oficial da plataforma digital da **From Stars 3D**, um estúdio de criação de action figures e dioramas personalizados. O projeto serve como portfólio, vitrine de produtos e principal canal para orçamentos e vendas.

## 📜 Visão Geral do Projeto

O objetivo é criar uma experiência digital imersiva que reflita a qualidade artística e artesanal dos produtos. A plataforma foi desenhada para ser robusta, escalável e otimizada para mecanismos de busca (SEO), garantindo uma base sólida para o crescimento do negócio.

Última atualização (nov/2025):
- Hero da Home redesenhado com banner carrossel, CTA do WhatsApp e identidade visual roxa.
- Catálogo sem exibição de preços, com botão “Solicitar orçamento” gerando mensagem dinâmica para o WhatsApp (`5521986333478`).
- Integração das mídias locais em `public/fotos` (portfólio) e `public/catalogo` (produtos), com galerias/carrosséis responsivos.
- Páginas `Portfolio` e `Serviços` remodeladas com foco em narrativa, responsividade e CTAs claros.

---

## ✨ Tecnologias Principais

- **Framework:** [Next.js](https://nextjs.org/) 14+ (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (ou outro compatível com Prisma)
- **ORM:** [Prisma](https://www.prisma.io/) para interação com o banco de dados
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** UI própria, inspirada em designs modernos
- **Ícones:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Deploy:** Otimizado para [Vercel](https://vercel.com/)

---

## 🚀 Começando

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento local.

### 1. Pré-requisitos

- **Node.js:** Versão `18.17.0` ou superior.
- **npm** ou **yarn**.
- **Docker** (Recomendado) para uma instância PostgreSQL, ou uma URL de banco de dados já existente.

### 2. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/from-star-3d-main.git
cd from-star-3d-main
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar Variáveis de Ambiente

Crie uma cópia do arquivo de exemplo `.env.example` e renomeie para `.env.local`.

```bash
cp .env.example .env.local
```

Agora, edite o arquivo `.env.local` e preencha a variável `DATABASE_URL` com a string de conexão do seu banco de dados.

**.env.local**
```env
# Exemplo para PostgreSQL local com Docker
DATABASE_URL="postgresql://user:password@localhost:5432/fromstars3d?schema=public"

# Outras variáveis públicas
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 5. Configurar o Banco de Dados

Execute as migrações do Prisma para criar as tabelas no seu banco de dados.

```bash
npx prisma migrate dev
```

### 6. Executar o Projeto

Inicie o servidor de desenvolvimento.

```bash
npm run dev
```

O site estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run start`: Inicia o servidor em modo de produção (requer `build` prévio).
- `npm run lint`: Executa o linter para análise de código.
- `npx prisma studio`: Abre a interface visual do Prisma para gerenciar os dados.
- `npx prisma migrate dev`: Executa novas migrações e atualiza o schema do banco.
- `npx prisma generate`: Gera/atualiza o cliente Prisma após mudanças no `schema.prisma`.

---

## 🗂️ Estrutura do Projeto

```
from-star-3d-main/
├── app/                # Rotas e páginas (App Router)
│   ├── api/            # Endpoints da API (Backend)
│   ├── admin/          # Rotas do painel de administração
│   ├── catalogo/       # Página do catálogo de produtos (sem preços + CTA WhatsApp)
│   ├── portfolio/      # Galeria com imagens de /public/catalogo e /public/fotos
│   ├── servicos/       # Página institucional com fluxo e CTAs
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página inicial (Home)
├── components/         # Componentes React reutilizáveis (Hero, Carrosséis, etc.)
├── prisma/             # Configuração do banco de dados
│   ├── migrations/     # Histórico de migrações do banco
│   └── schema.prisma   # Definição dos modelos de dados
├── public/             # Arquivos estáticos (imagens, fontes)
│   ├── catalogo/       # Imagens do catálogo usadas nos cards/carrosséis
│   └── fotos/          # Portfólio e assets gerais do site
├── .env.example        # Arquivo de exemplo para variáveis de ambiente
├── package.json        # Dependências e scripts
└── tsconfig.json       # Configurações do TypeScript
```

---

## 🛒 Lógica de Orçamento via WhatsApp

Em `app/catalogo/page.tsx`, cada item do catálogo possui um botão **“Solicitar orçamento”** que gera automaticamente a URL de contato com o texto:

```
ola gostaria de fazer um orçamento desta peça https://<origin>/produto/<ID>
```

O número padrão configurado é `5521986333478`. Ajuste as variáveis ou constantes caso o número oficial seja alterado futuramente.

Na Home (`components/Hero.tsx`) e nas CTAs secundárias (`app/servicos/page.tsx`, `app/portfolio/page.tsx`) o mesmo número é reutilizado para garantir consistência.

---

## 📸 Mídia e Assets

- **Portfólio:** todas as fotos de projetos ficam em `public/fotos/<nome>/` e são exibidas na home (destaques), no Hero e no portfólio completo.
- **Catálogo:** as imagens de cada produto ficam em `public/catalogo/<Produto>/` e alimentam a galeria/carrossel na página de catálogo.
- Para adicionar novas imagens, basta criar a pasta correspondente em `public/fotos` ou `public/catalogo`, seguindo o padrão existente. Os componentes ajustam automaticamente o layout responsivo.

---

## 🗺️ Roadmap de Desenvolvimento

Esta é a lista de prioridades atuais para a evolução da plataforma.

- **[P1] Funcionalidades do Usuário:**
  - [ ] Implementar Sistema de Busca global.
  - [ ] Adicionar filtros e ordenação avançada na página de Catálogo.
  - [ ] Desenvolver a Página de Perfil do Usuário (Histórico de Pedidos).
  - [ ] Criar sistema de avaliações e comentários nos produtos.

- **[P2] Painel de Administração:**
  - [x] Listar dados existentes (ex: materiais, produtos).
  - [ ] Implementar CRUD completo para Produtos.
  - [ ] Implementar CRUD completo para Materiais e Categorias.
  - [ ] Adicionar funcionalidade para atualizar Status de Pedidos.

- **[P3] Melhorias Técnicas:**
  - [x] SEO dinâmico nas páginas de produto.
  - [ ] Implementar sistema de autenticação robusto com NextAuth.js.
  - [x] Otimizar imagens com o componente `<Image>` do Next.js (agora aplicado em Hero, Catálogo e Portfólio).

---

## 🎨 Equipe de Criação

- Camila
- Diego Silva
- Victor Costa

*Projeto idealizado e desenvolvido em conjunto pela equipe, com o suporte do assistente de IA Gemini.*

---

## 📄 Licença

Este projeto é de propriedade da From Stars 3D. Todos os direitos reservados.