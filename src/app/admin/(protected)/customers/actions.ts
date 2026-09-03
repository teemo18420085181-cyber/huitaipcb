'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/admin/require-admin';
import {
  assertMutationSucceeded,
  databaseUuid,
  formString,
  parseAdminInput,
} from '@/lib/admin/action-validation';

const deleteCustomerSchema = z.object({ id: databaseUuid });

export async function deleteCustomer(formData: FormData) {
  const { supabase } = await requireAdmin();
  const input = parseAdminInput(deleteCustomerSchema.safeParse({
    id: formString(formData, 'id'),
  }));

  const { error } = await supabase.from('customers').delete().eq('id', input.id);
  assertMutationSucceeded(error);
  revalidatePath('/admin/customers');
}
