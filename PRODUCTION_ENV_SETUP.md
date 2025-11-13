# Configurações de ambiente para produção (Render)

Adicione estas variáveis no painel do Render (Settings > Environment):

## NextAuth
```
NEXTAUTH_URL=https://from-stars-3d-app-v7fi.onrender.com
NEXTAUTH_SECRET=<SEU_NEXTAUTH_SECRET_AQUI>
```

## Base URL pública
```
NEXT_PUBLIC_APP_URL=https://from-stars-3d-app-v7fi.onrender.com
```

## Google OAuth
```
GOOGLE_CLIENT_ID=<SEU_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<SEU_GOOGLE_CLIENT_SECRET>
```

## Database
```
DATABASE_URL=<SUA_DATABASE_URL_COMPLETA>
```

## Email (opcional)
```
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=<SEU_USUARIO>
EMAIL_SERVER_PASSWORD=<SUA_SENHA>
EMAIL_FROM=nao-responda@fromstars3d.com
```

---

## Checklist de Deploy

### 1. Variáveis de ambiente configuradas
- [ ] NEXTAUTH_URL definido com domínio correto
- [ ] NEXT_PUBLIC_APP_URL definido com domínio correto
- [ ] Todas as outras env vars copiadas

### 2. Google Cloud Console
- [ ] Authorized JavaScript origins: `https://from-stars-3d-app-v7fi.onrender.com`
- [ ] Authorized redirect URIs: `https://from-stars-3d-app-v7fi.onrender.com/api/auth/callback/google`

### 3. Após deploy
- [ ] Limpar cookies do navegador ou usar aba anônima
- [ ] Testar login com credenciais
- [ ] Testar login com Google
- [ ] Verificar tamanho dos cookies: `https://from-stars-3d-app-v7fi.onrender.com/api/debug/cookies`
- [ ] Confirmar que `/api/auth/session` retorna 200 (não 431)

### 4. Promover primeiro admin
Conecte ao banco de dados e execute:
```sql
UPDATE Usuario SET isAdmin = 1 WHERE email = 'seu.email@example.com';
```

Ou via Prisma Studio local:
```bash
npx prisma studio
```
(Conecta ao DATABASE_URL, edite o campo `isAdmin` do seu usuário para `true`)

---

## Troubleshooting 431 Errors

Se continuar vendo 431 após deploy:

1. **Inspecione cookies atuais:**
   - Acesse `/api/debug/cookies` no navegador
   - Verifique se o total é > 4KB

2. **Limpe cookies antigos:**
   - DevTools > Application > Cookies
   - Delete todos os cookies de `from-stars-3d-app-v7fi.onrender.com`
   - Faça login novamente

3. **Verifique logs do servidor (Render):**
   - Logs > procure por `[MIDDLEWARE]` e `[AUTH]`
   - Confirme se há erros ao processar JWT

4. **Confirme env vars:**
   - Settings > Environment no Render
   - Certifique-se que NEXTAUTH_SECRET está definido
   - Após alterar, faça redeploy manual

---

## Como testar localmente antes do deploy

```bash
# Certifique-se que .env.local tem todas as variáveis
npm run build
npm start

# Abra http://localhost:3000
# Teste login e verifique /api/debug/cookies
```
