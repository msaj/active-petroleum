-- Customers data is private: only signed-in staff listed in public.admins can read or change it.

create table if not exists public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- No policies on admins: it is managed from the Supabase dashboard only.

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;

alter table public.customers enable row level security;
drop policy if exists "Allow public all access" on public.customers;
drop policy if exists "customers staff only" on public.customers;
create policy "customers staff only" on public.customers
  for all to authenticated
  using (public.is_staff())
  with check (public.is_staff());

-- To give someone access: insert into public.admins (email) values ('name@example.com');
-- then invite the same email from Authentication > Users > Invite user.
