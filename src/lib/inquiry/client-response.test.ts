import { describe, expect, it } from 'vitest';
import {
  getInquirySuccessCopy,
  isSuccessfulInquiryResponse,
  shouldClearIdempotencyKey,
} from './client-response';

const base = {
  success: true as const,
  inquiryId: 'inq-1',
  duplicate: false,
  processingIncomplete: false,
  requiresManualReview: false,
  filesStatus: 'saved' as const,
  adminEmailStatus: 'sent' as const,
  customerEmailStatus: 'sent' as const,
  analyticsStatus: 'sent' as const,
  warnings: [],
};

describe('getInquirySuccessCopy', () => {
  it('does not promise an email when customer delivery failed', () => {
    const copy = getInquirySuccessCopy({
      ...base,
      customerEmailStatus: 'failed',
      warnings: [{ code: 'customer_email_failed', message: 'No confirmation email was sent.' }],
    }, 'en');

    expect(copy.body.toLowerCase()).not.toContain('email is on its way');
    expect(copy.warnings).toContain('No confirmation email was sent.');
  });

  it('surfaces a partial-file warning after the inquiry is saved', () => {
    const copy = getInquirySuccessCopy({
      ...base,
      filesStatus: 'partial',
      warnings: [{ code: 'files_partial', message: 'Please resend missing files.' }],
    }, 'en');

    expect(copy.body).toContain('inquiry was saved');
    expect(copy.warnings).toContain('Please resend missing files.');
  });

  it('uses the owner-approved response-time wording after confirmation email delivery', () => {
    const copy = getInquirySuccessCopy(base, 'en');

    expect(copy.body).toContain('typically respond within 1 business day');
    expect(copy.body).not.toContain('within 24 hours');
  });

  it('uses localized German saved-inquiry copy', () => {
    const copy = getInquirySuccessCopy(base, 'de');
    expect(copy.title).toBe('Vielen Dank!');
    expect(copy.body).toContain('gespeichert');
  });

  it('does not present an incomplete duplicate as fully processed', () => {
    const copy = getInquirySuccessCopy({
      ...base,
      duplicate: true,
      processingIncomplete: true,
      requiresManualReview: true,
      analyticsStatus: 'pending',
      warnings: [{
        code: 'processing_incomplete',
        message: 'Your inquiry has already been saved, but some delivery steps are still being verified.',
      }],
    }, 'en');

    expect(copy.title).toBe('Inquiry saved — verification pending');
    expect(copy.body).toContain('already been saved');
    expect(copy.body).toContain('still being verified');
    expect(copy.body).not.toContain('confirmation email was sent');
  });
});

describe('isSuccessfulInquiryResponse', () => {
  it('accepts the release-gate contract and rejects old or generic 200 bodies', () => {
    const oldContract: Record<string, unknown> = { ...base };
    delete oldContract.processingIncomplete;
    delete oldContract.requiresManualReview;

    expect(isSuccessfulInquiryResponse(base)).toBe(true);
    expect(isSuccessfulInquiryResponse(oldContract)).toBe(false);
    expect(isSuccessfulInquiryResponse({ success: true })).toBe(false);
  });
});

describe('shouldClearIdempotencyKey', () => {
  it('clears a terminal result but retains the key for incomplete processing', () => {
    expect(shouldClearIdempotencyKey(base)).toBe(true);
    expect(shouldClearIdempotencyKey({
      ...base,
      duplicate: true,
      processingIncomplete: true,
      requiresManualReview: true,
      analyticsStatus: 'pending',
    })).toBe(false);
  });
});
