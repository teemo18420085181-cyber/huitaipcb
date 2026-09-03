-- Run only against a disposable local/test Supabase database after all migrations:
--   supabase test db supabase/tests/database/20260902_security_hardening.test.sql
-- This test creates synthetic rows inside a transaction and rolls everything back.
-- Never run it against production.
-- Supabase's protect_objects_delete trigger intentionally blocks direct SQL
-- deletion from storage.objects before RLS. DELETE policy shape is therefore
-- asserted through pg_policies here; real allow/deny behavior is covered by the
-- disposable Storage API identity matrix.

begin;

create extension if not exists pgtap with schema extensions;
select no_plan();

-- Synthetic identities. No production Auth or business data is used.
insert into auth.users (
  id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'authenticated', 'authenticated', 'non-admin@example.test', '', now(),
    '{}'::jsonb, '{}'::jsonb, now(), now()
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'authenticated', 'authenticated', 'admin@example.test', '', now(),
    '{}'::jsonb, '{}'::jsonb, now(), now()
  );

insert into public.admin_users (user_id, role, full_name)
values ('10000000-0000-4000-8000-000000000002', 'admin', 'Policy Test Admin');

insert into public.articles (id, slug, title, content, status)
values
  ('20000000-0000-4000-8000-000000000001', 'policy-published', 'Published', 'Public', 'published'),
  ('20000000-0000-4000-8000-000000000002', 'policy-draft', 'Draft', 'Private', 'draft');

insert into public.feedback_messages (id, name, message, is_published)
values
  ('30000000-0000-4000-8000-000000000001', 'Published', 'Public', true),
  ('30000000-0000-4000-8000-000000000002', 'Pending', 'Private', false);

insert into public.orders (id, customer_name, status)
values ('40000000-0000-4000-8000-000000000001', 'Test Buyer', 'pending');

insert into public.library_files (id, title, storage_path, file_name)
values ('50000000-0000-4000-8000-000000000001', 'Test file', 'policy/library.txt', 'library.txt');

insert into public.inquiries (id, name, email, message)
values ('60000000-0000-4000-8000-000000000001', 'Test Inquiry', 'inquiry@example.test', 'Test');

insert into public.inquiry_files (id, inquiry_id, file_name, storage_path)
values (
  '61000000-0000-4000-8000-000000000001',
  '60000000-0000-4000-8000-000000000001',
  'test.zip',
  'policy/test.zip'
);

insert into public.customers (id, name, email)
values ('70000000-0000-4000-8000-000000000001', 'Test Customer', 'customer@example.test');

insert into storage.objects (bucket_id, name, metadata)
values
  ('library-files', 'policy/existing-library.txt', '{"mimetype":"text/plain","size":16}'::jsonb),
  ('order-images', 'orders/existing-order.png', '{"mimetype":"image/png","size":16}'::jsonb),
  ('inquiry-files', 'policy/existing-inquiry.zip', '{"mimetype":"application/zip","size":16}'::jsonb),
  ('article-images', 'policy/public-article.png', '{"mimetype":"image/png","size":16}'::jsonb);

