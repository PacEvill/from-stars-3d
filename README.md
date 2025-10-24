# From Stars 3D - Plataforma Digital

Este é o repositório oficial da plataforma digital da **From Stars 3D**, um estúdio de criação de action figures e dioramas personalizados. O projeto serve como portfólio, vitrine de produtos e principal canal para orçamentos e vendas.

## 📜 Visão Geral do Projeto

O objetivo é criar uma experiência digital imersiva que reflita a qualidade artística e artesanal dos produtos. A plataforma foi desenhada para ser robusta, escalável e otimizada para mecanismos de busca (SEO), garantindo uma base sólida para o crescimento do negócio.

---

## ✨ Tecnologias Principais

- **Framework:** [Next.js](https://nextjs.org/) 14+ (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (ou outro compatível com Prisma)
- **ORM:** [Prisma](https://www.prisma.io/) para interação com o banco de dados
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes:** UI Própria, inspirada em designs modernos
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
│   ├── (user)/         # Rotas de usuário (ex: catalogo, produto)
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página inicial (Home)
├── components/         # Componentes React reutilizáveis e agnósticos
├── prisma/             # Configuração do banco de dados
│   ├── migrations/     # Histórico de migrações do banco
│   └── schema.prisma   # Definição dos modelos de dados
├── public/             # Arquivos estáticos (imagens, fontes)
├── .env.example        # Arquivo de exemplo para variáveis de ambiente
├── package.json        # Dependências e scripts
└── tsconfig.json       # Configurações do TypeScript
```

---

## 🗺️ Roadmap de Desenvolvimento

Esta é a lista de prioridades atuais para a evolução da plataforma.

- **[P1] Funcionalidades do Usuário:**
  - [ ] Implementar Sistema de Busca global.
  - [ ] Adicionar Filtros e Ordenação na página de Catálogo.
  - [ ] Desenvolver a Página de Perfil do Usuário (Histórico de Pedidos).
  - [ ] Criar sistema de Avaliações e Comentários nos produtos.

- **[P2] Painel de Administração:**
  - [x] Listar dados existentes (ex: materiais, produtos).
  - [ ] Implementar CRUD completo para Produtos.
  - [ ] Implementar CRUD completo para Materiais e Categorias.
  - [ ] Adicionar funcionalidade para atualizar Status de Pedidos.

- **[P3] Melhorias Técnicas:**
  - [x] SEO dinâmico nas páginas de produto.
  - [ ] Implementar sistema de autenticação robusto com NextAuth.js.
  - [ ] Otimizar imagens com o componente `<Image>` do Next.js.

---

## 🎨 Equipe de Criação

- Camila
- Diego Silva
- Victor Costa

*Projeto idealizado e desenvolvido em conjunto pela equipe, com o suporte do assistente de IA Gemini.*

---

## 📄 Licença

Este projeto é de propriedade da From Stars 3D. Todos os direitos reservados.