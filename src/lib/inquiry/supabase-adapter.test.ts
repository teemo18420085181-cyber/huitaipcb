import { describe, expect, it } from 'vitest';
import {
  createStoragePath,
  isUniqueViolation,
  mapPersistedInquiry,
} from './supabase-adapter';

describe('Supabase inquiry adapter helpers', () => {
  it('recognizes only the PostgreSQL unique-violation code', () => {
    expect(isUniqueViolation({ code: '23505' })).toBe(true);
    expect(isUniqueViolation({ code: '42501' })).toBe(false);
    expect(isUniqueViolation(null)).toBe(false);
  });

  it('maps persisted side-effect state without customer fields', () => {
    expect(mapPersistedInquiry({
      id: 'inq-1',
      analytics_event_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      files_status: 'partial',
      admin_email_status: 'sent',
      customer_email_status: 'failed',
      analytics_status: 'skipped_unconfigured',
      analytics_retry_state: 'safe',
    })).toEqual({
      id: 'inq-1',
      analyticsEventId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      filesStatus: 'partial',
      adminEmailStatus: 'sent',
      customerEmailStatus: 'failed',
      analyticsStatus: 'skipped_unconfigured',
      analyticsRetryState: 'safe',
    });
  });

  it('builds a deterministic private path from sanitized server inputs', () => {
    expect(createStoragePath('inq-1', 2, 'board_rev-a.zip', 1756684800000))
      .toBe('inquiries/inq-1/1756684800000_2_board_rev-a.zip');
  });
});
