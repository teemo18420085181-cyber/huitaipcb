import { describe, expect, it, vi } from 'vitest';
import type { ValidatedInquiryRequest } from './validation';
import {
  processInquiry,
  type InquiryDependencies,
  type PersistedInquiry,
} from './process';

function makeInput(fileCount = 1): ValidatedInquiryRequest {
  return {
    name: 'Buyer',
    email: 'buyer@example.com',
    company: 'Example Co',
    country: 'DE',
    phone: '+49 0000',
    message: 'Secret project brief',
    idempotencyKey: '11111111-1111-4111-8111-111111111111',
    acquisition: {
      landing_page: '/knowledge/example',
      page_path: '/contact',
      utm_source: 'google',
      ga_client_id: '123456.987654',
      ga_session_id: '1756684800',
    },
    files: Array.from({ length: fileCount }, (_, index) => ({
      file: new File(['x'], `board-${index}.zip`),
      extension: '.zip',
      safeName: `board-${index}.zip`,
    })),
  };
}

function persisted(overrides: Partial<PersistedInquiry> = {}): PersistedInquiry {
  return {
    id: 'inq-1',
    analyticsEventId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    filesStatus: 'pending',
    adminEmailStatus: 'pending',
    customerEmailStatus: 'pending',
    analyticsStatus: 'pending',
    analyticsRetryState: 'not_needed',
    ...overrides,
  };
}

function makeDeps(overrides: Partial<InquiryDependencies> = {}): InquiryDependencies {
  const row = persisted();
  return {
    repository: {
      insertInquiry: vi.fn().mockResolvedValue({ kind: 'inserted', inquiry: row }),
      updateFiles: vi.fn().mockResolvedValue({ ok: true }),
      updateAdminEmail: vi.fn().mockResolvedValue({ ok: true }),
      updateCustomerEmail: vi.fn().mockResolvedValue({ ok: true }),
      updateAnalytics: vi.fn().mockResolvedValue({ ok: true }),
    },
    storage: {
      upload: vi.fn().mockResolvedValue({ ok: true, path: 'inquiries/inq-1/file.zip' }),
      record: vi.fn().mockResolvedValue({ ok: true }),
    },
    email: {
      sendAdmin: vi.fn().mockResolvedValue({ status: 'sent', messageId: 'admin-1' }),
      sendCustomer: vi.fn().mockResolvedValue({ status: 'sent', messageId: 'customer-1' }),
    },
    analytics: {
      send: vi.fn().mockResolvedValue({ status: 'sent', retryState: 'not_needed' }),
    },
    createUuid: vi.fn().mockReturnValue(row.analyticsEventId),
    now: vi.fn().mockReturnValue(new Date('2026-09-01T00:00:00.000Z')),
    log: vi.fn(),
    ...overrides,
  };
}

