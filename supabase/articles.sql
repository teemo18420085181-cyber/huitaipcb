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

-- Public article image bucket used by the admin Knowledge editor.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'article-images',
  'article-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public_read_article_images" on storage.objects;
create policy "public_read_article_images" on storage.objects
  for select using (bucket_id = 'article-images');

drop policy if exists "admins_upload_article_images" on storage.objects;
create policy "admins_upload_article_images" on storage.objects
  for insert with check (bucket_id = 'article-images' and public.is_admin());

drop policy if exists "admins_update_article_images" on storage.objects;
create policy "admins_update_article_images" on storage.objects
  for update using (bucket_id = 'article-images' and public.is_admin())
  with check (bucket_id = 'article-images' and public.is_admin());

drop policy if exists "admins_delete_article_images" on storage.objects;
create policy "admins_delete_article_images" on storage.objects
  for delete using (bucket_id = 'article-images' and public.is_admin());
