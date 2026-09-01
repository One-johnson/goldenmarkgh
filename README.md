# Goldenmark Ghana

Next.js marketing site with **Payload CMS** on **Neon Postgres**, ready for Vercel.

## Stack

- Next.js App Router + React + Tailwind CSS
- Payload CMS 3 admin at `/admin`
- Neon Postgres via `@payloadcms/db-postgres`
- Contact form via Web3Forms (`WEB3FORMS_ACCESS_KEY`)

## Setup

1. Copy `.env.example` to `.env`.
2. Set a strong `PAYLOAD_SECRET`.
3. Set `DATABASE_URL` to your Neon **pooled** connection string (`…-pooler…neon.tech…`).
4. Install and run:

```bash
bun install
bun run dev
```

5. Open [http://localhost:3000/admin](http://localhost:3000/admin) and create the first admin user.
6. On first boot against an empty DB, Payload seeds globals from `content/*.md` (one-time).

## Vercel

Add these environment variables in the Vercel project:

- `PAYLOAD_SECRET`
- `DATABASE_URL` (same Neon pooled URL)
- `NEXT_PUBLIC_SITE_URL` (your production domain)
- `WEB3FORMS_ACCESS_KEY` (optional)

## Content model

Globals (singletons):

- **Site Settings** — brand, logo, nav/footer CTAs
- **Home / About / Services** — page fields + markdown body

Media uploads go to `public/media` (local). Existing logos remain under `public/uploads`.

## Neon project

- Project: `goldenmarkgh`
- Use the pooled connection string for serverless (Vercel).
