import type { AnalyticsDeliveryResult } from '@/lib/analytics/server';
import type {
  EmailDeliveryResult,
  FileDeliverySummary,
} from '@/lib/email/resend';
import type {
  AnalyticsRetryState,
  DeliveryStatus,
  FilesStatus,
  InquiryWarningCode,
} from './types';
import type {
  ValidatedAttachment,
  ValidatedInquiryRequest,
} from './validation';

export interface PersistedInquiry {
  id: string;
  analyticsEventId: string;
  filesStatus: FilesStatus;
  adminEmailStatus: DeliveryStatus;
  customerEmailStatus: DeliveryStatus;
  analyticsStatus: DeliveryStatus;
  analyticsRetryState: AnalyticsRetryState;
}

export interface InquiryInsertInput extends ValidatedInquiryRequest {
  analyticsEventId: string;
  initialFilesStatus: FilesStatus;
}

export type InquiryInsertResult =
  | { kind: 'inserted'; inquiry: PersistedInquiry }
  | { kind: 'duplicate'; inquiry: PersistedInquiry }
  | { kind: 'error'; code: string };

interface RepositoryUpdateResult {
  ok: boolean;
  code?: string;
}

export interface InquiryRepository {
  insertInquiry(input: InquiryInsertInput): Promise<InquiryInsertResult>;
  updateFiles(inquiryId: string, update: {
    status: Exclude<FilesStatus, 'pending'>;
    expectedCount: number;
    savedCount: number;
  }): Promise<RepositoryUpdateResult>;
  updateAdminEmail(inquiryId: string, update: {
    status: Exclude<DeliveryStatus, 'pending'>;
    messageId?: string;
    sentAt?: string;
  }): Promise<RepositoryUpdateResult>;
  updateCustomerEmail(inquiryId: string, update: {
    status: Exclude<DeliveryStatus, 'pending'>;
    messageId?: string;
    sentAt?: string;
  }): Promise<RepositoryUpdateResult>;
  updateAnalytics(inquiryId: string, update: {
    status: Exclude<DeliveryStatus, 'pending'>;
    retryState: AnalyticsRetryState;
    attemptCount: number;
    attemptedAt?: string;
    sentAt?: string;
    errorCode?: string;
  }): Promise<RepositoryUpdateResult>;
}

export interface FileStorage {
  upload(
    inquiryId: string,
    attachment: ValidatedAttachment,
    index: number
  ): Promise<{ ok: true; path: string } | { ok: false; code: string }>;
  record(input: {
    inquiryId: string;
    attachment: ValidatedAttachment;
    path: string;
  }): Promise<{ ok: true } | { ok: false; code: string }>;
}

interface InquiryEmail {
  sendAdmin(
    input: ValidatedInquiryRequest & { inquiryId: string },
    files: FileDeliverySummary
  ): Promise<EmailDeliveryResult>;
  sendCustomer(
    input: ValidatedInquiryRequest & { inquiryId: string },
    files: FileDeliverySummary
  ): Promise<EmailDeliveryResult>;
}

interface InquiryAnalytics {
  send(input: {
    analyticsEventId: string;
    gaClientId?: string;
    gaSessionId?: string;
    pagePath?: string;
  }): Promise<AnalyticsDeliveryResult>;
}

interface ProcessLog {
  inquiryId?: string;
  stage: 'database' | 'files' | 'admin_email' | 'customer_email' | 'analytics';
  outcome: 'inserted' | 'duplicate' | 'sent' | 'saved' | 'failed' | 'skipped';
  code?: string;
}

export interface InquiryDependencies {
  repository: InquiryRepository;
  storage: FileStorage;
  email: InquiryEmail;
  analytics: InquiryAnalytics;
  createUuid(): string;
  now(): Date;
  log(entry: ProcessLog): void;
}

interface InquiryWarning {
  code: InquiryWarningCode;
  message: string;
}

export type InquiryProcessResult =
  | { success: false; errorCode: string }
  | {
      success: true;
      inquiryId: string;
      duplicate: boolean;
      processingIncomplete: boolean;
      requiresManualReview: boolean;
      filesStatus: FilesStatus;
      adminEmailStatus: DeliveryStatus;
      customerEmailStatus: DeliveryStatus;
      analyticsStatus: DeliveryStatus;
      warnings: InquiryWarning[];
    };

function warning(code: InquiryWarningCode, message: string): InquiryWarning {
  return { code, message };
}

