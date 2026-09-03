export const ORDER_IMAGE_BUCKET = 'order-images';
export const ORDER_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const ORDER_IMAGE_SIGNED_URL_TTL_SECONDS = 5 * 60;

const MIME_EXTENSION = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
} as const;

type OrderImageFile = {
  type: string;
  size: number;
};

type OrderImageStorageClient<TFile extends OrderImageFile> = {
  storage: {
    from: (bucket: string) => {
      upload: (
        path: string,
        file: TFile,
        options: { contentType: string; upsert: false }
      ) => Promise<{ error: unknown }>;
    };
  };
};

type OrderImageFileValidation =
  | { ok: true; extension: (typeof MIME_EXTENSION)[keyof typeof MIME_EXTENSION] }
  | { ok: false; reason: 'EMPTY_FILE' | 'FILE_TOO_LARGE' | 'UNSUPPORTED_TYPE' };

export type OrderImageReference =
  | { kind: 'object-path'; path: string }
  | { kind: 'external-url'; url: string };

export function validateOrderImageFile(file: OrderImageFile): OrderImageFileValidation {
  if (!Number.isSafeInteger(file.size) || file.size <= 0) {
    return { ok: false, reason: 'EMPTY_FILE' };
  }
  if (file.size > ORDER_IMAGE_MAX_BYTES) {
    return { ok: false, reason: 'FILE_TOO_LARGE' };
  }
  const extension = MIME_EXTENSION[file.type as keyof typeof MIME_EXTENSION];
  if (!extension) {
    return { ok: false, reason: 'UNSUPPORTED_TYPE' };
  }
  return { ok: true, extension };
}

export function createOrderImageObjectPath(file: OrderImageFile, objectId: string) {
  const validation = validateOrderImageFile(file);
  if (!validation.ok) throw new Error(validation.reason);
  if (!/^[A-Za-z0-9_-]+$/.test(objectId)) throw new Error('INVALID_OBJECT_ID');
  return `orders/${objectId}.${validation.extension}`;
}

export async function uploadOrderImage<TFile extends OrderImageFile>(
  client: OrderImageStorageClient<TFile>,
  file: TFile,
  objectId: string
) {
  const path = createOrderImageObjectPath(file, objectId);
  const { error } = await client.storage.from(ORDER_IMAGE_BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export function isOrderImageObjectPath(value: string) {
  if (!value || value.length > 1_024) return false;
  if (value.startsWith('/') || value.includes('\\') || value.includes('?') || value.includes('#')) return false;
  const segments = value.split('/');
  return segments.every((segment) => (
    segment.length > 0
    && segment === segment.trim()
    && segment !== '.'
    && segment !== '..'
    && !/[\u0000-\u001f\u007f]/.test(segment)
    && /^[A-Za-z0-9._ -]+$/.test(segment)
  ));
}

function expectedHttpsOrigin(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.origin : null;
  } catch {
    return null;
  }
}

export function parseOrderImageReference(
  value: unknown,
  expectedSupabaseUrl?: string
): OrderImageReference | null {
  if (typeof value !== 'string') return null;
  const reference = value.trim();
  if (!reference) return null;

  if (!reference.includes('://')) {
    return isOrderImageObjectPath(reference)
      ? { kind: 'object-path', path: reference }
      : null;
  }

  let url: URL;
  try {
    url = new URL(reference);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;

  const storageRoot = '/storage/v1/object/';
  if (!url.pathname.startsWith(storageRoot)) {
    return { kind: 'external-url', url: reference };
  }

  const expectedOrigin = expectedHttpsOrigin(expectedSupabaseUrl);
  if (
    !expectedOrigin
    || url.origin !== expectedOrigin
    || url.username
    || url.password
    || url.search
    || url.hash
  ) return null;

  const storagePrefix = `${storageRoot}public/`;
  if (!url.pathname.startsWith(storagePrefix)) return null;

  const bucketAndPath = url.pathname.slice(storagePrefix.length);
  const separator = bucketAndPath.indexOf('/');
  if (separator < 0 || bucketAndPath.slice(0, separator) !== ORDER_IMAGE_BUCKET) return null;

  try {
    const path = decodeURIComponent(bucketAndPath.slice(separator + 1));
    return isOrderImageObjectPath(path) ? { kind: 'object-path', path } : null;
  } catch {
    return null;
  }
}
