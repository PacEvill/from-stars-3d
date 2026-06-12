# Roteiro técnico da apresentação

Este documento complementa a parte estratégica/comercial do trabalho com os itens técnicos exigidos no enunciado.

## O que o print ainda pede

A apresentação atual cobre mercado, SWOT, Porter e métricas pós-venda. Falta adicionar a parte técnica com:
- Segurança do front-end e do back-end
- Versionamento do projeto
- Pós-entrega ao usuário
- Políticas de backup

## Slide 1 - Segurança

### Front-end
- A interface usa validação básica antes de enviar dados, como confirmação de senha, obrigatoriedade de campos e controle de tipos de arquivo.
- A aplicação redireciona usuários autenticados ou não autenticados para rotas adequadas, reduzindo acesso indevido a telas protegidas.
- Os formulários críticos, como recuperação de senha e alteração de senha, seguem fluxos próprios e não expõem dados sensíveis na tela.

### Back-end
- A autenticação é centralizada em NextAuth, com sessão via JWT e integração com Prisma.
- As senhas são armazenadas com hash usando bcrypt, nunca em texto puro.
- A redefinição de senha usa token aleatório, hash do token no banco e expiração por tempo limitado.
- O fluxo de "esqueci a senha" evita enumerar usuários, respondendo de forma genérica mesmo quando o e-mail não existe.
- Os uploads de orçamento passam por validação de tamanho e extensão antes do armazenamento.

### Evidências do projeto
- lib/auth-options.ts
- app/api/auth/esqueci-senha/route.ts
- app/api/auth/redefinir-senha/route.ts
- app/api/usuarios/mudar-senha/route.ts
- app/api/orcamentos/route.ts
- lib/storage.ts
- docs/SECURITY.md

## Slide 2 - Versionamento

- O projeto usa Git como controle de versão e segue o fluxo de desenvolvimento baseado em repositório GitHub.
- O build do projeto já incorpora a etapa de migração do banco, garantindo que a versão publicada esteja alinhada com o schema atual.
- O arquivo package.json concentra os scripts principais de desenvolvimento, build, seed e preflight.
- O deploy recomendado é feito pela branch main, com publicação automática em Vercel.
- As variáveis de ambiente ficam separadas do código, o que ajuda a manter a versão do repositório limpa e segura.

### Evidências do projeto
- package.json
- docs/DEPLOYMENT.md
- docs/ENV_VARS.md
- scripts/preflight.mjs
- prisma/migrations/

### Frase pronta para apresentação
- "O versionamento do projeto é feito com Git e GitHub, e a entrega segue um fluxo controlado por migrations, build e validação do ambiente antes da publicação."

## Slide 3 - Pós-entrega ao usuário

- A entrega do sistema é feita via Vercel, com publicação web acessível pelo navegador.
- O usuário final recebe acesso ao login, cadastro, recuperação de senha, orçamento e demais áreas do site sem necessidade de instalação local.
- Depois do deploy, os fluxos críticos são testados: autenticação, redefinição de senha, carrinho, orçamentos e upload de arquivos.
- O suporte ao usuário continua pelos canais configurados no projeto, incluindo e-mail e páginas de acesso.
- O sistema foi pensado para permitir atualização contínua sem interromper o acesso do usuário final.

### Evidências do projeto
- docs/DEPLOYMENT.md
- app/login/page.tsx
- app/esqueci-senha/page.tsx
- app/redefinir-senha/[token]/page.tsx
- app/orcamento/page.tsx
- app/auth/verify-request/page.tsx

### Frase pronta para apresentação
- "A pós-entrega é feita por publicação web em Vercel, com verificação dos fluxos principais após o deploy e acesso imediato do usuário pelo navegador."

## Slide 4 - Backup e preservação

- O banco de dados principal usa MySQL, com migrações Prisma para manter a estrutura consistente entre desenvolvimento e produção.
- O projeto recomenda provedores gerenciados com snapshots e backup automático, como PlanetScale ou Railway.
- O arquivo docs/DATABASE.md define como exportar e restaurar dados, caso seja necessário recuperar o ambiente.
- Os arquivos enviados por orçamento podem usar Cloudinary; se o upload cair no armazenamento local, isso é tratado como fallback temporário e não como solução final de produção.
- O backup do sistema precisa cobrir tanto os dados do banco quanto os arquivos enviados pelos usuários.

### Evidências do projeto
- docs/DATABASE.md
- docs/DEPLOYMENT.md
- prisma/schema.prisma
- lib/storage.ts
- app/api/orcamentos/route.ts

### Frase pronta para apresentação
- "A política de backup combina migrações, snapshots do banco e armazenamento externo para garantir preservação dos dados e dos arquivos enviados pelos usuários."

## Slide 5 - Fechamento

- A parte estratégica do trabalho explica o mercado e o posicionamento da empresa.
- A parte técnica mostra que o sistema já tem base real de segurança, versionamento, entrega e backup.
- Com isso, a apresentação fica completa tanto do ponto de vista comercial quanto do ponto de vista de implementação.

### Conclusão curta
- "O projeto não é apenas uma ideia de negócio; ele já possui uma estrutura técnica que sustenta segurança, atualização, entrega ao usuário e preservação dos dados."

## Observação importante

Onde houver recomendação futura, vale deixar claro no slide que é uma melhoria planejada, e não algo totalmente concluído. Isso evita prometer recursos que ainda não estão implementados no código.