-- Grants are evaluated before RLS.
select ok(
  not has_table_privilege('anon', 'public.inquiries', 'select')
  and not has_table_privilege('anon', 'public.inquiries', 'insert')
  and not has_table_privilege('anon', 'public.inquiries', 'update')
  and not has_table_privilege('anon', 'public.inquiries', 'delete'),
  'anon has no inquiry table grants'
);
select ok(
  has_table_privilege('authenticated', 'public.inquiries', 'select')
  and has_table_privilege('authenticated', 'public.inquiries', 'update'),
  'authenticated keeps inquiry read/update grants for admins'
);
select ok(
  not has_table_privilege('authenticated', 'public.inquiries', 'insert')
  and not has_table_privilege('authenticated', 'public.inquiries', 'delete'),
  'authenticated cannot insert/delete inquiries'
);
select ok(has_table_privilege('anon', 'public.articles', 'select'), 'anon keeps article SELECT');
select ok(
  not has_table_privilege('anon', 'public.articles', 'insert')
  and not has_table_privilege('anon', 'public.articles', 'update')
  and not has_table_privilege('anon', 'public.articles', 'delete'),
  'anon has no article write grant'
);
select ok(
  has_table_privilege('authenticated', 'public.orders', 'select')
  and has_table_privilege('authenticated', 'public.orders', 'insert')
  and has_table_privilege('authenticated', 'public.orders', 'update'),
  'authenticated keeps order operations required by admin UI'
);
select ok(not has_table_privilege('authenticated', 'public.orders', 'delete'), 'authenticated has no order DELETE grant');
select ok(
  not has_table_privilege('anon', 'public.admin_users', 'select')
  and not has_table_privilege('anon', 'public.admin_users', 'insert')
  and not has_table_privilege('anon', 'public.admin_users', 'update')
  and not has_table_privilege('anon', 'public.admin_users', 'delete'),
  'anon has no admin membership privileges'
);
select ok(has_table_privilege('authenticated', 'public.admin_users', 'select'), 'authenticated may perform policy-filtered membership lookup');
select ok(
  not has_table_privilege('authenticated', 'public.admin_users', 'insert')
  and not has_table_privilege('authenticated', 'public.admin_users', 'update')
  and not has_table_privilege('authenticated', 'public.admin_users', 'delete'),
  'authenticated cannot mutate admin membership'
);
select ok(
  not has_table_privilege('anon', 'public.orders', 'truncate')
  and not has_table_privilege('authenticated', 'public.orders', 'truncate')
  and not has_table_privilege('anon', 'public.articles', 'trigger')
  and not has_table_privilege('authenticated', 'public.articles', 'references'),
  'legacy TRUNCATE/TRIGGER/REFERENCES grants are removed'
);

-- Anonymous behavior.
set local role anon;
select set_config('request.jwt.claim.sub', '', true);
select is(public.is_admin(), false, 'is_admin fails closed when auth.uid() is NULL');

select results_eq(
  $$select slug from public.articles order by slug$$,
  $$values ('policy-published'::text)$$,
  'anon reads only published articles'
);
select throws_ok(
  $$insert into public.articles (slug, title, status) values ('anon-write', 'Denied', 'published')$$,
  '42501', null, 'anon cannot insert articles'
);
select throws_ok(
  $$update public.articles set title = 'Denied' where slug = 'policy-published'$$,
  '42501', null, 'anon cannot update articles'
);
select throws_ok(
  $$delete from public.articles where slug = 'policy-published'$$,
  '42501', null, 'anon cannot delete articles'
);

select results_eq(
  $$select count(*)::bigint from public.feedback_messages$$,
  $$values (1::bigint)$$,
  'anon reads only published feedback'
);
select throws_ok(
  $$insert into public.feedback_messages (message) values ('Denied')$$,
  '42501', null, 'anon cannot write feedback directly'
);
select throws_ok(
  $$select * from public.orders$$,
  '42501', null, 'anon cannot read orders'
);
select throws_ok(
  $$insert into public.orders (customer_name) values ('Denied')$$,
  '42501', null, 'anon cannot insert orders'
);
select throws_ok(
  $$update public.orders set notes = 'Denied'$$,
  '42501', null, 'anon cannot update orders'
);
select throws_ok(
  $$delete from public.orders$$,
  '42501', null, 'anon cannot delete orders'
);
select throws_ok(
  $$update public.feedback_messages set message = 'Denied'$$,
  '42501', null, 'anon cannot update feedback'
);
select throws_ok(
  $$delete from public.feedback_messages$$,
  '42501', null, 'anon cannot delete feedback'
);
select throws_ok(
  $$select * from public.library_files$$,
  '42501', null, 'anon cannot read library metadata'
);
select throws_ok(
  $$insert into public.library_files (title, storage_path, file_name) values ('Denied', 'denied', 'denied')$$,
  '42501', null, 'anon cannot insert library metadata'
);
select throws_ok(
  $$update public.library_files set title = 'Denied'$$,
  '42501', null, 'anon cannot update library metadata'
);
select throws_ok(
  $$delete from public.library_files$$,
  '42501', null, 'anon cannot delete library metadata'
);
select throws_ok(
  $$select * from public.admin_users$$,
  '42501', null, 'anon cannot read admin membership'
);
select throws_ok(
  $$insert into public.admin_users (user_id, role) values ('10000000-0000-4000-8000-000000000001', 'admin')$$,
  '42501', null, 'anon cannot insert admin membership'
);
select throws_ok(
  $$update public.admin_users set role = 'admin'$$,
  '42501', null, 'anon cannot update admin membership'
);
select throws_ok(
  $$delete from public.admin_users$$,
  '42501', null, 'anon cannot delete admin membership'
);

