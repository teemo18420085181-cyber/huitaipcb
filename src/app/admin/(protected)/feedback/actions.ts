'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin/require-admin';
import {
  assertMutationSucceeded,
  databaseUuid,
  formString,
  parseAdminInput,
} from '@/lib/admin/action-validation';

const togglePublishSchema = z.object({
  id: databaseUuid,
  isPublished: z.enum(['true', 'false']).transform((value) => value === 'true'),
  adminResponse: z.string().trim().max(5_000),
});

const deleteFeedbackSchema = z.object({ id: databaseUuid });

export async function togglePublish(formData: FormData) {
  const { supabase } = await requireAdmin();
  const input = parseAdminInput(togglePublishSchema.safeParse({
    id: formString(formData, 'id'),
    isPublished: formString(formData, 'is_published'),
    adminResponse: formString(formData, 'admin_response'),
  }));

  const { error } = await supabase
    .from('feedback_messages')
    .update({
      is_published: !input.isPublished,
      admin_response: input.adminResponse || null,
      published_at: !input.isPublished ? new Date().toISOString() : null,
    })
    .eq('id', input.id);
  assertMutationSucceeded(error);
  redirect('/admin/feedback');
}

export async function deleteFeedback(formData: FormData) {
  const { supabase } = await requireAdmin();
  const input = parseAdminInput(deleteFeedbackSchema.safeParse({
    id: formString(formData, 'id'),
  }));

  const { error } = await supabase.from('feedback_messages').delete().eq('id', input.id);
  assertMutationSucceeded(error);
  revalidatePath('/admin/feedback');
}
