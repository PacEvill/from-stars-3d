# From Stars 3D - Site Oficial

Site profissional e pessoal para a marca **"From Stars 3D"**, da artista **Camila**. O site funciona como portfólio central para exibir criações de action figures personalizadas e como principal plataforma para receber orçamentos e encomendas.

## 🎯 Sobre o Projeto

Este site foi desenvolvido seguindo as melhores práticas de UX/UI, SEO e performance, incorporando:

- **Design Moderno e Responsivo**: Interface elegante que transmite a qualidade do trabalho artesanal
- **SEO Otimizado**: Otimizado para termos como "figures personalizadas Rio de Janeiro", "encomenda action figures Brasil"
- **Integração com Redes Sociais**: Links para Instagram (@from.stars.3d) e TikTok (@from.stars.3d)
- **Contato Direto**: Botões "Click-to-Chat" para WhatsApp (+55 21 98633-3478)
- **Formulário de Encomendas**: Sistema completo para captação de leads

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14 com App Router
- **Estilização**: Tailwind CSS com design system customizado
- **Animações**: Framer Motion para microinterações
- **Ícones**: Lucide React
- **Tipografia**: Google Fonts (Inter, Poppins, Roboto, Lato)
- **Deploy**: Otimizado para Vercel/Netlify

## 📁 Estrutura do Projeto

```
from-stars-3d/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais e Tailwind
│   ├── layout.tsx         # Layout principal com Header/Footer
│   └── page.tsx           # Página inicial
├── components/             # Componentes React reutilizáveis
│   ├── Header.tsx         # Cabeçalho com navegação
│   ├── Hero.tsx           # Seção hero principal
│   ├── AboutPreview.tsx   # Preview sobre a artista
│   ├── FeaturedProducts.tsx # Produtos em destaque
│   ├── InstagramFeed.tsx  # Feed do Instagram
│   ├── CTASection.tsx     # Seção de contato
│   └── Footer.tsx         # Rodapé
├── public/                 # Arquivos estáticos
└── package.json           # Dependências do projeto
```

## 🎨 Paleta de Cores

- **Primária**: `#121212` (Cinza quase preto)
- **Secundária**: `#F5F5F5` (Branco osso)
- **Destaque**: `#8A2BE2` (Roxo Elétrico)
- **Destaque Alt**: `#00FFFF` (Ciano Neon)

## 📱 Páginas Implementadas

1. **Home** (`/`) - Vitrine principal com hero, sobre preview e produtos
2. **Galeria** (`/galeria`) - Portfólio completo (a implementar)
3. **Sobre** (`/sobre`) - História da artista (a implementar)
4. **Encomendas** (`/encomendas`) - Formulário de orçamento (a implementar)
5. **FAQ** (`/faq`) - Perguntas frequentes (a implementar)
6. **Contato** (`/contato`) - Informações de contato (a implementar)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd from-stars-3d
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute em desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse o site**
   ```
   http://localhost:3000
   ```

### Build para Produção

```bash
npm run build
npm start
```

