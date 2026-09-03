import 'server-only';

import { redirect } from 'next/navigation';
import { AdminActionError, requireAdmin } from './require-admin';

export async function requireAdminPage() {
  try {
    return await requireAdmin();
  } catch (error) {
    if (
      error instanceof AdminActionError &&
      (error.code === 'UNAUTHENTICATED' || error.code === 'FORBIDDEN')
    ) {
      redirect('/admin/login');
    }
    throw error;
  }
}
