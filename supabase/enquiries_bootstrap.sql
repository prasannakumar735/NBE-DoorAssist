
create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  product_id uuid,
  slug text,
  facility_type text not null,
  opening_width integer not null,
  opening_height integer not null,
  quantity integer not null default 1,
  material text not null,
  insulation text not null,
  notes text,
  attachments jsonb not null default '[]'::jsonb,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.enquiries add column if not exists product_id uuid;
alter table public.enquiries add column if not exists slug text;

alter table public.enquiries enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'enquiries'
      and policyname = 'enquiries_public_insert'
  ) then
    create policy enquiries_public_insert
      on public.enquiries
      for insert
      to anon, authenticated
      with check (true);
  end if;
end
$$;

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);
