# DEPLOYMENT — From Stars 3D

This document describes steps to deploy the project to Vercel (recommended).

1. Create a repository on GitHub and push the project.
2. In Vercel, import the repository and select the `main` branch.
3. Set Environment Variables (see `ENV_VARS.md`).
4. Build command: `npm run build` (this runs `prisma migrate deploy && next build`).
5. Output directory: handled by Next.js (no change).
6. Recommended Node version: 20 or 22 (set in Vercel project settings).
7. After first deploy: check serverless function logs, test critical flows: register/login, forgot-password, cart, orcamento upload.

Notes:
- Ensure `DATABASE_URL` points to a managed MySQL provider and that migrations are run (`prisma migrate deploy`).
- Move uploads to external storage (Cloudinary/S3/Supabase) before production: files saved in `public/uploads` will be lost on Vercel.
- Add health checks and monitoring (Sentry, Papertrail) if available.