## 🔧 Configurações

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SITE_URL=https://fromstars3d.com
NEXT_PUBLIC_INSTAGRAM_USERNAME=from.stars.3d
NEXT_PUBLIC_TIKTOK_USERNAME=from.stars.3d
NEXT_PUBLIC_WHATSAPP_NUMBER=+5521986333478
```

### Personalizações

- **Cores**: Edite `tailwind.config.js` para alterar a paleta
- **Fontes**: Modifique `app/layout.tsx` para trocar as fontes
- **Conteúdo**: Atualize os componentes para personalizar textos e imagens

## 📸 Imagens e Conteúdo

O site está configurado para usar as imagens das pastas:
- `/frieren/` - Peças da Frieren
- `/mercy/` - Peças da Mercy
- `/roxy-migurdia/` - Peças da Roxy
- `/going-merry/` - Peças do Going Merry
- `/this-is-fine/` - Peças do meme "This is Fine"

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify

1. Conecte seu repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `.next`

## 🚨 Deploy Seguro e Variáveis Sensíveis

- As variáveis de ambiente sensíveis (DATABASE_URL, NEXTAUTH_SECRET, credenciais de e-mail, OAuth, etc) devem ser configuradas apenas no painel do Vercel e nunca versionadas.
- O arquivo `.env.example` serve de modelo, mas não contém segredos reais.
- Consulte o arquivo `ROTEIRO_DEPLOY_VERCEL.txt` para checklist completo de deploy, limpeza e segurança.

## 📊 SEO e Performance

- **Meta tags** otimizadas para redes sociais
- **Schema markup** para rich snippets
- **Lazy loading** de imagens
- **Compressão** e otimizações automáticas
- **PWA ready** para instalação mobile

## 🔮 Próximos Passos

- [ ] Implementar páginas restantes (Galeria, Sobre, Encomendas, FAQ, Contato)
- [ ] Integrar API do Instagram para feed dinâmico
- [ ] Sistema de blog para SEO de cauda longa
- [ ] Área de cliente para acompanhamento de encomendas
- [ ] Loja virtual para peças prontas

## 📞 Suporte

Para dúvidas técnicas ou suporte:
- **Desenvolvedor**: 
- **Artista**: Camila - From Stars 3D
- **WhatsApp**: 

## 📄 Licença

<<<<<<< HEAD
=======
Este projeto é de propriedade da From Stars 3D. Todos os direitos reservados.
=======
# From Stars 3D - Site Oficial

Site profissional e pessoal para a marca **"From Stars 3D"**, da artista **Camila**. O site funciona como portfólio central para exibir criações de action figures personalizadas e como principal plataforma para receber orçamentos e encomendas.

## 🎯 Sobre o Projeto

Este site foi desenvolvido seguindo as melhores práticas de UX/UI, SEO e performance, incorporando:

- **Design Moderno e Responsivo**: Interface elegante que transmite a qualidade do trabalho artesanal
- **SEO Otimizado**: Otimizado para termos como "figures personalizadas Rio de Janeiro", "encomenda action figures Brasil"
- **Integração com Redes Sociais**: Links para Instagram (@from.stars.3d) e TikTok (@from.stars.3d)
- **Contato Direto**: Botões "Click-to-Chat" para WhatsApp (+55 21 98633-3478)
- **Formulário de Encomendas**: Sistema completo para captação de leads

## 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 14 com App Router
- **Estilização**: Tailwind CSS com design system customizado
- **Animações**: Framer Motion para microinterações
- **Ícones**: Lucide React
- **Tipografia**: Google Fonts (Inter, Poppins, Roboto, Lato)
- **Deploy**: Otimizado para Vercel/Netlify

## 📁 Estrutura do Projeto

```
from-stars-3d/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais e Tailwind
│   ├── layout.tsx         # Layout principal com Header/Footer
│   └── page.tsx           # Página inicial
├── components/             # Componentes React reutilizáveis
│   ├── Header.tsx         # Cabeçalho com navegação
│   ├── Hero.tsx           # Seção hero principal
│   ├── AboutPreview.tsx   # Preview sobre a artista
│   ├── FeaturedProducts.tsx # Produtos em destaque
│   ├── InstagramFeed.tsx  # Feed do Instagram
│   ├── CTASection.tsx     # Seção de contato
│   └── Footer.tsx         # Rodapé
├── public/                 # Arquivos estáticos
└── package.json           # Dependências do projeto
```

## 🎨 Paleta de Cores

- **Primária**: `#121212` (Cinza quase preto)
- **Secundária**: `#F5F5F5` (Branco osso)
- **Destaque**: `#8A2BE2` (Roxo Elétrico)
- **Destaque Alt**: `#00FFFF` (Ciano Neon)

## 📱 Páginas Implementadas

