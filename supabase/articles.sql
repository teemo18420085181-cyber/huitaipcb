-- Articles CMS table for the Knowledge Base.
-- Run this in Supabase SQL Editor before using the admin article manager.

create extension if not exists "uuid-ossp";

create table if not exists public.articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  content text,
  cover_image text,
  author text not null default 'Huitai Engineering Team',
  read_time integer not null default 5,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists idx_articles_status on public.articles(status);
create index if not exists idx_articles_slug on public.articles(slug);
create index if not exists idx_articles_published_at on public.articles(published_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_articles_updated on public.articles;
create trigger trg_articles_updated
  before update on public.articles
  for each row execute function public.set_updated_at();

alter table public.articles enable row level security;

drop policy if exists "public_read_published_articles" on public.articles;
create policy "public_read_published_articles" on public.articles
  for select using (status = 'published');

drop policy if exists "admins_full_articles" on public.articles;
create policy "admins_full_articles" on public.articles
  for all using (public.is_admin()) with check (public.is_admin());
