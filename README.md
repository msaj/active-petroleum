# A.Petroleum website

Website of A.Petroleum, IPT station in Minieh, North Lebanon. Next.js (App Router, Cache Components) on Vercel, data in Supabase.

## Pages

- `/` homepage (services, diesel and gas order form, ELF oils, tips, contact)
- `/fuel-prices` today's fuel prices and the archive of price tables
- `/fuel-prices/[date]` one page per price table
- `/sitemap.xml`, `/robots.txt`
- `/admin` staff panel (sign-in required, noindex), `/badge` QR sticker generator (noindex)

## Fuel prices

Prices and the date of the IPT table are read on the server from the IPT Group home page (`lib/fuel.ts`) and cached for about an hour under the cache tag `fuel`.

A Vercel cron (`vercel.json`) calls `/api/cron/fuel` every day at 07:30 UTC. When the prices differ from the last stored table, it adds a row to the Supabase table `fuel_prices` (`supabase/migrations/001_fuel_prices.sql`), dated with the IPT table date. It then revalidates the `fuel` tag and requests the price pages so they are rebuilt at once.

## Staff panel and customers

The `customers` table is private (`supabase/migrations/002_staff_only_customers.sql`): only signed-in users whose email is in `public.admins` can read or change it.

To give a staff member access:

1. In the Supabase SQL editor: `insert into public.admins (email) values ('name@example.com');`
2. In Authentication > Users, invite the same email.
3. The staff member opens `/admin`, enters the email and signs in with the link sent by email. There is no password.

Authentication > URL Configuration must have the site URL and `<site>/admin` as redirect URL.

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
