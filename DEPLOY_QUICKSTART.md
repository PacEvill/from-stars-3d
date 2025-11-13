# Configuração Rápida - Render Deploy

## ⚡ Deploy Rápido (5 minutos)

### 1. Commit e Push
```bash
git add .
git commit -m "Preparar para deploy no Render"
git push origin main
```

### 2. No Render Dashboard

#### Criar Database (MySQL):
- **New +** → **MySQL**
- Name: `from-stars-3d-db`
- Plan: **Free**
- **Criar** e copiar a **Internal Database URL**

#### Criar Web Service:
- **New +** → **Web Service**
- Conectar repositório: `from-stars-3d`
- Name: `from-stars-3d-app`
- Build Command: `./render-build.sh`
- Start Command: `npm start`

#### Variáveis de Ambiente (Environment):
```env
NODE_VERSION=18.17.0
DATABASE_URL=mysql://[copiar_url_do_banco]
NEXTAUTH_SECRET=[Generate]
NEXTAUTH_URL=https://[seu-app].onrender.com
```

### 3. Deploy
- Clicar em **"Create Web Service"**
- Aguardar 5-10 minutos
- ✅ App online!

### 4. Pós-Deploy
- Atualizar `NEXTAUTH_URL` com a URL real gerada
- Testar: login, produtos, carrinho

## 🔧 Comandos Úteis

Verificar variáveis localmente:
```bash
./check-env.sh
```

Testar build localmente:
```bash
./render-build.sh
```

Ver logs no Render:
```bash
# Acesse: Dashboard → Your Service → Logs
```

## 📝 Checklist Pré-Deploy

- [ ] `.env.local` no `.gitignore` (não fazer push!)
- [ ] Código commitado e pushed
- [ ] Database criada no Render
- [ ] DATABASE_URL copiada
- [ ] Todas as variáveis configuradas

## ⚠️ IMPORTANTE

**NUNCA** faça commit de:
- `.env`
- `.env.local`
- Credenciais reais

Use apenas variáveis de ambiente no Render!

---

📖 Documentação completa: [DEPLOY_RENDER.md](./DEPLOY_RENDER.md)