describe('processInquiry', () => {
  it('persists one lead and attempts one canonical analytics event', async () => {
    const deps = makeDeps();
    const result = await processInquiry(makeInput(), deps);

    expect(deps.repository.insertInquiry).toHaveBeenCalledTimes(1);
    expect(deps.analytics.send).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      success: true,
      duplicate: false,
      filesStatus: 'saved',
      adminEmailStatus: 'sent',
      customerEmailStatus: 'sent',
      analyticsStatus: 'sent',
      warnings: [],
    });
  });

  it('does not run any side effect when the inquiry insert fails', async () => {
    const deps = makeDeps();
    vi.mocked(deps.repository.insertInquiry).mockResolvedValue({
      kind: 'error', code: 'database_insert_failed',
    });

    const result = await processInquiry(makeInput(), deps);

    expect(result).toEqual({ success: false, errorCode: 'database_insert_failed' });
    expect(deps.storage.upload).not.toHaveBeenCalled();
    expect(deps.email.sendAdmin).not.toHaveBeenCalled();
    expect(deps.email.sendCustomer).not.toHaveBeenCalled();
    expect(deps.analytics.send).not.toHaveBeenCalled();
  });

  it('returns a terminal duplicate as a completed saved result', async () => {
    const deps = makeDeps();
    vi.mocked(deps.repository.insertInquiry).mockResolvedValue({
      kind: 'duplicate',
      inquiry: persisted({
        filesStatus: 'saved',
        adminEmailStatus: 'sent',
        customerEmailStatus: 'sent',
        analyticsStatus: 'sent',
      }),
    });

    const result = await processInquiry(makeInput(), deps);

    expect(result).toMatchObject({
      success: true,
      duplicate: true,
      inquiryId: 'inq-1',
      processingIncomplete: false,
      requiresManualReview: false,
    });
    expect(deps.storage.upload).not.toHaveBeenCalled();
    expect(deps.email.sendAdmin).not.toHaveBeenCalled();
    expect(deps.email.sendCustomer).not.toHaveBeenCalled();
    expect(deps.analytics.send).not.toHaveBeenCalled();
  });

  it.each([
    ['files', { filesStatus: 'pending' as const }],
    ['administrator email', { adminEmailStatus: 'pending' as const }],
    ['customer email', { customerEmailStatus: 'pending' as const }],
    ['analytics', { analyticsStatus: 'pending' as const }],
  ])('marks a duplicate with pending %s state for manual review without replay', async (_, state) => {
    const deps = makeDeps();
    vi.mocked(deps.repository.insertInquiry).mockResolvedValue({
      kind: 'duplicate',
      inquiry: persisted({
        filesStatus: 'saved',
        adminEmailStatus: 'sent',
        customerEmailStatus: 'sent',
        analyticsStatus: 'sent',
        ...state,
      }),
    });

    const result = await processInquiry(makeInput(), deps);

    expect(result).toMatchObject({
      success: true,
      duplicate: true,
      inquiryId: 'inq-1',
      processingIncomplete: true,
      requiresManualReview: true,
      warnings: expect.arrayContaining([
        expect.objectContaining({ code: 'processing_incomplete' }),
      ]),
    });
    expect(deps.repository.insertInquiry).toHaveBeenCalledTimes(1);
    expect(deps.repository.updateFiles).not.toHaveBeenCalled();
    expect(deps.repository.updateAdminEmail).not.toHaveBeenCalled();
    expect(deps.repository.updateCustomerEmail).not.toHaveBeenCalled();
    expect(deps.repository.updateAnalytics).not.toHaveBeenCalled();
    expect(deps.storage.upload).not.toHaveBeenCalled();
    expect(deps.storage.record).not.toHaveBeenCalled();
    expect(deps.email.sendAdmin).not.toHaveBeenCalled();
    expect(deps.email.sendCustomer).not.toHaveBeenCalled();
    expect(deps.analytics.send).not.toHaveBeenCalled();
  });

  it('marks all-file storage failure and gives both emails the failed summary', async () => {
    const deps = makeDeps();
    vi.mocked(deps.storage.upload).mockResolvedValue({ ok: false, code: 'storage_upload_failed' });

    const result = await processInquiry(makeInput(), deps);

    expect(result).toMatchObject({
      success: true,
      filesStatus: 'failed',
      warnings: expect.arrayContaining([expect.objectContaining({ code: 'files_failed' })]),
    });
    expect(deps.email.sendAdmin).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ status: 'failed', expectedCount: 1, savedCount: 0 })
    );
    expect(deps.email.sendCustomer).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ status: 'failed', expectedCount: 1, savedCount: 0 })
    );
  });

  it('marks partial when an uploaded file cannot be recorded', async () => {
    const deps = makeDeps();
    vi.mocked(deps.storage.record)
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false, code: 'file_record_failed' });

    const result = await processInquiry(makeInput(2), deps);

    expect(result).toMatchObject({
      filesStatus: 'partial',
      warnings: expect.arrayContaining([expect.objectContaining({ code: 'files_partial' })]),
    });
    expect(deps.repository.updateFiles).toHaveBeenCalledWith(
      'inq-1',
      expect.objectContaining({ status: 'partial', savedCount: 1 })
    );
  });

  it('keeps administrator and customer email failures independent', async () => {
    const deps = makeDeps();
    vi.mocked(deps.email.sendAdmin).mockResolvedValue({
      status: 'failed', errorCode: 'resend_error',
    });
    vi.mocked(deps.email.sendCustomer).mockResolvedValue({
      status: 'sent', messageId: 'customer-1',
    });

    const result = await processInquiry(makeInput(0), deps);

    expect(result).toMatchObject({
      success: true,
      filesStatus: 'not_required',
      adminEmailStatus: 'failed',
      customerEmailStatus: 'sent',
      warnings: expect.arrayContaining([expect.objectContaining({ code: 'admin_email_failed' })]),
    });
  });

  it('does not invalidate the lead after an ambiguous analytics failure', async () => {
    const deps = makeDeps();
    vi.mocked(deps.analytics.send).mockResolvedValue({
      status: 'failed',
      retryState: 'manual_review',
      errorCode: 'ga_network_ambiguous',
    });

    const result = await processInquiry(makeInput(0), deps);

    expect(result).toMatchObject({
      success: true,
      analyticsStatus: 'failed',
      warnings: expect.arrayContaining([expect.objectContaining({ code: 'analytics_failed' })]),
    });
    expect(deps.repository.updateAnalytics).toHaveBeenCalledWith(
      'inq-1',
      expect.objectContaining({
        status: 'failed', retryState: 'manual_review', attemptCount: 1,
      })
    );
  });

  it('does not write PII or file names into structured logs', async () => {
    const deps = makeDeps();
    await processInquiry(makeInput(), deps);

    const logs = JSON.stringify(vi.mocked(deps.log).mock.calls);
    expect(logs).not.toContain('buyer@example.com');
    expect(logs).not.toContain('Secret project brief');
    expect(logs).not.toContain('board-0.zip');
    expect(logs).not.toContain('+49 0000');
  });
});