function warningsForStatuses(statuses: {
  filesStatus: FilesStatus;
  adminEmailStatus: DeliveryStatus;
  customerEmailStatus: DeliveryStatus;
  analyticsStatus: DeliveryStatus;
}): InquiryWarning[] {
  const warnings: InquiryWarning[] = [];
  if (statuses.filesStatus === 'partial') {
    warnings.push(warning(
      'files_partial',
      'Your inquiry was saved, but only some attachments were received. Please resend the missing files.'
    ));
  } else if (statuses.filesStatus === 'failed') {
    warnings.push(warning(
      'files_failed',
      'Your inquiry was saved, but the attachments were not received. Please resend them.'
    ));
  }

  if (statuses.adminEmailStatus === 'failed') {
    warnings.push(warning(
      'admin_email_failed',
      'Your inquiry was saved, but the internal notification needs manual follow-up.'
    ));
  }
  if (statuses.customerEmailStatus === 'failed') {
    warnings.push(warning(
      'customer_email_failed',
      'Your inquiry was saved, but we could not send the confirmation email.'
    ));
  } else if (statuses.customerEmailStatus === 'skipped_unconfigured') {
    warnings.push(warning(
      'customer_email_skipped',
      'Your inquiry was saved, but no confirmation email was sent.'
    ));
  }
  if (statuses.analyticsStatus === 'failed') {
    warnings.push(warning(
      'analytics_failed',
      'Your inquiry was saved; analytics recording requires review.'
    ));
  } else if (statuses.analyticsStatus === 'skipped_unconfigured') {
    warnings.push(warning(
      'analytics_skipped',
      'Your inquiry was saved; analytics recording was not configured.'
    ));
  }
  return warnings;
}

function duplicateResult(inquiry: PersistedInquiry): InquiryProcessResult {
  const statuses = {
    filesStatus: inquiry.filesStatus,
    adminEmailStatus: inquiry.adminEmailStatus,
    customerEmailStatus: inquiry.customerEmailStatus,
    analyticsStatus: inquiry.analyticsStatus,
  };
  const processingIncomplete = Object.values(statuses).includes('pending');
  const warnings = warningsForStatuses(statuses);
  if (processingIncomplete) {
    warnings.push(warning(
      'processing_incomplete',
      'Your inquiry has already been saved, but some delivery steps are still being verified.'
    ));
  }
  return {
    success: true,
    inquiryId: inquiry.id,
    duplicate: true,
    processingIncomplete,
    requiresManualReview: processingIncomplete,
    ...statuses,
    warnings,
  };
}

function fileStatus(expectedCount: number, savedCount: number): Exclude<FilesStatus, 'pending'> {
  if (expectedCount === 0) return 'not_required';
  if (savedCount === expectedCount) return 'saved';
  if (savedCount === 0) return 'failed';
  return 'partial';
}

function deliveryTimestamp(
  result: EmailDeliveryResult,
  now: () => Date
): string | undefined {
  return result.status === 'sent' ? now().toISOString() : undefined;
}

