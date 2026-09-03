import { describe, expect, it, vi } from 'vitest';
import {
  clearIdempotencyKey,
  getOrCaptureAttribution,
  getOrCreateIdempotencyKey,
  resolveGaIdentifiers,
  sanitizeAcquisition,
} from './attribution';

class MemoryStorage {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

describe('sanitizeAcquisition', () => {
  it('stores path-only URLs and strips query, hash, and credentials', () => {
    expect(sanitizeAcquisition({
      page_path: '/contact?email=a%40b.com#rfq',
      landing_page: 'https://huitaipcb.com/turnkey-pcb-assembly?utm_source=google',
      referrer: 'https://user:pass@example.com/search?q=secret#x',
    })).toMatchObject({
      page_path: '/contact',
      landing_page: '/turnkey-pcb-assembly',
      referrer: 'https://example.com/search',
    });
  });

  it('drops unknown and PII-shaped values', () => {
    expect(sanitizeAcquisition({
      email: 'buyer@example.com',
      message: 'secret project',
      utm_source: 'buyer@example.com',
    })).toEqual({});
  });

  it('normalizes allowlisted campaign values and validates GA identifiers', () => {
    expect(sanitizeAcquisition({
      utm_source: '  google   ai  ',
      utm_medium: 'organic',
      utm_campaign: 'pcba-buyers_2026',
      ga_client_id: '123456789.987654321',
      ga_session_id: '1756684800',
    })).toEqual({
      utm_source: 'google ai',
      utm_medium: 'organic',
      utm_campaign: 'pcba-buyers_2026',
      ga_client_id: '123456789.987654321',
      ga_session_id: '1756684800',
    });

    expect(sanitizeAcquisition({
      ga_client_id: 'not-a-client-id',
      ga_session_id: 'session-1',
    })).toEqual({});
  });
});

describe('idempotency key lifecycle', () => {
  it('reuses one key until a saved inquiry clears it', () => {
    const storage = new MemoryStorage();
    const uuid = vi.fn()
      .mockReturnValueOnce('11111111-1111-4111-8111-111111111111')
      .mockReturnValueOnce('22222222-2222-4222-8222-222222222222');

    expect(getOrCreateIdempotencyKey(storage, uuid)).toBe(
      '11111111-1111-4111-8111-111111111111'
    );
    expect(getOrCreateIdempotencyKey(storage, uuid)).toBe(
      '11111111-1111-4111-8111-111111111111'
    );
    expect(uuid).toHaveBeenCalledTimes(1);

    clearIdempotencyKey(storage);

    expect(getOrCreateIdempotencyKey(storage, uuid)).toBe(
      '22222222-2222-4222-8222-222222222222'
    );
  });
});

describe('browser acquisition capture', () => {
  it('keeps first landing and UTM evidence while updating the submission path', () => {
    const storage = new MemoryStorage();
    const first = getOrCaptureAttribution(
      storage,
      'https://huitaipcb.com/knowledge/example?utm_source=google&utm_medium=organic',
      'https://www.google.com/search?q=pcba'
    );
    const second = getOrCaptureAttribution(
      storage,
      'https://huitaipcb.com/contact?draft=1',
      'https://huitaipcb.com/knowledge/example'
    );

    expect(first).toMatchObject({
      landing_page: '/knowledge/example',
      page_path: '/knowledge/example',
      utm_source: 'google',
      utm_medium: 'organic',
    });
    expect(second).toMatchObject({
      landing_page: '/knowledge/example',
      page_path: '/contact',
      utm_source: 'google',
      utm_medium: 'organic',
    });
  });

  it('resolves GA identifiers without exposing other fields', async () => {
    const gtag = vi.fn((command, id, field, callback) => {
      expect(command).toBe('get');
      expect(id).toBe('G-TEST');
      callback(field === 'client_id' ? '123.456' : '1756684800');
    });

    await expect(resolveGaIdentifiers('G-TEST', gtag, 50)).resolves.toEqual({
      ga_client_id: '123.456',
      ga_session_id: '1756684800',
    });
  });
});
