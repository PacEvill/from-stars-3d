# SECURITY — Checklist

Pre-deploy
- [ ] Remove any hardcoded secrets from the codebase.
- [ ] Ensure `.env` files are in `.gitignore`.
- [ ] Add security headers in `next.config.js` (CSP, HSTS, X-Frame-Options).
- [ ] Add rate limiting to auth endpoints (login, forgot-password).
- [ ] Validate all inputs and file sizes on server-side.

Production
- [ ] Use managed DB with encryption at rest.
- [ ] Rotate secrets periodically.
- [ ] Use monitoring and alerting for errors and suspicious activity.
- [ ] Store uploads on external storage (Cloudinary/S3/Supabase) and serve via CDN.

Optional
- [ ] Configure Sentry (or similar) for error monitoring.
- [ ] Use automated dependency scanning (Dependabot) and schedule updates.
