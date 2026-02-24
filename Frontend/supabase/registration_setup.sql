-- Run this in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists public.registration_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  role text not null,
  full_name text not null,
  email text not null,
  mobile text not null,
  address text not null,
  shop_address text,
  availability jsonb not null default '[]'::jsonb,
  resources jsonb not null default '{}'::jsonb,
  bank_name text not null,
  account_number text not null,
  ifsc_code text not null,
  services text not null,
  consent boolean not null default false,
  documents jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
);

alter table public.registration_applications enable row level security;

drop policy if exists "Allow public insert registration applications" on public.registration_applications;
create policy "Allow public insert registration applications"
on public.registration_applications
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow admin read registration applications" on public.registration_applications;
create policy "Allow admin read registration applications"
on public.registration_applications
for select
to authenticated
using (auth.jwt() ->> 'email' = 'admin@mytypingwala.com');

drop policy if exists "Allow admin update registration applications" on public.registration_applications;
create policy "Allow admin update registration applications"
on public.registration_applications
for update
to authenticated
using (auth.jwt() ->> 'email' = 'admin@mytypingwala.com')
with check (auth.jwt() ->> 'email' = 'admin@mytypingwala.com');

insert into storage.buckets (id, name, public)
values ('registration-documents', 'registration-documents', true)
on conflict (id) do nothing;

drop policy if exists "Allow public upload registration documents" on storage.objects;
create policy "Allow public upload registration documents"
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'registration-documents');
