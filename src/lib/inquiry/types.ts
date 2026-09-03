export type FilesStatus =
  | 'not_required'
  | 'pending'
  | 'saved'
  | 'partial'
  | 'failed';

export type DeliveryStatus =
  | 'pending'
  | 'sent'
  | 'failed'
  | 'skipped_unconfigured';

export type AnalyticsRetryState = 'not_needed' | 'safe' | 'manual_review';

export interface AcquisitionData {
  page_path?: string;
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ga_client_id?: string;
  ga_session_id?: string;
}

export const INQUIRY_WARNING_CODES = [
  'processing_incomplete',
  'files_partial',
  'files_failed',
  'admin_email_failed',
  'customer_email_failed',
  'customer_email_skipped',
  'analytics_failed',
  'analytics_skipped',
  'state_persist_failed',
] as const;

export type InquiryWarningCode = (typeof INQUIRY_WARNING_CODES)[number];

export function isInquiryWarningCode(value: string): value is InquiryWarningCode {
  return (INQUIRY_WARNING_CODES as readonly string[]).includes(value);
}
