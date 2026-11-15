-- Archive of official fuel price tables, one row per table.
-- Run once in the Supabase SQL editor.

create table if not exists public.fuel_prices (
  id bigint generated always as identity primary key,
  table_date date not null unique,       -- Beirut date when the table was first seen
  p95 integer,
  p98 integer,
  diesel integer,
  gas integer,
  source text not null default 'https://www.iptgroup.com.lb/ipt/en/home',
  created_at timestamptz not null default now()
);

alter table public.fuel_prices enable row level security;

-- Anyone can read the archive (the website shows it publicly).
drop policy if exists "fuel_prices public read" on public.fuel_prices;
create policy "fuel_prices public read" on public.fuel_prices
  for select using (true);

-- No insert, update or delete policy: only the server, with the service role key, can write.
