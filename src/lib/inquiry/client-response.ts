import type { InquiryProcessResult } from './process';
import { isInquiryWarningCode } from './types';

export type InquiryFormLocale = 'en' | 'de';
export type SuccessfulInquiry = Extract<InquiryProcessResult, { success: true }>;

export interface InquirySuccessCopy {
  title: string;
  body: string;
  warnings: string[];
}

export function isSuccessfulInquiryResponse(value: unknown): value is SuccessfulInquiry {
  if (!value || typeof value !== 'object') return false;
  const response = value as Record<string, unknown>;
  const filesStatuses = ['not_required', 'pending', 'saved', 'partial', 'failed'];
  const deliveryStatuses = ['pending', 'sent', 'failed', 'skipped_unconfigured'];
  if (response.success !== true
    || typeof response.inquiryId !== 'string'
    || typeof response.duplicate !== 'boolean'
    || typeof response.processingIncomplete !== 'boolean'
    || typeof response.requiresManualReview !== 'boolean'
    || response.processingIncomplete !== response.requiresManualReview
    || !filesStatuses.includes(String(response.filesStatus))
    || !deliveryStatuses.includes(String(response.adminEmailStatus))
    || !deliveryStatuses.includes(String(response.customerEmailStatus))
    || !deliveryStatuses.includes(String(response.analyticsStatus))
    || !Array.isArray(response.warnings)) {
    return false;
  }

  const hasPendingStatus = [
    response.filesStatus,
    response.adminEmailStatus,
    response.customerEmailStatus,
    response.analyticsStatus,
  ].includes('pending');
  if (hasPendingStatus && response.processingIncomplete !== true) return false;

  return response.warnings.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const candidate = item as Record<string, unknown>;
    return typeof candidate.code === 'string'
      && isInquiryWarningCode(candidate.code)
      && typeof candidate.message === 'string';
  });
}

export function shouldClearIdempotencyKey(result: SuccessfulInquiry): boolean {
  return !result.processingIncomplete;
}

export function getInquirySuccessCopy(
  result: SuccessfulInquiry,
  locale: InquiryFormLocale
): InquirySuccessCopy {
  if (result.processingIncomplete) {
    const warnings = result.warnings
      .filter((item) => item.code !== 'processing_incomplete')
      .map((item) => item.message);
    if (locale === 'de') {
      return {
        title: 'Anfrage gespeichert — Prüfung läuft',
        body: 'Ihre Anfrage wurde bereits gespeichert, aber einige Übertragungsschritte werden noch geprüft. Es wurde keine zweite Anfrage erstellt.',
        warnings,
      };
    }
    return {
      title: 'Inquiry saved — verification pending',
      body: 'Your inquiry has already been saved, but some delivery steps are still being verified. A second inquiry was not created.',
      warnings,
    };
  }

  const emailSent = result.customerEmailStatus === 'sent';

  if (locale === 'de') {
    return {
      title: 'Vielen Dank!',
      body: emailSent
        ? 'Ihre Anfrage wurde gespeichert und die Bestätigungs-E-Mail wurde versendet. Unser Team prüft nun Ihre Projektdaten.'
        : 'Ihre Anfrage wurde gespeichert. Unser Team prüft nun Ihre Projektdaten und meldet sich bei Ihnen.',
      warnings: result.warnings.map((item) => item.message),
    };
  }

  return {
    title: 'Thank you!',
    body: emailSent
      ? 'Your inquiry was saved and a confirmation email was sent. We typically respond within 1 business day.'
      : 'Your inquiry was saved. Our team will review the project details and contact you directly.',
    warnings: result.warnings.map((item) => item.message),
  };
}