select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'library-files'$$,
  $$values (0::bigint)$$,
  'anon cannot read library objects'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('library-files', 'policy/anon.txt')$$,
  '42501', null, 'anon cannot upload library objects'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'library-files' returning id$$,
  $$select id from storage.objects where false$$,
  'anon cannot update library objects'
);
select ok(
  not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and ('anon'::name = any(roles) or 'public'::name = any(roles))
      and coalesce(qual, '') like '%library-files%'
  ),
  'anon has no library object delete policy; Storage API deletion is tested separately'
);
select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'order-images'$$,
  $$values (0::bigint)$$,
  'anon cannot read order images'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('order-images', 'orders/anon.png')$$,
  '42501', null, 'anon cannot upload order images'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'order-images' returning id$$,
  $$select id from storage.objects where false$$,
  'anon cannot update order images'
);
select ok(
  not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and ('anon'::name = any(roles) or 'public'::name = any(roles))
      and coalesce(qual, '') like '%order-images%'
  ),
  'anon has no order-image delete policy; Storage API deletion is tested separately'
);
select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'inquiry-files'$$,
  $$values (0::bigint)$$,
  'anon cannot read inquiry files'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('inquiry-files', 'policy/anon.zip')$$,
  '42501', null, 'anon cannot upload inquiry files'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'inquiry-files' returning id$$,
  $$select id from storage.objects where false$$,
  'anon cannot update inquiry files'
);
select ok(
  not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and ('anon'::name = any(roles) or 'public'::name = any(roles))
      and coalesce(qual, '') like '%inquiry-files%'
  ),
  'anon has no inquiry-file delete policy; Storage API deletion is tested separately'
);
select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'article-images'$$,
  $$values (1::bigint)$$,
  'anon still reads public article images'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('article-images', 'policy/anon.png')$$,
  '42501', null, 'anon cannot upload article images'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'article-images' returning id$$,
  $$select id from storage.objects where false$$,
  'anon cannot update article images'
);
select ok(
  not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and ('anon'::name = any(roles) or 'public'::name = any(roles))
      and coalesce(qual, '') like '%article-images%'
  ),
  'anon has no article-image delete policy; Storage API deletion is tested separately'
);

reset role;

-- Authenticated non-admin behavior.
set local role authenticated;
select set_config('request.jwt.claim.sub', '10000000-0000-4000-8000-000000000001', true);

select results_eq(
  $$select slug from public.articles order by slug$$,
  $$values ('policy-published'::text)$$,
  'non-admin reads only published articles'
);
select throws_ok(
  $$insert into public.articles (slug, title, status) values ('non-admin-write', 'Denied', 'draft')$$,
  '42501', null, 'non-admin cannot insert articles'
);
select results_eq(
  $$update public.articles set title = 'Denied' where slug = 'policy-draft' returning id$$,
  $$select id from public.articles where false$$,
  'non-admin cannot update draft articles'
);
select results_eq(
  $$delete from public.articles where slug = 'policy-draft' returning id$$,
  $$select id from public.articles where false$$,
  'non-admin cannot delete draft articles'
);
select results_eq(
  $$update public.articles set title = 'Denied' where slug = 'policy-published' returning id$$,
  $$select id from public.articles where false$$,
  'non-admin cannot update published articles'
);
select results_eq(
  $$delete from public.articles where slug = 'policy-published' returning id$$,
  $$select id from public.articles where false$$,
  'non-admin cannot delete published articles'
);

select results_eq(
  $$select count(*)::bigint from public.feedback_messages$$,
  $$values (1::bigint)$$,
  'non-admin reads only published feedback'
);
select throws_ok(
  $$insert into public.feedback_messages (message) values ('Denied')$$,
  '42501', null, 'non-admin cannot insert feedback'
);
select results_eq(
  $$update public.feedback_messages set message = 'Denied' returning id$$,
  $$select id from public.feedback_messages where false$$,
  'non-admin cannot update feedback'
);
select results_eq(
  $$delete from public.feedback_messages returning id$$,
  $$select id from public.feedback_messages where false$$,
  'non-admin cannot delete feedback'
);

