-- Service history: every oil change and wash is kept as its own row in public.visits.
-- public.customers keeps one row per car with a summary of the latest state.
-- Everything stays staff only (public.is_staff() from migration 002).

-- Customers: extra fields and a normalised plate so "m 458921" finds "M458921".
alter table public.customers add column if not exists name text;
alter table public.customers add column if not exists car text;
alter table public.customers add column if not exists next_oil_km integer;
alter table public.customers add column if not exists next_oil_date date;
alter table public.customers add column if not exists last_oil_at timestamptz;
alter table public.customers add column if not exists public_token uuid not null default gen_random_uuid();
alter table public.customers add column if not exists plate_key text
  generated always as (upper(regexp_replace(plate_number, '[[:space:]._/-]', '', 'g'))) stored;

create unique index if not exists customers_plate_key_idx on public.customers (plate_key);
create unique index if not exists customers_public_token_idx on public.customers (public_token);

-- Visits
create table if not exists public.visits (
  id bigint generated always as identity primary key,
  customer_id uuid not null references public.customers (id) on delete cascade,
  visited_at timestamptz not null default now(),
  service text not null check (service in ('oil', 'wash')),
  wash_type text check (wash_type in ('normal', 'lift', 'engine', 'vip')),
  oil_product text,
  oil_service text check (oil_service in ('oil_filter', 'oil_only', 'top_up', 'filter_only')),
  oil_added_kg numeric(4, 1),
  km integer,
  next_oil_km integer,
  next_oil_date date,
  notes text,
  staff_email text default (auth.jwt() ->> 'email')
);
create index if not exists visits_customer_idx on public.visits (customer_id, visited_at desc);

alter table public.visits enable row level security;
drop policy if exists "visits staff only" on public.visits;
create policy "visits staff only" on public.visits
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- Records a visit and updates the customer's summary in one step.
-- Runs with the caller's rights, so the staff-only policies apply.
create or replace function public.record_visit(
  p_customer_id uuid,
  p_service text,
  p_wash_type text default null,
  p_oil_product text default null,
  p_oil_service text default null,
  p_oil_added_kg numeric default null,
  p_km integer default null,
  p_next_oil_km integer default null,
  p_next_oil_date date default null,
  p_notes text default null
)
returns public.visits
language plpgsql
security invoker
set search_path = public
as $$
declare
  v public.visits;
begin
  if not public.is_staff() then
    raise exception 'not allowed';
  end if;

  insert into public.visits (customer_id, service, wash_type, oil_product, oil_service, oil_added_kg, km, next_oil_km, next_oil_date, notes)
  values (p_customer_id, p_service, p_wash_type, p_oil_product, p_oil_service, p_oil_added_kg, p_km, p_next_oil_km, p_next_oil_date, nullif(trim(p_notes), ''))
  returning * into v;

  update public.customers c set
    last_visit = v.visited_at,
    current_km = greatest(coalesce(c.current_km, 0), coalesce(v.km, 0)),
    wash_count = coalesce(c.wash_count, 0) + case when v.service = 'wash' then 1 else 0 end,
    oil_type = case when v.service = 'oil' and v.oil_service in ('oil_filter', 'oil_only') then coalesce(v.oil_product, c.oil_type) else c.oil_type end,
    last_oil_at = case when v.service = 'oil' and v.oil_service in ('oil_filter', 'oil_only') then v.visited_at else c.last_oil_at end,
    next_oil_km = case when v.service = 'oil' and v.oil_service in ('oil_filter', 'oil_only') then v.next_oil_km else c.next_oil_km end,
    next_oil_date = case when v.service = 'oil' and v.oil_service in ('oil_filter', 'oil_only') then v.next_oil_date else c.next_oil_date end
  where c.id = v.customer_id;

  return v;
end;
$$;

revoke all on function public.record_visit(uuid, text, text, text, text, numeric, integer, integer, date, text) from public;
grant execute on function public.record_visit(uuid, text, text, text, text, numeric, integer, integer, date, text) to authenticated;
