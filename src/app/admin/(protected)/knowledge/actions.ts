'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { slugifyTitle, type ArticleStatus } from '@/lib/content/article-utils';

function cleanStatus(value: FormDataEntryValue | null): ArticleStatus {
  return value === 'published' ? 'published' : 'draft';
}

function cleanReadTime(value: FormDataEntryValue | null) {
  const readTime = Number(value || 5);
  if (!Number.isFinite(readTime) || readTime <= 0) return 5;
  return Math.round(readTime);
}

function getArticlePayload(formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  const slug = slugifyTitle(String(formData.get('slug') || title));
  const status = cleanStatus(formData.get('status'));
  const now = new Date().toISOString();
  const publishedAtInput = String(formData.get('published_at') || '').trim();

  return {
    title,
    slug,
    description: String(formData.get('description') || '').trim() || null,
    content: String(formData.get('content') || '').trim() || null,
    cover_image: String(formData.get('cover_image') || '').trim() || null,
    author: String(formData.get('author') || '').trim() || 'Huitai Engineering Team',
    read_time: cleanReadTime(formData.get('read_time')),
    status,
    published_at: status === 'published' ? (publishedAtInput || now) : null,
  };
}

export async function createArticle(formData: FormData) {
  const payload = getArticlePayload(formData);
  if (!payload.title || !payload.slug) return;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/knowledge');
  revalidatePath('/knowledge');
  revalidatePath('/sitemap.xml');
  redirect(`/admin/knowledge/${data.id}/edit`);
}

export async function updateArticle(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;

  const payload = getArticlePayload(formData);
  if (!payload.title || !payload.slug) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from('articles')
    .update(payload)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/knowledge');
  revalidatePath(`/admin/knowledge/${id}/edit`);
  revalidatePath('/knowledge');
  revalidatePath(`/knowledge/${payload.slug}`);
  revalidatePath('/sitemap.xml');
  redirect(`/admin/knowledge/${id}/edit`);
}

export async function deleteArticle(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase.from('articles').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin/knowledge');
  revalidatePath('/knowledge');
  revalidatePath('/sitemap.xml');
  redirect('/admin/knowledge');
}