1. **Home** (`/`) - Vitrine principal com hero, sobre preview e produtos
2. **Galeria** (`/galeria`) - Portfólio completo (a implementar)
3. **Sobre** (`/sobre`) - História da artista (a implementar)
4. **Encomendas** (`/encomendas`) - Formulário de orçamento (a implementar)
5. **FAQ** (`/faq`) - Perguntas frequentes (a implementar)
6. **Contato** (`/contato`) - Informações de contato (a implementar)

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd from-stars-3d
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute em desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse o site**
   ```
   http://localhost:3000
   ```

### Build para Produção

```bash
npm run build
npm start
```

## 🔧 Configurações

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SITE_URL=https://fromstars3d.com
NEXT_PUBLIC_INSTAGRAM_USERNAME=from.stars.3d
NEXT_PUBLIC_TIKTOK_USERNAME=from.stars.3d
NEXT_PUBLIC_WHATSAPP_NUMBER=+5521986333478
```

### Personalizações

- **Cores**: Edite `tailwind.config.js` para alterar a paleta
- **Fontes**: Modifique `app/layout.tsx` para trocar as fontes
- **Conteúdo**: Atualize os componentes para personalizar textos e imagens

## 📸 Imagens e Conteúdo

O site está configurado para usar as imagens das pastas:
- `/frieren/` - Peças da Frieren
- `/mercy/` - Peças da Mercy
- `/roxy-migurdia/` - Peças da Roxy
- `/going-merry/` - Peças do Going Merry
- `/this-is-fine/` - Peças do meme "This is Fine"

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Netlify

1. Conecte seu repositório ao Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `.next`

## 🚨 Deploy Seguro e Variáveis Sensíveis

- As variáveis de ambiente sensíveis (DATABASE_URL, NEXTAUTH_SECRET, credenciais de e-mail, OAuth, etc) devem ser configuradas apenas no painel do Vercel e nunca versionadas.
- O arquivo `.env.example` serve de modelo, mas não contém segredos reais.
- Consulte o arquivo `ROTEIRO_DEPLOY_VERCEL.txt` para checklist completo de deploy, limpeza e segurança.

## 📊 SEO e Performance

- **Meta tags** otimizadas para redes sociais
- **Schema markup** para rich snippets
- **Lazy loading** de imagens
- **Compressão** e otimizações automáticas
- **PWA ready** para instalação mobile

## 🔮 Próximos Passos

- [ ] Implementar páginas restantes (Galeria, Sobre, Encomendas, FAQ, Contato)
- [ ] Integrar API do Instagram para feed dinâmico
- [ ] Sistema de blog para SEO de cauda longa
- [ ] Área de cliente para acompanhamento de encomendas
- [ ] Loja virtual para peças prontas

## 📞 Suporte

Para dúvidas técnicas ou suporte:
- **Desenvolvedor**: 
- **Artista**: Camila - From Stars 3D
- **WhatsApp**: 

## 📄 Licença

>>>>>>> f8eb54e (feat: add preflight script for environment validation and database connection)
Este projeto é propriedade da From Stars 3D. Todos os direitos reservados.

## 📚 Documentação e Auditoria

- Consulte o arquivo `ROTEIRO_DEPLOY_VERCEL.txt` para checklist completo de deploy, limpeza e segurança.
- Consulte o arquivo `ANALISE_AUDITORIA_E_RECOMENDACOES.txt` para histórico de auditoria, decisões técnicas e roadmap.
- Use `.env.example` como referência para variáveis de ambiente (nunca suba .env real).

### Recomendações para documentação avançada

- Crie arquivos como `DEPLOYMENT.md`, `DATABASE.md`, `ENV_VARS.md` e `SECURITY.md` para detalhar processos, backup, variáveis e decisões de segurança.

---

**Desenvolvido com ❤️ para Camila e a From Stars 3D**
<<<<<<< HEAD
=======
>>>>>>> 12efde8 (feat: add preflight script for environment validation and database connection)
>>>>>>> f8eb54e (feat: add preflight script for environment validation and database connection)