select results_eq(
  $$select count(*)::bigint from public.orders$$,
  $$values (0::bigint)$$,
  'non-admin cannot read orders'
);
select throws_ok(
  $$insert into public.orders (customer_name) values ('Denied')$$,
  '42501', null, 'non-admin cannot insert orders'
);
select results_eq(
  $$update public.orders set notes = 'Denied' returning id$$,
  $$select id from public.orders where false$$,
  'non-admin cannot update orders'
);
select throws_ok(
  $$delete from public.orders$$,
  '42501', null, 'non-admin cannot delete orders'
);

select results_eq(
  $$select count(*)::bigint from public.library_files$$,
  $$values (0::bigint)$$,
  'non-admin cannot read library metadata'
);
select throws_ok(
  $$insert into public.library_files (title, storage_path, file_name) values ('Denied', 'denied', 'denied')$$,
  '42501', null, 'non-admin cannot insert library metadata'
);
select results_eq(
  $$delete from public.library_files returning id$$,
  $$select id from public.library_files where false$$,
  'non-admin cannot delete library metadata'
);
select throws_ok(
  $$update public.library_files set title = 'Denied'$$,
  '42501', null, 'non-admin cannot update library metadata'
);

select results_eq(
  $$select count(*)::bigint from public.inquiries$$,
  $$values (0::bigint)$$,
  'non-admin cannot read inquiries'
);
select results_eq(
  $$select count(*)::bigint from public.inquiry_files$$,
  $$values (0::bigint)$$,
  'non-admin cannot read inquiry metadata'
);
select results_eq(
  $$select count(*)::bigint from public.customers$$,
  $$values (0::bigint)$$,
  'non-admin cannot read customers'
);
select results_eq(
  $$select count(*)::bigint from public.admin_users$$,
  $$values (0::bigint)$$,
  'non-admin cannot read another membership row'
);
select throws_ok(
  $$insert into public.admin_users (user_id, role) values ('10000000-0000-4000-8000-000000000001', 'admin')$$,
  '42501', null, 'non-admin cannot self-elevate'
);
select throws_ok(
  $$update public.admin_users set role = 'admin'$$,
  '42501', null, 'non-admin cannot update membership'
);
select throws_ok(
  $$delete from public.admin_users$$,
  '42501', null, 'non-admin cannot delete membership'
);
select is(public.is_admin(), false, 'is_admin fails closed for a non-admin identity');

select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'library-files'$$,
  $$values (0::bigint)$$,
  'non-admin cannot read library objects'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('library-files', 'policy/non-admin.txt')$$,
  '42501', null, 'non-admin cannot upload library objects'
);
select ok(
  not public.is_admin()
  and not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%library-files%'
      and coalesce(qual, '') not like '%is_admin%'
  ),
  'non-admin has no unrestricted library object delete policy; Storage API deletion is tested separately'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'library-files' returning id$$,
  $$select id from storage.objects where false$$,
  'non-admin cannot update library objects'
);
select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'order-images'$$,
  $$values (0::bigint)$$,
  'non-admin cannot read order images'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('order-images', 'orders/non-admin.png')$$,
  '42501', null, 'non-admin cannot upload order images'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'order-images' returning id$$,
  $$select id from storage.objects where false$$,
  'non-admin cannot update order images'
);
select ok(
  not public.is_admin()
  and not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%order-images%'
      and coalesce(qual, '') not like '%is_admin%'
  ),
  'non-admin has no unrestricted order-image delete policy; Storage API deletion is tested separately'
);
select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'inquiry-files'$$,
  $$values (0::bigint)$$,
  'non-admin cannot read inquiry files'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('inquiry-files', 'policy/non-admin.zip')$$,
  '42501', null, 'non-admin cannot upload inquiry files'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'inquiry-files' returning id$$,
  $$select id from storage.objects where false$$,
  'non-admin cannot update inquiry files'
);
select ok(
  not public.is_admin()
  and not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%inquiry-files%'
      and coalesce(qual, '') not like '%is_admin%'
  ),
  'non-admin has no unrestricted inquiry-file delete policy; Storage API deletion is tested separately'
);
select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'article-images'$$,
  $$values (1::bigint)$$,
  'non-admin reads public article images'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('article-images', 'policy/non-admin.png')$$,
  '42501', null, 'non-admin cannot upload article images'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'article-images' returning id$$,
  $$select id from storage.objects where false$$,
  'non-admin cannot update article images'
);
select ok(
  not public.is_admin()
  and not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%article-images%'
      and coalesce(qual, '') not like '%is_admin%'
  ),
  'non-admin has no unrestricted article-image delete policy; Storage API deletion is tested separately'
);

