import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
}));

vi.mock('@/lib/admin/require-admin', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/admin/require-admin')>();
  return { ...original, requireAdmin: mocks.requireAdmin };
});

import { AdminActionError } from '@/lib/admin/require-admin';
import {
  ORDER_IMAGE_BUCKET,
  ORDER_IMAGE_MAX_BYTES,
  createOrderImageObjectPath,
  parseOrderImageReference,
  uploadOrderImage,
  validateOrderImageFile,
} from './order-image-model';
import { getOrderImageDisplayUrls } from './order-images';

const SUPABASE_ORIGIN = 'https://project.example.test';

function createStorageDouble() {
  const createSignedUrl = vi.fn(async (path: string, expiresIn: number) => ({
    data: { signedUrl: `https://signed.example.test/${path}?ttl=${expiresIn}` },
    error: null,
  }));
  const storageFrom = vi.fn(() => ({ createSignedUrl }));
  const databaseFrom = vi.fn();
  const supabase = {
    storage: { from: storageFrom },
    from: databaseFrom,
  };
  return { supabase, storageFrom, createSignedUrl, databaseFrom };
}

describe('order image upload model', () => {
  it('accepts only the three configured raster MIME types within five MiB', () => {
    expect(validateOrderImageFile({ type: 'image/jpeg', size: ORDER_IMAGE_MAX_BYTES })).toEqual({ ok: true, extension: 'jpg' });
    expect(validateOrderImageFile({ type: 'image/png', size: 1024 })).toEqual({ ok: true, extension: 'png' });
    expect(validateOrderImageFile({ type: 'image/webp', size: 1024 })).toEqual({ ok: true, extension: 'webp' });
    expect(validateOrderImageFile({ type: 'image/svg+xml', size: 1024 })).toEqual({ ok: false, reason: 'UNSUPPORTED_TYPE' });
    expect(validateOrderImageFile({ type: 'image/png', size: ORDER_IMAGE_MAX_BYTES + 1 })).toEqual({ ok: false, reason: 'FILE_TOO_LARGE' });
  });

  it('builds a safe private object path rather than a URL', () => {
    expect(createOrderImageObjectPath(
      { type: 'image/webp', size: 1024 },
      '4bdb4bea-06d2-4c44-ae2e-39e1214642a6'
    )).toBe('orders/4bdb4bea-06d2-4c44-ae2e-39e1214642a6.webp');
  });

  it('uploads to only order-images and returns the persisted object path', async () => {
    const upload = vi.fn().mockResolvedValue({ data: { path: 'ignored-by-contract' }, error: null });
    const storageFrom = vi.fn(() => ({ upload }));
    const file = { type: 'image/png', size: 2048 };

    await expect(uploadOrderImage(
      { storage: { from: storageFrom } },
      file,
      '4bdb4bea-06d2-4c44-ae2e-39e1214642a6'
    )).resolves.toBe('orders/4bdb4bea-06d2-4c44-ae2e-39e1214642a6.png');

    expect(storageFrom).toHaveBeenCalledWith(ORDER_IMAGE_BUCKET);
    expect(upload).toHaveBeenCalledWith(
      'orders/4bdb4bea-06d2-4c44-ae2e-39e1214642a6.png',
      file,
      { contentType: 'image/png', upsert: false }
    );
  });

  it('does not call Storage when the selected file violates the bucket contract', async () => {
    const storageFrom = vi.fn();

    await expect(uploadOrderImage(
      { storage: { from: storageFrom } },
      { type: 'image/svg+xml', size: 2048 },
      '4bdb4bea-06d2-4c44-ae2e-39e1214642a6'
    )).rejects.toThrow('UNSUPPORTED_TYPE');

    expect(storageFrom).not.toHaveBeenCalled();
  });
});

