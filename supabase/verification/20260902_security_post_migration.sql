-- Catalog-only verification for the approved post-migration maintenance window.
-- This script reads no public application rows and no storage.objects rows.
-- Save/export its result for comparison with the 2026-09-02 baseline.

select
  n.nspname as schema_name,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as force_rls
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in (
    'inquiries',
    'inquiry_files',
    'customers',
    'feedback_messages',
    'orders',
    'articles',
    'knowledge_articles',
    'admin_users',
    'library_files'
  )
order by c.relname;

select
  n.nspname as schema_name,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as force_rls
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'storage'
  and c.relname in ('buckets', 'objects')
order by c.relname;

select
  table_schema,
  table_name,
  column_name,
  data_type,
  udt_name,
  is_nullable,
  column_default,
  numeric_precision,
  numeric_scale
from information_schema.columns
where table_schema = 'public'
  and table_name in (
    'inquiries',
    'inquiry_files',
    'customers',
    'feedback_messages',
    'orders',
    'articles',
    'knowledge_articles',
    'admin_users',
    'library_files'
  )
order by table_name, ordinal_position;

select
  c.conname as constraint_name,
  c.contype as constraint_type,
  pg_get_constraintdef(c.oid) as definition
from pg_constraint c
where c.conrelid = 'public.orders'::regclass
order by c.contype, c.conname;

select
  grantee,
  table_schema,
  table_name,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee in ('anon', 'authenticated')
  and table_name in (
    'inquiries',
    'inquiry_files',
    'customers',
    'feedback_messages',
    'orders',
    'articles',
    'knowledge_articles',
    'admin_users',
    'library_files'
  )
order by table_name, grantee, privilege_type;

select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'inquiries',
    'inquiry_files',
    'customers',
    'feedback_messages',
    'orders',
    'articles',
    'knowledge_articles',
    'admin_users',
    'library_files'
  )
order by tablename, cmd, policyname;

select
  p.oid::regprocedure::text as function_name,
  pg_get_userbyid(p.proowner) as function_owner,
  p.prosecdef as security_definer,
  p.provolatile as volatility,
  p.proconfig as function_settings,
  pg_get_functiondef(p.oid) as definition,
  p.proacl as execute_acl
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'is_admin';

select
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
from storage.buckets
where id in ('article-images', 'inquiry-files', 'library-files', 'order-images')
order by id;

select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'storage'
  and tablename = 'objects'
order by cmd, policyname;