reset role;

-- Verified admin behavior.
set local role authenticated;
select set_config('request.jwt.claim.sub', '10000000-0000-4000-8000-000000000002', true);
select is(public.is_admin(), true, 'is_admin recognizes the synthetic admin identity');

select results_eq(
  $$select count(*)::bigint from public.articles$$,
  $$values (2::bigint)$$,
  'admin reads published and draft articles'
);
select lives_ok(
  $$insert into public.articles (id, slug, title, status) values ('20000000-0000-4000-8000-000000000003', 'admin-created', 'Created', 'draft')$$,
  'admin inserts articles'
);
select lives_ok(
  $$update public.articles set title = 'Updated' where slug = 'admin-created'$$,
  'admin updates articles'
);
select lives_ok(
  $$delete from public.articles where slug = 'admin-created'$$,
  'admin deletes articles'
);

select results_eq(
  $$select count(*)::bigint from public.feedback_messages$$,
  $$values (2::bigint)$$,
  'admin reads unpublished feedback'
);
select lives_ok(
  $$update public.feedback_messages set admin_response = 'Reviewed' where id = '30000000-0000-4000-8000-000000000002'$$,
  'admin updates feedback'
);
select lives_ok(
  $$delete from public.feedback_messages where id = '30000000-0000-4000-8000-000000000002'$$,
  'admin deletes feedback'
);
select throws_ok(
  $$insert into public.feedback_messages (message) values ('No client insert path')$$,
  '42501', null, 'admin Data API role has no feedback insert grant'
);

select results_eq(
  $$select count(*)::bigint from public.orders where id = '40000000-0000-4000-8000-000000000001'$$,
  $$values (1::bigint)$$,
  'admin reads the pgTAP order fixture'
);
select lives_ok(
  $$insert into public.orders (id, customer_name) values ('40000000-0000-4000-8000-000000000002', 'Admin Created')$$,
  'admin inserts orders'
);
select lives_ok(
  $$update public.orders set notes = 'Updated' where id = '40000000-0000-4000-8000-000000000002'$$,
  'admin updates orders'
);
select throws_ok(
  $$delete from public.orders where id = '40000000-0000-4000-8000-000000000002'$$,
  '42501', null, 'admin Data API role has no order delete grant'
);

select results_eq(
  $$select count(*)::bigint from public.library_files$$,
  $$values (1::bigint)$$,
  'admin reads library metadata'
);
select lives_ok(
  $$insert into public.library_files (id, title, storage_path, file_name) values ('50000000-0000-4000-8000-000000000002', 'Created', 'policy/created', 'created')$$,
  'admin inserts library metadata'
);
select lives_ok(
  $$delete from public.library_files where id = '50000000-0000-4000-8000-000000000002'$$,
  'admin deletes library metadata'
);
select throws_ok(
  $$update public.library_files set title = 'No update path'$$,
  '42501', null, 'admin Data API role has no library metadata update grant'
);

