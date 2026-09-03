'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { AdminActionError, requireAdmin } from '@/lib/admin/require-admin';
import {
  assertMutationSucceeded,
  databaseUuid,
  formString,
  parseAdminInput,
} from '@/lib/admin/action-validation';
import { slugifyTitle } from '@/lib/content/article-utils';

const articleInputSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slugInput: z.string().trim().max(200),
  description: z.string().trim().max(160),
  content: z.string().trim().max(500_000),
  coverImage: z.string().trim().max(2_048),
  author: z.string().trim().max(120),
  readTime: z.coerce.number().finite().int().min(1).max(240),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().trim().max(64),
});
const articleIdSchema = z.object({ id: databaseUuid });

function getArticlePayload(formData: FormData) {
  const input = parseAdminInput(articleInputSchema.safeParse({
    title: formString(formData, 'title'),
    slugInput: formString(formData, 'slug'),
    description: formString(formData, 'description'),
    content: formString(formData, 'content'),
    coverImage: formString(formData, 'cover_image'),
    author: formString(formData, 'author'),
    readTime: formString(formData, 'read_time'),
    status: formString(formData, 'status'),
    publishedAt: formString(formData, 'published_at'),
  }));
  const slug = slugifyTitle(input.slugInput || input.title);
  if (!slug) {
    throw new AdminActionError('INVALID_INPUT');
  }
  const now = new Date().toISOString();

  return {
    title: input.title,
    slug,
    description: input.description || null,
    content: input.content || null,
    cover_image: input.coverImage || null,
    author: input.author || 'Huitai Engineering Team',
    read_time: input.readTime,
    status: input.status,
    published_at: input.status === 'published' ? (input.publishedAt || now) : null,
  };
}

export async function createArticle(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = getArticlePayload(formData);
  const { data, error } = await supabase
    .from('articles')
    .insert(payload)
    .select('id')
    .single();

  assertMutationSucceeded(error);
  if (!data?.id) throw new AdminActionError('MUTATION_FAILED');

  revalidatePath('/admin/knowledge');
  revalidatePath('/knowledge');
  revalidatePath('/sitemap.xml');
  redirect(`/admin/knowledge/${data.id}/edit`);
}

export async function updateArticle(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { id } = parseAdminInput(articleIdSchema.safeParse({ id: formString(formData, 'id') }));
  const payload = getArticlePayload(formData);
  const { error } = await supabase
    .from('articles')
    .update(payload)
    .eq('id', id);

  assertMutationSucceeded(error);

  revalidatePath('/admin/knowledge');
  revalidatePath(`/admin/knowledge/${id}/edit`);
  revalidatePath('/knowledge');
  revalidatePath(`/knowledge/${payload.slug}`);
  revalidatePath('/sitemap.xml');
  redirect(`/admin/knowledge/${id}/edit`);
}

export async function deleteArticle(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { id } = parseAdminInput(articleIdSchema.safeParse({ id: formString(formData, 'id') }));
  const { error } = await supabase.from('articles').delete().eq('id', id);
  assertMutationSucceeded(error);

  revalidatePath('/admin/knowledge');
  revalidatePath('/knowledge');
  revalidatePath('/sitemap.xml');
  redirect('/admin/knowledge');
}
