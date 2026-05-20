-- Safe repeatable setup for Knowledge article image uploads.
-- This only creates/updates the public article-images bucket and its storage policies.
-- It does not touch the articles table or any existing article data.

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
