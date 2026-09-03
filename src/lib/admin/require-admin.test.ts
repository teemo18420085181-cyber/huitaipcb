import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}));

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from './require-admin';

const createClientMock = vi.mocked(createClient);

type ClientFixture = {
  user?: { id: string; email?: string } | null;
  authError?: { message: string } | null;
  authReject?: Error | null;
  admin?: { user_id: string; role: string } | null;
  lookupError?: { message: string } | null;
  lookupReject?: Error | null;
};

function makeClient({
  user = null,
  authError = null,
  authReject = null,
  admin = null,
  lookupError = null,
  lookupReject = null,
}: ClientFixture) {
  const maybeSingle = lookupReject
    ? vi.fn().mockRejectedValue(lookupReject)
    : vi.fn().mockResolvedValue({ data: admin, error: lookupError });
  const eq = vi.fn().mockReturnValue({ maybeSingle });
  const select = vi.fn().mockReturnValue({ eq });
  const from = vi.fn().mockReturnValue({ select });

  return {
    auth: {
      getUser: authReject
        ? vi.fn().mockRejectedValue(authReject)
        : vi.fn().mockResolvedValue({ data: { user }, error: authError }),
    },
    from,
    spies: { from, select, eq, maybeSingle },
  };
}

describe('requireAdmin', () => {
  beforeEach(() => {
    createClientMock.mockReset();
  });

  it('rejects a request without a verified Supabase user as UNAUTHENTICATED', async () => {
    const client = makeClient({ user: null });
    createClientMock.mockResolvedValue(client as never);

    await expect(requireAdmin()).rejects.toMatchObject({
      code: 'UNAUTHENTICATED',
    });
    expect(client.spies.from).not.toHaveBeenCalled();
  });

  it('fails closed without exposing a thrown auth.getUser error', async () => {
    const client = makeClient({
      authReject: new Error('cookie and provider internals'),
    });
    createClientMock.mockResolvedValue(client as never);

    await expect(requireAdmin()).rejects.toMatchObject({
      code: 'MUTATION_FAILED',
      message: 'MUTATION_FAILED',
    });
    expect(client.spies.from).not.toHaveBeenCalled();
  });

  it('rejects an authenticated user without an admin_users row as FORBIDDEN', async () => {
    const user = { id: '34e775f6-1494-44fe-9483-3f459599bced' };
    const client = makeClient({ user, admin: null });
    createClientMock.mockResolvedValue(client as never);

    await expect(requireAdmin()).rejects.toMatchObject({
      code: 'FORBIDDEN',
    });
    expect(client.spies.eq).toHaveBeenCalledWith('user_id', user.id);
  });

  it('returns the verified user and same authenticated client for an admin_users member', async () => {
    const user = { id: '6cf3b358-1466-4e75-ab91-abba912b26c9', email: 'admin@example.test' };
    const admin = { user_id: user.id, role: 'admin' };
    const client = makeClient({ user, admin });
    createClientMock.mockResolvedValue(client as never);

    await expect(requireAdmin()).resolves.toMatchObject({ user, admin, supabase: client });
  });

  it('fails closed when the admin_users lookup errors', async () => {
    const user = { id: '0dd474b8-daf2-41df-86a4-8a8f98c339d9' };
    const client = makeClient({
      user,
      lookupError: { message: 'database unavailable' },
    });
    createClientMock.mockResolvedValue(client as never);

    await expect(requireAdmin()).rejects.toMatchObject({
      code: 'MUTATION_FAILED',
    });
  });

  it('fails closed without exposing a thrown admin_users lookup error', async () => {
    const user = { id: '8d91e780-a0f1-46b6-b2a6-38d27f1829f6' };
    const client = makeClient({
      user,
      lookupReject: new Error('connection string and table details'),
    });
    createClientMock.mockResolvedValue(client as never);

    await expect(requireAdmin()).rejects.toMatchObject({
      code: 'MUTATION_FAILED',
      message: 'MUTATION_FAILED',
    });
  });
});
