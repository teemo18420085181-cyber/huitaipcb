import 'server-only';

import { createClient } from '@/lib/supabase/server';

export type AdminActionErrorCode =
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'INVALID_INPUT'
  | 'NOT_FOUND'
  | 'MUTATION_FAILED';

export class AdminActionError extends Error {
  constructor(public readonly code: AdminActionErrorCode) {
    super(code);
    this.name = 'AdminActionError';
  }
}

export async function requireAdmin() {
  let supabase: Awaited<ReturnType<typeof createClient>>;

  try {
    supabase = await createClient();
  } catch {
    throw new AdminActionError('MUTATION_FAILED');
  }

  let authData: Awaited<ReturnType<typeof supabase.auth.getUser>>['data'];
  let authError: Awaited<ReturnType<typeof supabase.auth.getUser>>['error'];
  try {
    const result = await supabase.auth.getUser();
    authData = result.data;
    authError = result.error;
  } catch {
    throw new AdminActionError('MUTATION_FAILED');
  }
  if (authError || !authData.user) {
    throw new AdminActionError('UNAUTHENTICATED');
  }

  let admin: { user_id: string; role: string } | null;
  let adminError: unknown;
  try {
    const result = await supabase
      .from('admin_users')
      .select('user_id, role')
      .eq('user_id', authData.user.id)
      .maybeSingle();
    admin = result.data as { user_id: string; role: string } | null;
    adminError = result.error;
  } catch {
    throw new AdminActionError('MUTATION_FAILED');
  }

  if (adminError) {
    throw new AdminActionError('MUTATION_FAILED');
  }
  if (!admin) {
    throw new AdminActionError('FORBIDDEN');
  }

  return { user: authData.user, admin, supabase };
}
