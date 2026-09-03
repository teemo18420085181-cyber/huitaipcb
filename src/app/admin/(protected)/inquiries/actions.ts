'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin/require-admin';
import {
  assertMutationSucceeded,
  databaseUuid,
  formString,
  parseAdminInput,
} from '@/lib/admin/action-validation';

const inquiryStatus = z.enum(['new', 'following', 'quoted', 'completed']);
const updateInquirySchema = z.object({
  id: databaseUuid,
  status: inquiryStatus,
  internalNotes: z.string().trim().max(10_000),
});
const archiveInquirySchema = z.object({ id: databaseUuid });

export async function updateInquiry(formData: FormData) {
  const { supabase } = await requireAdmin();
  const input = parseAdminInput(updateInquirySchema.safeParse({
    id: formString(formData, 'id'),
    status: formString(formData, 'status'),
    internalNotes: formString(formData, 'internal_notes'),
  }));
  const payload = {
    status: input.status,
    internal_notes: input.internalNotes || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('inquiries').update(payload).eq('id', input.id);

  if (error && input.status === 'following') {
    const { error: fallbackError } = await supabase
      .from('inquiries')
      .update({ ...payload, status: 'reviewing' })
      .eq('id', input.id);
    assertMutationSucceeded(fallbackError);
  } else {
    assertMutationSucceeded(error);
  }

  redirect(`/admin/inquiries/${input.id}`);
}

export async function archiveInquiry(formData: FormData) {
  const { supabase } = await requireAdmin();
  const input = parseAdminInput(archiveInquirySchema.safeParse({
    id: formString(formData, 'id'),
  }));

  const { error } = await supabase
    .from('inquiries')
    .update({ status: 'closed', updated_at: new Date().toISOString() })
    .eq('id', input.id);
  assertMutationSucceeded(error);
  redirect('/admin/inquiries');
}
