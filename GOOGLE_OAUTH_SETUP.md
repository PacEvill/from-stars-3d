# Configuração do Google OAuth

## ✅ O que já está configurado no código:

1. **GoogleProvider** adicionado ao NextAuth
2. **GOOGLE_CLIENT_ID** e **GOOGLE_CLIENT_SECRET** já estão no `.env.local`
3. **Botão "Entrar com Google"** funcional na página de login

## 🔧 Configurações necessárias no Google Cloud Console:

### 1. Acessar o Console do Google
- Ir para: https://console.cloud.google.com/
- Selecionar o projeto atual ou criar um novo

### 2. Configurar OAuth Consent Screen
- Navegue para: **APIs & Services** → **OAuth consent screen**
- Tipo: **External** (ou Internal se for apenas para sua organização)
- Preencher:
  - App name: `From Stars 3D`
  - User support email: seu email
  - Developer contact: seu email
- Salvar e continuar

### 3. Adicionar URIs autorizadas
- Navegue para: **APIs & Services** → **Credentials**
- Clique no seu OAuth 2.0 Client ID
- Em **Authorized redirect URIs**, adicione:

**Para desenvolvimento local:**
```
http://localhost:3000/api/auth/callback/google
```

**Para produção (Render):**
```
https://from-stars-3d-app-v7fi.onrender.com/api/auth/callback/google
```

ou se tiver domínio customizado:
```
https://seudominio.com/api/auth/callback/google
```

### 4. Adicionar Authorized JavaScript origins
Em **Authorized JavaScript origins**, adicione:

**Para desenvolvimento:**
```
http://localhost:3000
```

**Para produção:**
```
https://from-stars-3d-app-v7fi.onrender.com
```

### 5. Verificar variáveis de ambiente no Render

No painel do Render (https://dashboard.render.com):
1. Selecione seu serviço `from-stars-3d-app`
2. Vá em **Environment**
3. Verifique se existem:
   - `GOOGLE_CLIENT_ID`: (copie do seu .env.local)
   - `GOOGLE_CLIENT_SECRET`: (copie do seu .env.local)
   - `NEXTAUTH_URL`: `https://from-stars-3d-app-v7fi.onrender.com`
   - `NEXTAUTH_SECRET`: (o mesmo do .env.local)

4. Salvar e aguardar redeploy automático

## 🧪 Testar o login

1. Acesse a página de login
2. Clique em "Entrar com Google"
3. Será redirecionado para o Google
4. Após autorizar, retorna para o site logado

## ⚠️ Troubleshooting

**Erro "redirect_uri_mismatch":**
- Verifique se a URL de callback está exatamente igual no Google Console
- Certifique-se de usar HTTPS em produção
- Aguarde alguns minutos após salvar as configurações

**Não redireciona para o Google:**
- Verifique se GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET estão configurados
- Confira se NEXTAUTH_URL está correto
- Limpe o cache do navegador

**Login funciona mas não salva no banco:**
- O PrismaAdapter já está configurado
- Verifique os logs do Render para ver se há erros de conexão com o banco

## 📝 Observações

- Usuários que fizerem login com Google NÃO têm senha no banco (campo `senha` fica `null`)
- O campo `isAdmin` é automaticamente buscado do banco após login com Google
- A imagem do perfil vem do avatar do Google automaticamente