describe('order image reference compatibility', () => {
  it('reads a new object path as a signable order-images key', () => {
    expect(parseOrderImageReference('orders/2026/board.webp', SUPABASE_ORIGIN)).toEqual({
      kind: 'object-path',
      path: 'orders/2026/board.webp',
    });
  });

  it('extracts the object key from a legacy Supabase public order-images URL', () => {
    expect(parseOrderImageReference(
      'https://project.example.test/storage/v1/object/public/order-images/orders%2F2026%2Fboard.webp',
      SUPABASE_ORIGIN
    )).toEqual({
      kind: 'object-path',
      path: 'orders/2026/board.webp',
    });
  });

  it('decodes a nested legacy filename only after confirming the current project origin', () => {
    expect(parseOrderImageReference(
      'https://project.example.test/storage/v1/object/public/order-images/orders%2F2026%2Fboard%20rev.webp',
      `${SUPABASE_ORIGIN}/`
    )).toEqual({
      kind: 'object-path',
      path: 'orders/2026/board rev.webp',
    });
  });

  it('keeps an external legacy HTTPS image renderable without treating it as Storage', () => {
    const url = 'https://cdn.example.test/legacy/board.jpg';
    expect(parseOrderImageReference(url, SUPABASE_ORIGIN)).toEqual({ kind: 'external-url', url });
  });

  it.each([
    '../secret.webp',
    '/absolute.webp',
    'orders\\secret.webp',
    'orders/board.webp?download=1',
    'https://project.example.test/storage/v1/object/public/library-files/secret.webp',
    'https://other-project.example.test/storage/v1/object/public/order-images/orders/board.webp',
    'https://user:password@project.example.test/storage/v1/object/public/order-images/orders/board.webp',
    'http://project.example.test/storage/v1/object/public/order-images/orders/board.webp',
    'data:image/png;base64,abc',
    'file:///orders/board.webp',
    'javascript:alert(1)',
    'https://project.example.test/storage/v1/object/public/order-images/',
    'https://project.example.test/storage/v1/object/public/order-images',
    'https://project.example.test/storage/v1/object/public/order-images/orders%2F..%2Fsecret.webp',
    'https://project.example.test/storage/v1/object/public/order-images/orders%252F..%252Fsecret.webp',
    'https://project.example.test/storage/v1/object/public/order-images/orders%2Fbad%ZZ.webp',
    'https://project.example.test/storage/v1/object/public/order-images/orders%2F%20%2Fboard.webp',
    'https://project.example.test/storage/v1/object/public/order-images/orders/board.webp?token=other-project',
    'https://project.example.test/storage/v1/object/public/order-images/orders/board.webp#other-project',
  ])('rejects an invalid or non-order-images reference: %s', (reference) => {
    expect(parseOrderImageReference(reference, SUPABASE_ORIGIN)).toBeNull();
  });

  it('fails closed for a Supabase Storage URL when the expected project origin is unavailable', () => {
    expect(parseOrderImageReference(
      'https://project.example.test/storage/v1/object/public/order-images/orders/board.webp'
    )).toBeNull();
  });
});

describe('admin order image signing', () => {
  beforeEach(() => {
    mocks.requireAdmin.mockReset();
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', SUPABASE_ORIGIN);
  });

  it.each(['UNAUTHENTICATED', 'FORBIDDEN'] as const)(
    'does not request a signed URL for a %s caller',
    async (code) => {
      const storage = createStorageDouble();
      mocks.requireAdmin.mockRejectedValue(new AdminActionError(code));

      await expect(getOrderImageDisplayUrls(['orders/board.webp'])).rejects.toMatchObject({ code });
      expect(storage.storageFrom).not.toHaveBeenCalled();
    }
  );

  it('uses only the order-images bucket and a short-lived URL for an admin', async () => {
    const storage = createStorageDouble();
    mocks.requireAdmin.mockResolvedValue({ supabase: storage.supabase });

    await expect(getOrderImageDisplayUrls(['orders/board.webp'])).resolves.toEqual([
      'https://signed.example.test/orders/board.webp?ttl=300',
    ]);

    expect(storage.storageFrom).toHaveBeenCalledTimes(1);
    expect(storage.storageFrom).toHaveBeenCalledWith(ORDER_IMAGE_BUCKET);
    expect(storage.createSignedUrl).toHaveBeenCalledWith('orders/board.webp', 300);
  });

  it('does not sign an invalid path or touch the orders table', async () => {
    const storage = createStorageDouble();
    mocks.requireAdmin.mockResolvedValue({ supabase: storage.supabase });

    await expect(getOrderImageDisplayUrls([
      '../secret.webp',
      'https://cdn.example.test/legacy/board.jpg',
    ])).resolves.toEqual(['https://cdn.example.test/legacy/board.jpg']);

    expect(storage.createSignedUrl).not.toHaveBeenCalled();
    expect(storage.databaseFrom).not.toHaveBeenCalled();
  });

  it('signs a legacy public bucket URL without rewriting its database value', async () => {
    const storage = createStorageDouble();
    mocks.requireAdmin.mockResolvedValue({ supabase: storage.supabase });
    const legacyUrl = 'https://project.example.test/storage/v1/object/public/order-images/orders%2Flegacy.webp';

    await expect(getOrderImageDisplayUrls([legacyUrl])).resolves.toEqual([
      'https://signed.example.test/orders/legacy.webp?ttl=300',
    ]);

    expect(storage.createSignedUrl).toHaveBeenCalledWith('orders/legacy.webp', 300);
    expect(storage.databaseFrom).not.toHaveBeenCalled();
  });

  it('does not sign a legacy Storage URL from another Supabase project', async () => {
    const storage = createStorageDouble();
    mocks.requireAdmin.mockResolvedValue({ supabase: storage.supabase });

    await expect(getOrderImageDisplayUrls([
      'https://other-project.example.test/storage/v1/object/public/order-images/orders/legacy.webp',
    ])).resolves.toEqual([]);

    expect(storage.createSignedUrl).not.toHaveBeenCalled();
    expect(storage.databaseFrom).not.toHaveBeenCalled();
  });
});
