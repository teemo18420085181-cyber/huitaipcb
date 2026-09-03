-- Prepared 2026-09-02. LOCAL ONLY: do not apply before the backward-compatible
-- order-image reader and path-only writer are deployed and verified by an admin.
-- This migration does not rewrite order rows and does not read, upload, or delete
-- any Storage object.

begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'order-images',
  'order-images',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Drop the complete bucket-scoped production policy set atomically so the old
-- public/authenticated-wide rules cannot remain permissive beside replacements.
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
        coalesce(qual, '') ~ '''order-images'''
        or coalesce(with_check, '') ~ '''order-images'''
      )
  loop
    execute format('drop policy if exists %I on storage.objects', existing_policy.policyname);
  end loop;
end $$;

create policy "admins_read_order_images" on storage.objects
  for select to authenticated
  using (bucket_id = 'order-images' and (select public.is_admin()));
create policy "admins_upload_order_images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'order-images' and (select public.is_admin()));
create policy "admins_update_order_images" on storage.objects
  for update to authenticated
  using (bucket_id = 'order-images' and (select public.is_admin()))
  with check (bucket_id = 'order-images' and (select public.is_admin()));
create policy "admins_delete_order_images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'order-images' and (select public.is_admin()));

commit;
