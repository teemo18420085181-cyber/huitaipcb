import 'server-only';

import { z } from 'zod';
import { AdminActionError } from './require-admin';

export const databaseUuid = z.string().uuid();

export function formString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
}

export function parseAdminInput<T>(result: z.SafeParseReturnType<unknown, T>): T {
  if (!result.success) {
    throw new AdminActionError('INVALID_INPUT');
  }
  return result.data;
}

export function assertMutationSucceeded(error: unknown) {
  if (error) {
    throw new AdminActionError('MUTATION_FAILED');
  }
}
