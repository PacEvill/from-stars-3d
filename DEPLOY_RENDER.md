# Deploy no Render - From Stars 3D

## Pré-requisitos
- Conta no [Render](https://render.com) (gratuita)
- Repositório GitHub com o código atualizado
- Banco de dados MySQL configurado (pode ser criado no Render)

## Passo a Passo para Deploy

### 1. Preparar o Repositório
Certifique-se de que todas as alterações estão commitadas e enviadas para o GitHub:

```bash
git add .
git commit -m "Preparar projeto para deploy no Render"
git push origin main
```

### 2. Criar Banco de Dados no Render

1. Acesse [render.com](https://render.com) e faça login
2. Clique em **"New +"** → **"MySQL"**
3. Configure:
   - **Name**: `from-stars-3d-db`
   - **Database**: `fromstars3d_db`
   - **User**: `fromstars_user`
   - **Region**: Oregon (ou mais próximo de você)
   - **Plan**: Free
4. Clique em **"Create Database"**
5. **IMPORTANTE**: Copie a **Internal Database URL** (formato: `mysql://user:pass@host:port/dbname`)

### 3. Criar Web Service

1. No dashboard do Render, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub `from-stars-3d`
3. Configure o serviço:

#### Configurações Básicas:
- **Name**: `from-stars-3d-app`
- **Region**: Oregon (mesma do banco)
- **Branch**: `main`
- **Root Directory**: (deixe vazio)
- **Runtime**: Node
- **Build Command**: `./render-build.sh` ou `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
- **Start Command**: `npm start`

#### Variáveis de Ambiente:
Clique em **"Advanced"** e adicione as seguintes variáveis:

| Key | Value | Observações |
|-----|-------|-------------|
| `NODE_VERSION` | `18.17.0` | Versão do Node.js |
| `DATABASE_URL` | `mysql://user:pass@host:port/dbname` | Cole a URL copiada do banco (Internal Database URL) |
| `NEXTAUTH_SECRET` | `[valor-gerado]` | Clique em "Generate" para criar um valor seguro |
| `NEXTAUTH_URL` | `https://from-stars-3d-app.onrender.com` | URL do seu app (será gerada após criação) |
| `GOOGLE_CLIENT_ID` | (opcional) | Se for usar Google OAuth |
| `GOOGLE_CLIENT_SECRET` | (opcional) | Se for usar Google OAuth |

**⚠️ IMPORTANTE**: Após criar o serviço, atualize a variável `NEXTAUTH_URL` com a URL real gerada pelo Render.

4. **Plan**: Free (ou escolha um plano pago para melhor performance)
5. Clique em **"Create Web Service"**

### 4. Aguardar o Deploy

O Render vai:
1. Clonar seu repositório
2. Instalar dependências
3. Gerar o Prisma Client
4. Executar migrações do banco
5. Fazer build do Next.js
6. Iniciar a aplicação

Acompanhe os logs em tempo real. O primeiro deploy pode levar de 5-10 minutos.

### 5. Atualizar NEXTAUTH_URL

Após o deploy inicial:
1. Copie a URL gerada (ex: `https://from-stars-3d-app.onrender.com`)
2. Vá em **"Environment"** no painel do seu serviço
3. Edite a variável `NEXTAUTH_URL` e cole a URL
4. Salve e aguarde o redeploy automático

### 6. Verificar Funcionamento

Acesse sua aplicação na URL gerada e teste:
- [ ] Página inicial carrega
- [ ] Catálogo de produtos funciona
- [ ] Login/cadastro funciona
- [ ] Carrinho funciona

## Problemas Comuns

### Build falha com erro do Prisma
**Solução**: Verifique se `DATABASE_URL` está configurada corretamente e se o banco está acessível.

### Erro 500 ao acessar a aplicação
**Solução**: 
- Verifique os logs no Render
- Confirme que todas as variáveis de ambiente estão configuradas
- Verifique se as migrações foram executadas com sucesso

### NextAuth não funciona
**Solução**: 
- Verifique se `NEXTAUTH_SECRET` está configurada
- Confirme que `NEXTAUTH_URL` tem a URL correta do seu app
- Limpe cookies do navegador e tente novamente

### Imagens não carregam
**Solução**: No `next.config.js`, já está configurado `images: { unoptimized: true }`

## Atualizações Futuras

Para fazer deploy de novas alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push origin main
```

O Render detectará automaticamente e fará o redeploy.

## Monitoramento

- Acesse o dashboard do Render para ver logs em tempo real
- Configure alertas de erro (disponível em planos pagos)
- Use o Prisma Studio para gerenciar dados: `npx prisma studio`

## Custos

**Plano Free:**
- Web Service: 750 horas/mês (suficiente para um site hobby)
- Database: 1GB de armazenamento, 1GB de RAM
- O serviço "dorme" após 15 minutos de inatividade
- Primeira requisição após "dormir" leva ~30 segundos

**Upgrade recomendado para produção:**
- Web Service: Starter ($7/mês) - sempre ativo, SSL automático
- Database: Starter ($7/mês) - 256MB RAM, 1GB storage

---

**✅ Projeto pronto para deploy!**

Se tiver problemas, verifique a documentação oficial: https://render.com/docs
