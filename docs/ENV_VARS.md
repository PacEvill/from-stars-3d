# ENV_VARS — Required environment variables

Required (production)
- `DATABASE_URL` — MySQL connection string
- `NEXTAUTH_SECRET` — secure random secret
- `NEXTAUTH_URL` — https://your-domain.com
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` — OAuth credentials
- `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_FROM` — SMTP for emails

Recommended (public)
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

Local development
- Use `.env.local` and never commit it.
- Keep a `.env.example` in repo with placeholders.

How to generate `NEXTAUTH_SECRET`
```bash
openssl rand -base64 32
```

Add these variables in Vercel under Project Settings → Environment Variables.
