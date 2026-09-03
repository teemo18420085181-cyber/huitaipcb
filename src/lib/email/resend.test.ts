import { describe, expect, it, vi } from 'vitest';
import {
  renderInquiryConfirmationHtml,
  renderInquiryNotificationHtml,
  sendInquiryConfirmation,
} from './resend';

const partialFiles = {
  status: 'partial' as const,
  expectedCount: 2,
  savedCount: 1,
  savedFileNames: ['board.gbr'],
};

describe('inquiry email rendering', () => {
  it('escapes customer-controlled HTML while preserving Huitai PCB branding', () => {
    const html = renderInquiryNotificationHtml({
      name: '<script>alert(1)</script>',
      email: 'buyer@example.com',
      company: 'A&B "Boards"',
      message: '<b>secret</b>',
      inquiryId: 'inq-1',
      files: { status: 'not_required', expectedCount: 0, savedCount: 0, savedFileNames: [] },
    });

    expect(html).toContain('Huitai PCB');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('A&amp;B &quot;Boards&quot;');
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<b>secret</b>');
  });

  it('warns both administrator and customer when only some files were saved', () => {
    const adminHtml = renderInquiryNotificationHtml({
      name: 'Buyer',
      email: 'buyer@example.com',
      message: 'Quote request',
      inquiryId: 'inq-1',
      files: partialFiles,
    });
    const customerHtml = renderInquiryConfirmationHtml({
      customerName: 'Buyer',
      inquiryId: 'inq-1',
      files: partialFiles,
    });

    expect(adminHtml).toContain('1 / 2');
    expect(adminHtml).toContain('未完整保存');
    expect(customerHtml).toContain('1 of 2');
    expect(customerHtml).toContain('please resend');
    expect(customerHtml).not.toContain('all files were received');
  });

  it('states that no attachments were saved after complete file failure', () => {
    const html = renderInquiryConfirmationHtml({
      customerName: 'Buyer',
      inquiryId: 'inq-1',
      files: { status: 'failed', expectedCount: 2, savedCount: 0, savedFileNames: [] },
    });

    expect(html).toContain('could not save your 2 attachment');
    expect(html).toContain('please resend');
  });

  it('uses only the owner-approved response, quotation, and project-contact commitments', () => {
    const html = renderInquiryConfirmationHtml({
      customerName: 'Buyer',
      inquiryId: 'inq-1',
      files: { status: 'saved', expectedCount: 1, savedCount: 1, savedFileNames: ['board.zip'] },
    });

    expect(html).toContain('typically respond within <strong>1 business day</strong>');
    expect(html).toContain('Once the required files are complete, we can prepare a <strong>turnkey PCBA quotation</strong> covering PCB fabrication, component sourcing and assembly.');
    expect(html).toContain('a dedicated project contact who coordinates with our engineering and production teams throughout your project.');
    expect(html).not.toContain('24 hours');
    expect(html).not.toContain('full turnkey quote');
    expect(html).not.toContain('one dedicated project engineer');
  });
});

describe('Resend result handling', () => {
  it('uses the owner-approved response-time wording in the confirmation subject', async () => {
    const send = vi.fn().mockResolvedValue({
      data: { id: 'email-1' },
      error: null,
    });

    await sendInquiryConfirmation(
      'buyer@example.com',
      'Buyer',
      'inq-1',
      { status: 'saved', expectedCount: 1, savedCount: 1, savedFileNames: ['board.zip'] },
      { configured: true, send }
    );

    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'Thanks for your inquiry — we typically respond within 1 business day',
      }),
      expect.any(Object)
    );
  });

  it('maps a returned Resend error to failed without requiring an exception', async () => {
    const send = vi.fn().mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'rejected' },
    });

    const result = await sendInquiryConfirmation(
      'buyer@example.com',
      'Buyer',
      'inq-1',
      { status: 'saved', expectedCount: 1, savedCount: 1, savedFileNames: ['board.zip'] },
      { configured: true, send }
    );

    expect(result).toEqual({ status: 'failed', errorCode: 'resend_error' });
  });
});
