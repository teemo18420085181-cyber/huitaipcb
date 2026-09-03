import type { AcquisitionData } from '@/lib/inquiry/types';

const IDEMPOTENCY_STORAGE_KEY = 'huitai_inquiry_idempotency_key';
const ATTRIBUTION_STORAGE_KEY = 'huitai_inquiry_attribution';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const GA_CLIENT_ID_PATTERN = /^\d{1,20}\.\d{1,20}$/;
const GA_SESSION_ID_PATTERN = /^\d{1,20}$/;
const CAMPAIGN_VALUE_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N} .,_+:/-]*$/u;

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object'
    ? value as Record<string, unknown>
    : {};
}

function sanitizePath(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  try {
    const trimmed = value.trim();
    const absolute = /^[a-z][a-z\d+.-]*:/i.test(trimmed);
    if (absolute && !/^https?:/i.test(trimmed)) return undefined;
    const url = new URL(trimmed, 'https://huitaipcb.invalid');
    return url.pathname.startsWith('/') ? url.pathname.slice(0, 500) : undefined;
  } catch {
    return undefined;
  }
}

function sanitizeReferrer(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
    return `${url.origin}${url.pathname}`.slice(0, 500);
  } catch {
    return undefined;
  }
}

function sanitizeCampaignValue(
  value: unknown,
  maxLength: number
): string | undefined {
  if (typeof value !== 'string') return undefined;
  const normalized = value.trim().replace(/\s+/g, ' ');
  if (!normalized || normalized.length > maxLength) return undefined;
  if (!CAMPAIGN_VALUE_PATTERN.test(normalized)) return undefined;
  return normalized;
}

function assignIfPresent<K extends keyof AcquisitionData>(
  target: AcquisitionData,
  key: K,
  value: AcquisitionData[K] | undefined
) {
  if (value !== undefined) target[key] = value;
}

export function sanitizeAcquisition(input: unknown): AcquisitionData {
  const source = asRecord(input);
  const result: AcquisitionData = {};

  assignIfPresent(result, 'page_path', sanitizePath(source.page_path));
  assignIfPresent(result, 'landing_page', sanitizePath(source.landing_page));
  assignIfPresent(result, 'referrer', sanitizeReferrer(source.referrer));
  assignIfPresent(result, 'utm_source', sanitizeCampaignValue(source.utm_source, 100));
  assignIfPresent(result, 'utm_medium', sanitizeCampaignValue(source.utm_medium, 100));
  assignIfPresent(result, 'utm_campaign', sanitizeCampaignValue(source.utm_campaign, 200));
  assignIfPresent(result, 'utm_term', sanitizeCampaignValue(source.utm_term, 200));
  assignIfPresent(result, 'utm_content', sanitizeCampaignValue(source.utm_content, 200));

  if (typeof source.ga_client_id === 'string'
    && GA_CLIENT_ID_PATTERN.test(source.ga_client_id)) {
    result.ga_client_id = source.ga_client_id;
  }
  if (typeof source.ga_session_id === 'string'
    && GA_SESSION_ID_PATTERN.test(source.ga_session_id)) {
    result.ga_session_id = source.ga_session_id;
  }

  return result;
}

export function getOrCreateIdempotencyKey(
  storage: StorageLike,
  createUuid: () => string = () => crypto.randomUUID()
): string {
  const existing = storage.getItem(IDEMPOTENCY_STORAGE_KEY);
  if (existing && UUID_PATTERN.test(existing)) return existing;

  const created = createUuid();
  storage.setItem(IDEMPOTENCY_STORAGE_KEY, created);
  return created;
}

export function clearIdempotencyKey(storage: StorageLike): void {
  storage.removeItem(IDEMPOTENCY_STORAGE_KEY);
}

export function getOrCaptureAttribution(
  storage: StorageLike,
  currentUrl: string,
  referrer: string
): AcquisitionData {
  let current: URL;
  try {
    current = new URL(currentUrl);
  } catch {
    return {};
  }

  let stored: AcquisitionData | undefined;
  const storedValue = storage.getItem(ATTRIBUTION_STORAGE_KEY);
  if (storedValue) {
    try {
      stored = sanitizeAcquisition(JSON.parse(storedValue));
    } catch {
      storage.removeItem(ATTRIBUTION_STORAGE_KEY);
    }
  }

  if (!stored) {
    const params = current.searchParams;
    stored = sanitizeAcquisition({
      landing_page: current.pathname,
      referrer,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content'),
    });
    storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(stored));
  }

  return sanitizeAcquisition({
    ...stored,
    page_path: current.pathname,
  });
}

export type GtagGetter = (
  command: 'get',
  measurementId: string,
  fieldName: 'client_id' | 'session_id',
  callback: (value: unknown) => void
) => void;

function resolveGtagField(
  gtag: GtagGetter,
  measurementId: string,
  fieldName: 'client_id' | 'session_id',
  timeoutMs: number
): Promise<unknown> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value?: unknown) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const timer = setTimeout(() => finish(), timeoutMs);
    try {
      gtag('get', measurementId, fieldName, finish);
    } catch {
      finish();
    }
  });
}

export async function resolveGaIdentifiers(
  measurementId: string | undefined,
  gtag: GtagGetter | undefined,
  timeoutMs = 250
): Promise<Pick<AcquisitionData, 'ga_client_id' | 'ga_session_id'>> {
  if (!measurementId || !gtag) return {};

  const [clientId, sessionId] = await Promise.all([
    resolveGtagField(gtag, measurementId, 'client_id', timeoutMs),
    resolveGtagField(gtag, measurementId, 'session_id', timeoutMs),
  ]);
  const sanitized = sanitizeAcquisition({
    ga_client_id: clientId,
    ga_session_id: sessionId,
  });
  return {
    ...(sanitized.ga_client_id ? { ga_client_id: sanitized.ga_client_id } : {}),
    ...(sanitized.ga_session_id ? { ga_session_id: sanitized.ga_session_id } : {}),
  };
}
