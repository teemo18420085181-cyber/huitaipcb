-- ════════════════════════════════════════════════════
--  OneStopPCBA — Row Level Security 策略
--  在 schema.sql 之后执行
-- ════════════════════════════════════════════════════

-- 启用 RLS
alter table public.inquiries enable row level security;
alter table public.inquiry_files enable row level security;
alter table public.customers enable row level security;
alter table public.knowledge_articles enable row level security;
alter table public.library_files enable row level security;
alter table public.admin_users enable row level security;

-- ────────────────────────────────────────────────────
--  Admin helper function
-- ────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$ language sql security definer stable;

-- ────────────────────────────────────────────────────
--  inquiries — 只有管理员能读写
--  (匿名用户通过 service_role key 在 API 路由中插入)
-- ────────────────────────────────────────────────────
drop policy if exists "admins_full_inquiries" on public.inquiries;
create policy "admins_full_inquiries" on public.inquiries
  for all using (public.is_admin()) with check (public.is_admin());

-- inquiry_files
drop policy if exists "admins_full_inquiry_files" on public.inquiry_files;
create policy "admins_full_inquiry_files" on public.inquiry_files
  for all using (public.is_admin()) with check (public.is_admin());

-- ────────────────────────────────────────────────────
--  customers — 只有管理员
-- ────────────────────────────────────────────────────
drop policy if exists "admins_full_customers" on public.customers;
create policy "admins_full_customers" on public.customers
  for all using (public.is_admin()) with check (public.is_admin());

-- ────────────────────────────────────────────────────
--  knowledge_articles — 公开读已发布的，管理员全权限
-- ────────────────────────────────────────────────────
drop policy if exists "public_read_published_knowledge" on public.knowledge_articles;
create policy "public_read_published_knowledge" on public.knowledge_articles
  for select using (status = 'published');

drop policy if exists "admins_full_knowledge" on public.knowledge_articles;
create policy "admins_full_knowledge" on public.knowledge_articles
  for all using (public.is_admin()) with check (public.is_admin());

-- ────────────────────────────────────────────────────
--  library_files — 只有管理员
-- ────────────────────────────────────────────────────
drop policy if exists "admins_full_library" on public.library_files;
create policy "admins_full_library" on public.library_files
  for all using (public.is_admin()) with check (public.is_admin());

-- ────────────────────────────────────────────────────
--  admin_users — 只能读自己的记录
-- ────────────────────────────────────────────────────
drop policy if exists "users_read_own_admin" on public.admin_users;
create policy "users_read_own_admin" on public.admin_users
  for select using (user_id = auth.uid());
