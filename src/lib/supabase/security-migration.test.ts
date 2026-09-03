import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const repositoryRoot = path.resolve(__dirname, '../../..');
const hardeningPath = path.join(repositoryRoot, 'supabase/migrations/20260902090000_rls_grants_storage_hardening.sql');
const orderImagesPath = path.join(repositoryRoot, 'supabase/migrations/20260902100000_order_image_storage_transition.sql');
const verificationPath = path.join(repositoryRoot, 'supabase/verification/20260902_security_post_migration.sql');

function normalize(sql: string) {
  return sql.replace(/--.*$/gm, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function hardeningSql() {
  return normalize(readFileSync(hardeningPath, 'utf8'));
}

function orderImagesSql() {
  return normalize(readFileSync(orderImagesPath, 'utf8'));
}

function expectPolicy(sql: string, statement: string) {
  expect(sql).toContain(normalize(statement));
}

describe('table RLS policy contract', () => {
  it('keeps published articles public and restricts every CMS write to is_admin', () => {
    const sql = hardeningSql();
    expectPolicy(sql, `create policy "public_read_published_articles" on public.articles for select to anon, authenticated using (status = 'published')`);
    expectPolicy(sql, `create policy "admins_insert_articles" on public.articles for insert to authenticated with check ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_update_articles" on public.articles for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_delete_articles" on public.articles for delete to authenticated using ((select public.is_admin()))`);
    expect(sql).not.toContain("auth.role() = 'authenticated'");
  });

  it('keeps direct public feedback writes closed while preserving published reads', () => {
    const sql = hardeningSql();
    expectPolicy(sql, `create policy "public_read_published_feedback" on public.feedback_messages for select to anon, authenticated using (is_published = true)`);
    expectPolicy(sql, `create policy "admins_update_feedback" on public.feedback_messages for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_delete_feedback" on public.feedback_messages for delete to authenticated using ((select public.is_admin()))`);
    expect(sql).not.toContain('create policy "public_insert_feedback"');
  });

  it('gives orders only the admin operations used by the application', () => {
    const sql = hardeningSql();
    expectPolicy(sql, `create policy "admins_read_orders" on public.orders for select to authenticated using ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_insert_orders" on public.orders for insert to authenticated with check ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_update_orders" on public.orders for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))`);
    expect(sql).not.toContain('create policy "admins_delete_orders"');
  });

  it('keeps library metadata admin-only and limits it to current read/upload/delete paths', () => {
    const sql = hardeningSql();
    expectPolicy(sql, `create policy "admins_read_library_metadata" on public.library_files for select to authenticated using ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_insert_library_metadata" on public.library_files for insert to authenticated with check ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_delete_library_metadata" on public.library_files for delete to authenticated using ((select public.is_admin()))`);
    expect(sql).not.toContain('create policy "admins_update_library_metadata"');
  });

  it('keeps inquiry and customer operations at their current application minimum', () => {
    const sql = hardeningSql();
    expectPolicy(sql, `create policy "admins_read_inquiries" on public.inquiries for select to authenticated using ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_update_inquiries" on public.inquiries for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_read_inquiry_files" on public.inquiry_files for select to authenticated using ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_read_customers" on public.customers for select to authenticated using ((select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_delete_customers" on public.customers for delete to authenticated using ((select public.is_admin()))`);
  });

  it('preserves published knowledge reads and admin-only CMS management', () => {
    const sql = hardeningSql();
    expectPolicy(sql, `create policy "public_read_published_knowledge" on public.knowledge_articles for select to anon, authenticated using (status = 'published')`);
    for (const operation of ['read', 'insert', 'update', 'delete']) {
      expect(sql).toContain(`create policy "admins_${operation}_knowledge"`);
    }
  });

  it('allows admin membership lookup without client-side membership mutation', () => {
    const sql = hardeningSql();
    expectPolicy(sql, `create policy "users_read_own_admin" on public.admin_users for select to authenticated using (user_id = (select auth.uid()))`);
    expectPolicy(sql, `create policy "admins_read_admin_users" on public.admin_users for select to authenticated using ((select public.is_admin()))`);
    expect(sql).not.toContain('create policy "admins_insert_admin_users"');
    expect(sql).not.toContain('create policy "admins_update_admin_users"');
    expect(sql).not.toContain('create policy "admins_delete_admin_users"');
  });
});

describe('least-privilege table grants', () => {
  const expectedGrants = [
    'grant select, update on table public.inquiries to authenticated',
    'grant select on table public.inquiry_files to authenticated',
    'grant select, delete on table public.customers to authenticated',
    'grant select on table public.feedback_messages to anon, authenticated',
    'grant update, delete on table public.feedback_messages to authenticated',
    'grant select, insert, update on table public.orders to authenticated',
    'grant select on table public.articles to anon, authenticated',
    'grant insert, update, delete on table public.articles to authenticated',
    'grant select on table public.knowledge_articles to anon, authenticated',
    'grant insert, update, delete on table public.knowledge_articles to authenticated',
    'grant select on table public.admin_users to authenticated',
    'grant select, insert, delete on table public.library_files to authenticated',
  ];

  it.each(expectedGrants)('restores only the required grant: %s', (grant) => {
    expect(hardeningSql()).toContain(grant);
  });

  it('revokes legacy broad privileges before granting the allowlist', () => {
    const sql = hardeningSql();
    for (const table of [
      'inquiries', 'inquiry_files', 'customers', 'feedback_messages', 'orders',
      'articles', 'knowledge_articles', 'admin_users', 'library_files',
    ]) {
      expect(sql).toContain(`revoke all privileges on table public.${table} from anon, authenticated`);
    }
  });
});

describe('security definer contract', () => {
  it('reproduces is_admin with a fixed search path and schema-qualified membership lookup', () => {
    const sql = hardeningSql();
    expect(sql).toContain('create or replace function public.is_admin()');
    expect(sql).toContain('security definer stable set search_path = public');
    expect(sql).toContain('from public.admin_users where user_id = auth.uid()');
    expect(sql).toContain('revoke all on function public.is_admin() from public');
    expect(sql).toContain('grant execute on function public.is_admin() to anon, authenticated, service_role');
  });
});

describe('Storage bucket and policy contract', () => {
  it('keeps article-images public with its current limits and public-read/admin-write model', () => {
    const sql = hardeningSql();
    expect(sql).toContain("'article-images', 'article-images', true, 5242880");
    expect(sql).toContain("array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']");
    expectPolicy(sql, `create policy "public_read_article_images" on storage.objects for select to anon, authenticated using (bucket_id = 'article-images')`);
    expectPolicy(sql, `create policy "admins_upload_article_images" on storage.objects for insert to authenticated with check (bucket_id = 'article-images' and (select public.is_admin()))`);
  });

  it('keeps inquiry-files private at 25 MiB and adds only admin SELECT', () => {
    const sql = hardeningSql();
    expect(sql).toContain("'inquiry-files', 'inquiry-files', false, 26214400, null");
    expectPolicy(sql, `create policy "admins_read_inquiry_files_objects" on storage.objects for select to authenticated using (bucket_id = 'inquiry-files' and (select public.is_admin()))`);
    expect(sql).not.toContain('create policy "admins_delete_inquiry_files_objects"');
  });

  it('keeps library-files private and restricts current read/upload/delete operations to admins', () => {
    const sql = hardeningSql();
    expect(sql).toContain("'library-files', 'library-files', false, null, null");
    expectPolicy(sql, `create policy "admins_read_library_files_objects" on storage.objects for select to authenticated using (bucket_id = 'library-files' and (select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_upload_library_files_objects" on storage.objects for insert to authenticated with check (bucket_id = 'library-files' and (select public.is_admin()))`);
    expectPolicy(sql, `create policy "admins_delete_library_files_objects" on storage.objects for delete to authenticated using (bucket_id = 'library-files' and (select public.is_admin()))`);
  });

  it('makes order-images private with five MiB and only the three application MIME types', () => {
    const sql = orderImagesSql();
    expect(sql).toContain("'order-images', 'order-images', false, 5242880");
    expect(sql).toContain("array['image/jpeg', 'image/png', 'image/webp']");
  });

  it.each(['select', 'insert', 'update', 'delete'])('gives order-images admin-only %s', (operation) => {
    const sql = orderImagesSql();
    expect(sql).toContain(`for ${operation} to authenticated`);
    expect(sql).toContain("bucket_id = 'order-images' and (select public.is_admin())");
  });

  it('does not alter storage.objects grants or mutate Storage object rows', () => {
    const sql = `${hardeningSql()} ${orderImagesSql()}`;
    expect(sql).not.toContain('grant all on table storage.objects');
    expect(sql).not.toContain('revoke all on table storage.objects');
    expect(sql).not.toMatch(/(?:insert into|update|delete from) storage\.objects/);
  });

  it('scopes every storage.objects policy to an explicit reviewed bucket', () => {
    for (const sql of [hardeningSql(), orderImagesSql()]) {
      const policies = sql
        .split(';')
        .filter((statement) => statement.trim().startsWith('create policy') && statement.includes('on storage.objects'));
      expect(policies.length).toBeGreaterThan(0);
      for (const policy of policies) {
        expect(policy).toMatch(/bucket_id = '(article-images|inquiry-files|library-files|order-images)'/);
      }
    }
  });
});

describe('migration safety boundaries', () => {
  it('fails closed when any existing orders column drifts from the recorded production schema', () => {
    const sql = hardeningSql();
    expect(sql).toContain('orders schema differs from the 2026-09-02 production baseline');
    for (const column of [
      'id', 'created_at', 'updated_at', 'customer_name', 'company', 'country',
      'email', 'phone', 'product_name', 'quantity', 'board_amount', 'bom_amount',
      'unit_price', 'total_amount', 'currency', 'status', 'notes', 'image_1',
      'image_2', 'image_3',
    ]) {
      expect(sql).toContain(`('${column}',`);
    }
    expect(sql).toContain("select count(*) from information_schema.columns where table_schema = 'public' and table_name = 'orders'");
    expect(sql).toContain("pg_get_constraintdef(c.oid) = 'primary key (id)'");
    expect(sql).toContain("status in ('pending', 'in_production', 'shipped', 'completed', 'cancelled')");
  });

  it.each([hardeningPath, orderImagesPath])('wraps %s in a transaction', (migrationPath) => {
    const sql = normalize(readFileSync(migrationPath, 'utf8'));
    expect(sql.startsWith('begin;')).toBe(true);
    expect(sql.endsWith('commit;')).toBe(true);
  });

  it('uses sortable unique timestamps with hardening before the private transition', () => {
    const hardeningVersion = path.basename(hardeningPath).slice(0, 14);
    const transitionVersion = path.basename(orderImagesPath).slice(0, 14);
    expect(hardeningVersion).toMatch(/^\d{14}$/);
    expect(transitionVersion).toMatch(/^\d{14}$/);
    expect(hardeningVersion < transitionVersion).toBe(true);
  });

  it('keeps post-migration verification catalog-only and exposes global Storage policy drift', () => {
    const sql = normalize(readFileSync(verificationPath, 'utf8'));
    expect(sql).toContain("c.conrelid = 'public.orders'::regclass");
    expect(sql).toContain("where n.nspname = 'storage' and c.relname in ('buckets', 'objects')");
    expect(sql).toContain("where schemaname = 'storage' and tablename = 'objects' order by cmd, policyname");
    expect(sql).not.toMatch(/from public\.(inquiries|inquiry_files|customers|feedback_messages|orders|articles|knowledge_articles|admin_users|library_files)/);
    expect(sql).not.toContain('from storage.objects');
  });

  it('does not modify conversion_attribution migration content', () => {
    const conversion = readFileSync(
      path.join(repositoryRoot, 'supabase/migrations/20260901_conversion_attribution.sql'),
      'utf8'
    );
    expect(conversion).not.toContain('order-images');
    expect(conversion).not.toContain('admins_full_articles');
  });
});
