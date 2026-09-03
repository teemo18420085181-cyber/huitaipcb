import type { createServiceClient } from '@/lib/supabase/server';
import type {
  DeliveryStatus,
  FilesStatus,
  AnalyticsRetryState,
} from './types';
import type {
  FileStorage,
  InquiryInsertInput,
  InquiryRepository,
  PersistedInquiry,
} from './process';

type ServiceClient = ReturnType<typeof createServiceClient>;
type PersistedRow = Record<string, unknown>;

const PERSISTED_COLUMNS = 'id,analytics_event_id,files_status,admin_email_status,customer_email_status,analytics_status,analytics_retry_state';

const FILE_STATUSES = new Set<FilesStatus>([
  'not_required', 'pending', 'saved', 'partial', 'failed',
]);
const DELIVERY_STATUSES = new Set<DeliveryStatus>([
  'pending', 'sent', 'failed', 'skipped_unconfigured',
]);
const RETRY_STATES = new Set<AnalyticsRetryState>([
  'not_needed', 'safe', 'manual_review',
]);

function boundedCode(value: unknown, fallback: string): string {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value)
    ? value
    : fallback;
}

export function isUniqueViolation(error: unknown): boolean {
  return Boolean(
    error
    && typeof error === 'object'
    && 'code' in error
    && (error as { code?: unknown }).code === '23505'
  );
}

export function mapPersistedInquiry(row: PersistedRow): PersistedInquiry {
  const filesStatus = String(row.files_status) as FilesStatus;
  const adminEmailStatus = String(row.admin_email_status) as DeliveryStatus;
  const customerEmailStatus = String(row.customer_email_status) as DeliveryStatus;
  const analyticsStatus = String(row.analytics_status) as DeliveryStatus;
  const analyticsRetryState = String(row.analytics_retry_state) as AnalyticsRetryState;

  if (!FILE_STATUSES.has(filesStatus)
    || !DELIVERY_STATUSES.has(adminEmailStatus)
    || !DELIVERY_STATUSES.has(customerEmailStatus)
    || !DELIVERY_STATUSES.has(analyticsStatus)
    || !RETRY_STATES.has(analyticsRetryState)) {
    throw new Error('invalid_persisted_inquiry_state');
  }

  return {
    id: String(row.id),
    analyticsEventId: String(row.analytics_event_id),
    filesStatus,
    adminEmailStatus,
    customerEmailStatus,
    analyticsStatus,
    analyticsRetryState,
  };
}

export function createStoragePath(
  inquiryId: string,
  index: number,
  safeName: string,
  timestamp: number
): string {
  return `inquiries/${inquiryId}/${timestamp}_${index}_${safeName}`;
}

export function createSupabaseInquiryRepository(
  client: ServiceClient
): InquiryRepository {
  async function updateInquiry(
    inquiryId: string,
    values: Record<string, unknown>,
    fallbackCode: string
  ) {
    const { error } = await client
      .from('inquiries')
      .update(values)
      .eq('id', inquiryId);
    return error
      ? { ok: false, code: boundedCode(error.code, fallbackCode) }
      : { ok: true };
  }

  return {
    async insertInquiry(input: InquiryInsertInput) {
      const { data, error } = await client
        .from('inquiries')
        .insert({
          name: input.name,
          email: input.email,
          company: input.company,
          country: input.country,
          phone: input.phone,
          message: input.message,
          status: 'new',
          source: 'website',
          ...input.acquisition,
          idempotency_key: input.idempotencyKey,
          analytics_event_id: input.analyticsEventId,
          files_status: input.initialFilesStatus,
          files_expected_count: input.files.length,
          files_saved_count: 0,
          admin_email_status: 'pending',
          customer_email_status: 'pending',
          analytics_status: 'pending',
          analytics_attempt_count: 0,
          analytics_retry_state: 'not_needed',
        })
        .select(PERSISTED_COLUMNS)
        .single();

      if (!error && data) {
        try {
          return { kind: 'inserted' as const, inquiry: mapPersistedInquiry(data) };
        } catch {
          return { kind: 'error' as const, code: 'invalid_inserted_state' };
        }
      }

      if (!isUniqueViolation(error)) {
        return {
          kind: 'error' as const,
          code: boundedCode(error?.code, 'database_insert_failed'),
        };
      }

      const duplicate = await client
        .from('inquiries')
        .select(PERSISTED_COLUMNS)
        .eq('idempotency_key', input.idempotencyKey)
        .single();
      if (duplicate.error || !duplicate.data) {
        return { kind: 'error' as const, code: 'duplicate_lookup_failed' };
      }

      try {
        return {
          kind: 'duplicate' as const,
          inquiry: mapPersistedInquiry(duplicate.data),
        };
      } catch {
        return { kind: 'error' as const, code: 'invalid_duplicate_state' };
      }
    },

    updateFiles(inquiryId, update) {
      return updateInquiry(inquiryId, {
        files_status: update.status,
        files_expected_count: update.expectedCount,
        files_saved_count: update.savedCount,
      }, 'files_status_update_failed');
    },

    updateAdminEmail(inquiryId, update) {
      return updateInquiry(inquiryId, {
        admin_email_status: update.status,
        admin_email_message_id: update.messageId ?? null,
        admin_email_sent_at: update.sentAt ?? null,
      }, 'admin_email_status_update_failed');
    },

    updateCustomerEmail(inquiryId, update) {
      return updateInquiry(inquiryId, {
        customer_email_status: update.status,
        customer_email_message_id: update.messageId ?? null,
        customer_email_sent_at: update.sentAt ?? null,
      }, 'customer_email_status_update_failed');
    },

    updateAnalytics(inquiryId, update) {
      return updateInquiry(inquiryId, {
        analytics_status: update.status,
        analytics_retry_state: update.retryState,
        analytics_attempt_count: update.attemptCount,
        analytics_last_attempt_at: update.attemptedAt ?? null,
        analytics_sent_at: update.sentAt ?? null,
        analytics_last_error_code: update.errorCode ?? null,
      }, 'analytics_status_update_failed');
    },
  };
}

export function createSupabaseFileStorage(
  client: ServiceClient,
  now: () => number = Date.now
): FileStorage {
  return {
    async upload(inquiryId, attachment, index) {
      const path = createStoragePath(
        inquiryId,
        index,
        attachment.safeName,
        now()
      );
      const { error } = await client.storage
        .from('inquiry-files')
        .upload(path, attachment.file, {
          contentType: attachment.file.type || 'application/octet-stream',
          upsert: false,
        });
      return error
        ? { ok: false, code: boundedCode(error.name, 'storage_upload_failed') }
        : { ok: true, path };
    },

    async record({ inquiryId, attachment, path }) {
      const { error } = await client.from('inquiry_files').insert({
        inquiry_id: inquiryId,
        file_name: attachment.file.name,
        storage_path: path,
        file_size: attachment.file.size,
        mime_type: attachment.file.type || null,
      });
      return error
        ? { ok: false, code: boundedCode(error.code, 'file_record_failed') }
        : { ok: true };
    },
  };
}
