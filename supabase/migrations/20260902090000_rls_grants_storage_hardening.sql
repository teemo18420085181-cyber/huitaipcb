-- Prepared 2026-09-02. LOCAL ONLY: do not apply without an approved production runbook.
-- Baseline: supabase/baselines/20260902_production_security_baseline.md
-- This migration changes authorization metadata and bucket configuration only.
-- It does not read or mutate application rows or Storage objects.

begin;

create extension if not exists "uuid-ossp";

-- Reproduce the production orders schema for fresh environments. On production,
-- CREATE TABLE IF NOT EXISTS is a no-op; the catalog preflight below fails closed
-- if the existing columns, primary key, or status constraint do not match the
-- recorded production baseline.
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  customer_name text not null,
  company text,
  country text,
  email text,
  phone text,
  product_name text,
  quantity integer default 0,
  board_amount numeric(12,2) default 0,
  bom_amount numeric(12,2) default 0,
  unit_price numeric(12,2) default 0,
  total_amount numeric(12,2) default 0,
  currency text default 'USD',
  status text not null default 'pending'
    check (status in ('pending', 'in_production', 'shipped', 'completed', 'cancelled')),
  notes text,
  image_1 text,
  image_2 text,
  image_3 text
);

do $$
begin
  if (
    with expected(column_name, udt_name, is_nullable, numeric_precision, numeric_scale) as (
      values
        ('id', 'uuid', 'NO', null::integer, null::integer),
        ('created_at', 'timestamptz', 'NO', null::integer, null::integer),
        ('updated_at', 'timestamptz', 'NO', null::integer, null::integer),
        ('customer_name', 'text', 'NO', null::integer, null::integer),
        ('company', 'text', 'YES', null::integer, null::integer),
        ('country', 'text', 'YES', null::integer, null::integer),
        ('email', 'text', 'YES', null::integer, null::integer),
        ('phone', 'text', 'YES', null::integer, null::integer),
        ('product_name', 'text', 'YES', null::integer, null::integer),
        ('quantity', 'int4', 'YES', 32, 0),
        ('board_amount', 'numeric', 'YES', 12, 2),
        ('bom_amount', 'numeric', 'YES', 12, 2),
        ('unit_price', 'numeric', 'YES', 12, 2),
        ('total_amount', 'numeric', 'YES', 12, 2),
        ('currency', 'text', 'YES', null::integer, null::integer),
        ('status', 'text', 'NO', null::integer, null::integer),
        ('notes', 'text', 'YES', null::integer, null::integer),
        ('image_1', 'text', 'YES', null::integer, null::integer),
        ('image_2', 'text', 'YES', null::integer, null::integer),
        ('image_3', 'text', 'YES', null::integer, null::integer)
    )
    select (
        select count(*)
        from information_schema.columns
        where table_schema = 'public'
          and table_name = 'orders'
      ) <> 20
      or bool_or(
        c.column_name is null
        or c.udt_name <> expected.udt_name
        or c.is_nullable <> expected.is_nullable
        or c.numeric_precision is distinct from expected.numeric_precision
        or c.numeric_scale is distinct from expected.numeric_scale
      )
    from expected
    left join information_schema.columns c
      on c.table_schema = 'public'
      and c.table_name = 'orders'
      and c.column_name = expected.column_name
  ) then
    raise exception 'orders schema differs from the 2026-09-02 production baseline';
  end if;

  if not exists (
    select 1
    from pg_constraint c
    where c.conrelid = 'public.orders'::regclass
      and c.contype = 'p'
      and pg_get_constraintdef(c.oid) = 'PRIMARY KEY (id)'
  ) then
    raise exception 'orders primary key differs from the 2026-09-02 production baseline';
  end if;

  if not exists (
    select 1
    from pg_constraint c
    where c.conrelid = 'public.orders'::regclass
      and c.contype = 'c'
      and pg_get_constraintdef(c.oid) like '%status%'
      and pg_get_constraintdef(c.oid) like '%pending%'
      and pg_get_constraintdef(c.oid) like '%in_production%'
      and pg_get_constraintdef(c.oid) like '%shipped%'
      and pg_get_constraintdef(c.oid) like '%completed%'
      and pg_get_constraintdef(c.oid) like '%cancelled%'
  ) then
    raise exception 'orders status constraint differs from the 2026-09-02 production baseline';
  end if;
end $$;

alter table public.inquiries enable row level security;
alter table public.inquiry_files enable row level security;
alter table public.customers enable row level security;
alter table public.feedback_messages enable row level security;
alter table public.orders enable row level security;
alter table public.articles enable row level security;
alter table public.knowledge_articles enable row level security;
alter table public.admin_users enable row level security;
alter table public.library_files enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

-- Replace the complete policy set for the reviewed public tables atomically.
-- This avoids leaving an unknown permissive production policy alongside a safe one.
do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename::text = any (array[
        'inquiries',
        'inquiry_files',
        'customers',
        'feedback_messages',
        'orders',
        'articles',
        'knowledge_articles',
        'admin_users',
        'library_files'
      ])
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      existing_policy.policyname,
      existing_policy.schemaname,
      existing_policy.tablename
    );
  end loop;
end $$;

create policy "admins_read_inquiries" on public.inquiries
  for select to authenticated
  using ((select public.is_admin()));
create policy "admins_update_inquiries" on public.inquiries
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "admins_read_inquiry_files" on public.inquiry_files
  for select to authenticated
  using ((select public.is_admin()));

create policy "admins_read_customers" on public.customers
  for select to authenticated
  using ((select public.is_admin()));
