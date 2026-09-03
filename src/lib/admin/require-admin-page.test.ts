import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('@/lib/admin/require-admin', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/admin/require-admin')>();
  return { ...original, requireAdmin: mocks.requireAdmin };
});
vi.mock('next/navigation', () => ({ redirect: mocks.redirect }));

import { AdminActionError } from './require-admin';
import { requireAdminPage } from './require-admin-page';

describe('requireAdminPage', () => {
  beforeEach(() => {
    mocks.requireAdmin.mockReset();
    mocks.redirect.mockReset();
    mocks.redirect.mockImplementation(() => {
      throw new Error('NEXT_REDIRECT');
    });
  });

  it.each(['UNAUTHENTICATED', 'FORBIDDEN'] as const)(
    'redirects %s page reads to the admin login',
    async (code) => {
      mocks.requireAdmin.mockRejectedValue(new AdminActionError(code));

      await expect(requireAdminPage()).rejects.toThrow('NEXT_REDIRECT');
      expect(mocks.redirect).toHaveBeenCalledWith('/admin/login');
    }
  );

  it('returns the verified admin context', async () => {
    const context = { user: { id: 'admin-id' }, admin: { role: 'admin' }, supabase: {} };
    mocks.requireAdmin.mockResolvedValue(context);

    await expect(requireAdminPage()).resolves.toBe(context);
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  it('keeps an authorization backend failure closed instead of redirecting', async () => {
    const error = new AdminActionError('MUTATION_FAILED');
    mocks.requireAdmin.mockRejectedValue(error);

    await expect(requireAdminPage()).rejects.toBe(error);
    expect(mocks.redirect).not.toHaveBeenCalled();
  });
});
