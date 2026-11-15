# A.Petroleum website

Website of A.Petroleum, IPT station in Minieh, North Lebanon. Next.js (App Router, Cache Components) on Vercel, data in Supabase.

## Pages

- `/` homepage (services, diesel and gas order form, ELF oils, tips, contact)
- `/fuel-prices` today's fuel prices and the archive of price tables
- `/fuel-prices/[date]` one page per price table
- `/sitemap.xml`, `/robots.txt`
- `/admin`, `/badge` internal pages (noindex)

## Fuel prices

Prices are read on the server from the IPT Group home page (`lib/fuel.ts`) and cached for about an hour.

A Vercel cron (`vercel.json`) calls `/api/cron/fuel` every day at 07:30 UTC. When the prices differ from the last stored table, it adds a row to the Supabase table `fuel_prices` (`supabase/migrations/001_fuel_prices.sql`).

## Environment variables (Vercel)

See `.env.example`.

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public Supabase access
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase secret key (`sb_secret_...` or legacy service_role), server only
- `CRON_SECRET`: protects the cron route
- `NEXT_PUBLIC_SITE_URL`: optional, set once a custom domain is used

After changing an environment variable, redeploy.

## Development

```bash
npm install
npm run dev
```