create policy "admins_delete_customers" on public.customers
  for delete to authenticated
  using ((select public.is_admin()));

create policy "public_read_published_feedback" on public.feedback_messages
  for select to anon, authenticated
  using (is_published = true);
create policy "admins_read_feedback" on public.feedback_messages
  for select to authenticated
  using ((select public.is_admin()));
create policy "admins_update_feedback" on public.feedback_messages
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
create policy "admins_delete_feedback" on public.feedback_messages
  for delete to authenticated
  using ((select public.is_admin()));

create policy "admins_read_orders" on public.orders
  for select to authenticated
  using ((select public.is_admin()));
create policy "admins_insert_orders" on public.orders
  for insert to authenticated
  with check ((select public.is_admin()));
create policy "admins_update_orders" on public.orders
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "public_read_published_articles" on public.articles
  for select to anon, authenticated
  using (status = 'published');
create policy "admins_read_articles" on public.articles
  for select to authenticated
  using ((select public.is_admin()));
create policy "admins_insert_articles" on public.articles
  for insert to authenticated
  with check ((select public.is_admin()));
create policy "admins_update_articles" on public.articles
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
create policy "admins_delete_articles" on public.articles
  for delete to authenticated
  using ((select public.is_admin()));

create policy "public_read_published_knowledge" on public.knowledge_articles
  for select to anon, authenticated
  using (status = 'published');
create policy "admins_read_knowledge" on public.knowledge_articles
  for select to authenticated
  using ((select public.is_admin()));
create policy "admins_insert_knowledge" on public.knowledge_articles
  for insert to authenticated
  with check ((select public.is_admin()));
create policy "admins_update_knowledge" on public.knowledge_articles
  for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
create policy "admins_delete_knowledge" on public.knowledge_articles
  for delete to authenticated
  using ((select public.is_admin()));

create policy "users_read_own_admin" on public.admin_users
  for select to authenticated
  using (user_id = (select auth.uid()));
create policy "admins_read_admin_users" on public.admin_users
  for select to authenticated
  using ((select public.is_admin()));

create policy "admins_read_library_metadata" on public.library_files
  for select to authenticated
  using ((select public.is_admin()));
create policy "admins_insert_library_metadata" on public.library_files
  for insert to authenticated
  with check ((select public.is_admin()));
create policy "admins_delete_library_metadata" on public.library_files
  for delete to authenticated
  using ((select public.is_admin()));

-- Remove legacy default-style client grants, then grant back only operations
-- used by the current Data API/browser code. service_role privileges are untouched.
revoke all privileges on table public.inquiries from anon, authenticated;
revoke all privileges on table public.inquiry_files from anon, authenticated;
revoke all privileges on table public.customers from anon, authenticated;
revoke all privileges on table public.feedback_messages from anon, authenticated;
revoke all privileges on table public.orders from anon, authenticated;
revoke all privileges on table public.articles from anon, authenticated;
revoke all privileges on table public.knowledge_articles from anon, authenticated;
revoke all privileges on table public.admin_users from anon, authenticated;
revoke all privileges on table public.library_files from anon, authenticated;

grant select, update on table public.inquiries to authenticated;
grant select on table public.inquiry_files to authenticated;
grant select, delete on table public.customers to authenticated;
grant select on table public.feedback_messages to anon, authenticated;
grant update, delete on table public.feedback_messages to authenticated;
grant select, insert, update on table public.orders to authenticated;
grant select on table public.articles to anon, authenticated;
grant insert, update, delete on table public.articles to authenticated;
grant select on table public.knowledge_articles to anon, authenticated;
grant insert, update, delete on table public.knowledge_articles to authenticated;
grant select on table public.admin_users to authenticated;
grant select, insert, delete on table public.library_files to authenticated;

-- Bucket metadata. No storage.objects row is read or changed. library-files
-- intentionally preserves the production NULL size/MIME limits because the
-- current internal library accepts mixed CAD/BOM/archive formats and no approved
-- business limit exists. Access is instead restricted to verified admins.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'article-images',
    'article-images',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
  ),
  ('inquiry-files', 'inquiry-files', false, 26214400, null),
  ('library-files', 'library-files', false, null, null)
on conflict (id) do update set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Remove every existing policy scoped to these three buckets, regardless of its
-- production display name, then recreate the reviewed operation-specific set.
do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select policyname
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and (
        coalesce(qual, '') ~ '''(article-images|inquiry-files|library-files)'''
        or coalesce(with_check, '') ~ '''(article-images|inquiry-files|library-files)'''
      )
  loop
    execute format('drop policy if exists %I on storage.objects', existing_policy.policyname);
  end loop;
end $$;

create policy "public_read_article_images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'article-images');
create policy "admins_upload_article_images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'article-images' and (select public.is_admin()));
create policy "admins_update_article_images" on storage.objects
  for update to authenticated
  using (bucket_id = 'article-images' and (select public.is_admin()))
  with check (bucket_id = 'article-images' and (select public.is_admin()));
create policy "admins_delete_article_images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'article-images' and (select public.is_admin()));

create policy "admins_read_inquiry_files_objects" on storage.objects
  for select to authenticated
  using (bucket_id = 'inquiry-files' and (select public.is_admin()));

create policy "admins_read_library_files_objects" on storage.objects
  for select to authenticated
  using (bucket_id = 'library-files' and (select public.is_admin()));
create policy "admins_upload_library_files_objects" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'library-files' and (select public.is_admin()));
create policy "admins_delete_library_files_objects" on storage.objects
  for delete to authenticated
  using (bucket_id = 'library-files' and (select public.is_admin()));

commit;