select results_eq(
  $$select count(*)::bigint from public.inquiries$$,
  $$values (1::bigint)$$,
  'admin reads inquiries'
);
select lives_ok(
  $$update public.inquiries set internal_notes = 'Reviewed' where id = '60000000-0000-4000-8000-000000000001'$$,
  'admin updates inquiries'
);
select results_eq(
  $$select count(*)::bigint from public.inquiry_files$$,
  $$values (1::bigint)$$,
  'admin reads inquiry metadata'
);
select results_eq(
  $$select count(*)::bigint from public.customers$$,
  $$values (1::bigint)$$,
  'admin reads customers'
);
select lives_ok(
  $$delete from public.customers where id = '70000000-0000-4000-8000-000000000001'$$,
  'admin deletes customers'
);
select results_eq(
  $$select count(*)::bigint from public.admin_users where user_id = '10000000-0000-4000-8000-000000000002'$$,
  $$values (1::bigint)$$,
  'admin reads the pgTAP membership fixture'
);
select throws_ok(
  $$insert into public.admin_users (user_id, role) values ('10000000-0000-4000-8000-000000000001', 'admin')$$,
  '42501', null, 'admin Data API role cannot insert membership'
);
select throws_ok(
  $$update public.admin_users set role = 'viewer'$$,
  '42501', null, 'admin Data API role cannot update membership'
);
select throws_ok(
  $$delete from public.admin_users$$,
  '42501', null, 'admin Data API role cannot delete membership'
);

select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'library-files'$$,
  $$values (1::bigint)$$,
  'admin reads library objects for signed URLs'
);
select lives_ok(
  $$insert into storage.objects (bucket_id, name, metadata) values ('library-files', 'policy/admin.txt', '{"mimetype":"text/plain","size":16}'::jsonb)$$,
  'admin uploads library objects'
);
select ok(
  public.is_admin()
  and exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%library-files%'
      and coalesce(qual, '') like '%is_admin%'
  ),
  'admin has an is_admin-scoped library delete policy; Storage API deletion is tested separately'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'library-files' returning id$$,
  $$select id from storage.objects where false$$,
  'admin has no library object update policy'
);

select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'order-images' and name = 'orders/existing-order.png'$$,
  $$values (1::bigint)$$,
  'admin reads the pgTAP private order-image fixture'
);
select lives_ok(
  $$insert into storage.objects (bucket_id, name, metadata) values ('order-images', 'orders/admin.png', '{"mimetype":"image/png","size":16}'::jsonb)$$,
  'admin uploads order images'
);
select lives_ok(
  $$update storage.objects set metadata = '{"mimetype":"image/png","size":17}'::jsonb where bucket_id = 'order-images' and name = 'orders/admin.png'$$,
  'admin updates order images'
);
select ok(
  public.is_admin()
  and exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%order-images%'
      and coalesce(qual, '') like '%is_admin%'
  ),
  'admin has an is_admin-scoped order-image delete policy; Storage API deletion is tested separately'
);

select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'inquiry-files' and name = 'policy/existing-inquiry.zip'$$,
  $$values (1::bigint)$$,
  'admin reads the pgTAP inquiry-file fixture for signed URLs'
);
select ok(
  not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%inquiry-files%'
  ),
  'admin has no inquiry-file delete policy; Storage API deletion is tested separately'
);
select throws_ok(
  $$insert into storage.objects (bucket_id, name) values ('inquiry-files', 'policy/admin.zip')$$,
  '42501', null, 'admin Data API role has no inquiry-file upload policy'
);
select results_eq(
  $$update storage.objects set metadata = '{}'::jsonb where bucket_id = 'inquiry-files' returning id$$,
  $$select id from storage.objects where false$$,
  'admin has no inquiry-file update policy'
);

select results_eq(
  $$select count(*)::bigint from storage.objects where bucket_id = 'article-images'$$,
  $$values (1::bigint)$$,
  'admin reads public article images'
);
select lives_ok(
  $$insert into storage.objects (bucket_id, name, metadata) values ('article-images', 'policy/admin.png', '{"mimetype":"image/png","size":16}'::jsonb)$$,
  'admin uploads article images'
);
select lives_ok(
  $$update storage.objects set metadata = '{"mimetype":"image/png","size":17}'::jsonb where bucket_id = 'article-images' and name = 'policy/admin.png'$$,
  'admin updates article images'
);
select ok(
  public.is_admin()
  and exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and cmd in ('DELETE', 'ALL')
      and 'authenticated'::name = any(roles)
      and coalesce(qual, '') like '%article-images%'
      and coalesce(qual, '') like '%is_admin%'
  ),
  'admin has an is_admin-scoped article-image delete policy; Storage API deletion is tested separately'
);

reset role;

select * from finish();
rollback;