export async function processInquiry(
  input: ValidatedInquiryRequest,
  deps: InquiryDependencies
): Promise<InquiryProcessResult> {
  const analyticsEventId = deps.createUuid();
  const inserted = await deps.repository.insertInquiry({
    ...input,
    analyticsEventId,
    initialFilesStatus: input.files.length === 0 ? 'not_required' : 'pending',
  });

  if (inserted.kind === 'error') {
    deps.log({ stage: 'database', outcome: 'failed', code: inserted.code });
    return { success: false, errorCode: inserted.code };
  }

  if (inserted.kind === 'duplicate') {
    deps.log({ inquiryId: inserted.inquiry.id, stage: 'database', outcome: 'duplicate' });
    return duplicateResult(inserted.inquiry);
  }

  const inquiry = inserted.inquiry;
  deps.log({ inquiryId: inquiry.id, stage: 'database', outcome: 'inserted' });

  const savedFileNames: string[] = [];
  for (const [index, attachment] of input.files.entries()) {
    const uploaded = await deps.storage.upload(inquiry.id, attachment, index);
    if (!uploaded.ok) {
      deps.log({ inquiryId: inquiry.id, stage: 'files', outcome: 'failed', code: uploaded.code });
      continue;
    }

    const recorded = await deps.storage.record({
      inquiryId: inquiry.id,
      attachment,
      path: uploaded.path,
    });
    if (!recorded.ok) {
      deps.log({ inquiryId: inquiry.id, stage: 'files', outcome: 'failed', code: recorded.code });
      continue;
    }

    savedFileNames.push(attachment.file.name);
  }

  const filesStatus = fileStatus(input.files.length, savedFileNames.length);
  const fileSummary: FileDeliverySummary = {
    status: filesStatus,
    expectedCount: input.files.length,
    savedCount: savedFileNames.length,
    savedFileNames,
  };
  const filesPersisted = await deps.repository.updateFiles(inquiry.id, {
    status: filesStatus,
    expectedCount: fileSummary.expectedCount,
    savedCount: fileSummary.savedCount,
  });
  deps.log({
    inquiryId: inquiry.id,
    stage: 'files',
    outcome: filesStatus === 'saved' || filesStatus === 'not_required' ? 'saved' : 'failed',
    code: filesPersisted.ok ? undefined : filesPersisted.code ?? 'files_status_update_failed',
  });

  const emailInput = { ...input, inquiryId: inquiry.id };
  const adminEmail = await deps.email.sendAdmin(emailInput, fileSummary);
  const adminPersisted = await deps.repository.updateAdminEmail(inquiry.id, {
    status: adminEmail.status,
    messageId: adminEmail.messageId,
    sentAt: deliveryTimestamp(adminEmail, deps.now),
  });
  deps.log({
    inquiryId: inquiry.id,
    stage: 'admin_email',
    outcome: adminEmail.status === 'sent' ? 'sent'
      : adminEmail.status === 'skipped_unconfigured' ? 'skipped' : 'failed',
    code: adminPersisted.ok ? adminEmail.errorCode : adminPersisted.code ?? 'admin_email_status_update_failed',
  });

  const customerEmail = await deps.email.sendCustomer(emailInput, fileSummary);
  const customerPersisted = await deps.repository.updateCustomerEmail(inquiry.id, {
    status: customerEmail.status,
    messageId: customerEmail.messageId,
    sentAt: deliveryTimestamp(customerEmail, deps.now),
  });
  deps.log({
    inquiryId: inquiry.id,
    stage: 'customer_email',
    outcome: customerEmail.status === 'sent' ? 'sent'
      : customerEmail.status === 'skipped_unconfigured' ? 'skipped' : 'failed',
    code: customerPersisted.ok ? customerEmail.errorCode : customerPersisted.code ?? 'customer_email_status_update_failed',
  });

  const attemptedAt = deps.now().toISOString();
  const analytics = await deps.analytics.send({
    analyticsEventId: inquiry.analyticsEventId,
    gaClientId: input.acquisition.ga_client_id,
    gaSessionId: input.acquisition.ga_session_id,
    pagePath: input.acquisition.page_path,
  });
  const analyticsPersisted = await deps.repository.updateAnalytics(inquiry.id, {
    status: analytics.status,
    retryState: analytics.retryState,
    attemptCount: analytics.status === 'skipped_unconfigured' ? 0 : 1,
    attemptedAt: analytics.status === 'skipped_unconfigured' ? undefined : attemptedAt,
    sentAt: analytics.status === 'sent' ? deps.now().toISOString() : undefined,
    errorCode: analytics.errorCode,
  });
  deps.log({
    inquiryId: inquiry.id,
    stage: 'analytics',
    outcome: analytics.status === 'sent' ? 'sent'
      : analytics.status === 'skipped_unconfigured' ? 'skipped' : 'failed',
    code: analyticsPersisted.ok ? analytics.errorCode : analyticsPersisted.code ?? 'analytics_status_update_failed',
  });

  const statuses = {
    filesStatus,
    adminEmailStatus: adminEmail.status,
    customerEmailStatus: customerEmail.status,
    analyticsStatus: analytics.status,
  };
  const warnings = warningsForStatuses(statuses);
  const processingIncomplete = !filesPersisted.ok
    || !adminPersisted.ok
    || !customerPersisted.ok
    || !analyticsPersisted.ok;
  if (processingIncomplete) {
    warnings.push(warning(
      'state_persist_failed',
      'Your inquiry was saved, but an internal delivery status needs manual review.'
    ));
  }

  return {
    success: true,
    inquiryId: inquiry.id,
    duplicate: false,
    processingIncomplete,
    requiresManualReview: processingIncomplete,
    ...statuses,
    warnings,
  };
}
