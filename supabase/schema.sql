-- ════════════════════════════════════════════════════
--  OneStopPCBA — Supabase Database Schema
--  在 Supabase SQL Editor 中执行此脚本初始化数据库
-- ════════════════════════════════════════════════════

-- 启用 UUID 扩展
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────────
--  inquiries — 客户询盘
-- ────────────────────────────────────────────────────
create table if not exists public.inquiries (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- 客户信息
  name text not null,
  email text not null,
  company text,
  country text,
  phone text,
  message text not null,

  -- 状态管理
  status text not null default 'new' check (status in ('new','reviewing','quoted','in_progress','completed','closed','spam')),
  source text default 'website',

  -- 渠道归因（数据库记录是询盘对账的权威证据）
  page_path text,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  ga_client_id text,
  ga_session_id text,

  -- 幂等和第三方副作用状态（NULL 表示历史记录结果未知）
  idempotency_key uuid,
  analytics_event_id uuid,
  files_status text check (files_status is null or files_status in ('not_required','pending','saved','partial','failed')),
  files_expected_count integer,
  files_saved_count integer,
  admin_email_status text check (admin_email_status is null or admin_email_status in ('pending','sent','failed','skipped_unconfigured')),
  admin_email_message_id text,
  admin_email_sent_at timestamptz,
  customer_email_status text check (customer_email_status is null or customer_email_status in ('pending','sent','failed','skipped_unconfigured')),
  customer_email_message_id text,
  customer_email_sent_at timestamptz,
  analytics_status text check (analytics_status is null or analytics_status in ('pending','sent','failed','skipped_unconfigured')),
  analytics_sent_at timestamptz,
  analytics_attempt_count integer not null default 0 check (analytics_attempt_count >= 0),
  analytics_last_attempt_at timestamptz,
  analytics_last_error_code text,
  analytics_retry_state text check (analytics_retry_state is null or analytics_retry_state in ('not_needed','safe','manual_review')),
  check (
    (files_expected_count is null or files_expected_count >= 0)
    and (files_saved_count is null or files_saved_count >= 0)
    and (files_expected_count is null or files_saved_count is null or files_saved_count <= files_expected_count)
  ),

  -- 内部跟进字段
  assigned_to uuid references auth.users(id),
  internal_notes text,
  quote_amount numeric(12,2),
  quote_currency text default 'USD',

  -- 标签
  tags text[] default array[]::text[]
);

create index if not exists idx_inquiries_status on public.inquiries(status);
create index if not exists idx_inquiries_created on public.inquiries(created_at desc);
create index if not exists idx_inquiries_email on public.inquiries(email);
create unique index if not exists idx_inquiries_idempotency_key_unique on public.inquiries(idempotency_key) where idempotency_key is not null;
create unique index if not exists idx_inquiries_analytics_event_id_unique on public.inquiries(analytics_event_id) where analytics_event_id is not null;

comment on column public.inquiries.analytics_status is
  'sent means the Measurement Protocol request returned HTTP 2xx; it does not confirm GA4 report appearance or session attribution. NULL means legacy outcome unknown.';
comment on column public.inquiries.analytics_attempt_count is
  'For rows with NULL analytics_status, the legacy analytics outcome remains unknown regardless of this counter value.';

-- ────────────────────────────────────────────────────
--  inquiry_files — 询盘附件
-- ────────────────────────────────────────────────────
create table if not exists public.inquiry_files (
  id uuid primary key default uuid_generate_v4(),
  inquiry_id uuid not null references public.inquiries(id) on delete cascade,
  created_at timestamptz not null default now(),

  file_name text not null,
  storage_path text not null,
  file_size bigint,
  mime_type text
);

create index if not exists idx_inquiry_files_inquiry on public.inquiry_files(inquiry_id);

-- ────────────────────────────────────────────────────
--  customers — 客户档案（手动维护）
-- ────────────────────────────────────────────────────
create table if not exists public.customers (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  name text not null,
  email text unique,
  company text,
  country text,
  phone text,
  industry text,

  -- 客户分级
  tier text default 'prospect' check (tier in ('prospect','active','vip','inactive','blacklist')),

  -- 业务统计
  total_orders int default 0,
  total_revenue numeric(14,2) default 0,
  last_order_at timestamptz,

  -- 备注
  notes text,
  tags text[] default array[]::text[],

  assigned_to uuid references auth.users(id)
);

create index if not exists idx_customers_tier on public.customers(tier);
create index if not exists idx_customers_email on public.customers(email);

-- ────────────────────────────────────────────────────
--  knowledge_articles — 知识库文章（前台展示）
-- ────────────────────────────────────────────────────
create table if not exists public.knowledge_articles (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,

  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  category text,
  cover_image text,

  status text not null default 'draft' check (status in ('draft','published','archived')),
  view_count int default 0,

  author_id uuid references auth.users(id)
);

create index if not exists idx_knowledge_status on public.knowledge_articles(status);
create index if not exists idx_knowledge_slug on public.knowledge_articles(slug);

-- ────────────────────────────────────────────────────
--  library_files — 内部资料库（员工上传）
-- ────────────────────────────────────────────────────
create table if not exists public.library_files (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),

  title text not null,
  description text,
  category text,
  tags text[] default array[]::text[],

  storage_path text not null,
  file_name text not null,
  file_size bigint,
  mime_type text,

  uploaded_by uuid references auth.users(id)
);

create index if not exists idx_library_category on public.library_files(category);

-- ────────────────────────────────────────────────────
--  admin_users — 管理员标识
-- ────────────────────────────────────────────────────
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin','manager','viewer')),
  full_name text,
  created_at timestamptz default now()
);

-- ────────────────────────────────────────────────────
--  Triggers — 自动更新 updated_at
-- ────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_inquiries_updated on public.inquiries;
create trigger trg_inquiries_updated
  before update on public.inquiries
  for each row execute function public.set_updated_at();

drop trigger if exists trg_customers_updated on public.customers;
create trigger trg_customers_updated
  before update on public.customers
  for each row execute function public.set_updated_at();

drop trigger if exists trg_knowledge_updated on public.knowledge_articles;
create trigger trg_knowledge_updated
  before update on public.knowledge_articles
  for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────
--  Storage Buckets
--  在 Supabase Dashboard → Storage 中手动创建以下 bucket：
--    1. inquiry-files (Private)
--    2. library-files (Private)
--    3. knowledge-covers (Public)
-- ────────────────────────────────────────────────────

-- ────────────────────────────────────────────────────────────────
--  feedback_messages — 客户问答留言板
-- ────────────────────────────────────────────────────────────────
create table if not exists public.feedback_messages (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),

  name text,
  country text,
  category text not null default 'Question',
  message text not null,

  -- 管理员控制是否公开展示
  is_published boolean not null default false,
  admin_response text,
  published_at timestamptz,

  reviewed_by uuid references auth.users(id)
);

create index if not exists idx_feedback_published on public.feedback_messages(is_published);
create index if not exists idx_feedback_created on public.feedback_messages(created_at desc);
