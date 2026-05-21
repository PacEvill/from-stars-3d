# DATABASE — Backup, restore and migrations

Recommended provider: PlanetScale or Railway (managed MySQL).

Setup
1. Provision a MySQL database and obtain `DATABASE_URL`.
2. Add `DATABASE_URL` to Vercel environment variables (Production/Preview/Development).
3. Locally, set `.env.local` with a dev database URL.

Migrations
- Use Prisma migrations: `npx prisma migrate deploy` on the target environment.
- Locally, run `npx prisma migrate dev` (if creating new migrations).

Backups & Restore
- Use provider snapshot/backup features (PlanetScale/Railway snapshots).
- To export data: use `mysqldump` or provider-specific export.
- To restore: use provider UI or `mysql` client to import SQL dump.

Notes
- Avoid using SQLite for production.
- Monitor connection limits and scale the DB plan when concurrent connections increase.
