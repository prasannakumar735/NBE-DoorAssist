
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  price numeric not null default 0,
  price_type text not null default 'from' check (price_type in ('fixed', 'from', 'contact')),
  image_url text,
  stock_status text not null default 'in_stock',
  featured boolean not null default false,
  category text not null default 'Rapid Roller Doors',
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'products_public_select'
  ) then
    create policy products_public_select
      on public.products
      for select
      to anon, authenticated
      using (true);
  end if;
end
$$;

insert into public.products (slug, title, price, price_type, image_url, stock_status, featured, category)
values
  (
    'high-speed-rapid-roller-door-industrial-grade',
    'High-Speed Rapid Roller Door - Industrial Grade',
    4500,
    'from',
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=400&fit=crop',
    'in_stock',
    true,
    'Rapid Roller Doors'
  ),
  (
    'ambient-cold-chain-roller-door-insulated',
    'Ambient Cold Chain Roller Door - Insulated',
    5800,
    'from',
    'https://images.unsplash.com/photo-1585534321671-e4c8cc1f9aa1?w=500&h=400&fit=crop',
    'in_stock',
    true,
    'Cold Storage Doors'
  ),
  (
    'heavy-duty-commercial-rapid-door-quick-response',
    'Heavy-Duty Commercial Rapid Door - Quick Response',
    3200,
    'from',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    'limited',
    true,
    'Commercial Doors'
  )
on conflict (slug) do nothing;