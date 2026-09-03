import { z } from 'zod';
import { sanitizeAcquisition } from '@/lib/analytics/attribution';
import type { AcquisitionData } from './types';

export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const MAX_FILE_COUNT = 10;

const ALLOWED_EXTENSIONS = new Set([
  '.zip', '.rar', '.7z',
  '.pdf', '.xlsx', '.xls', '.csv',
  '.gbr', '.ger', '.drl', '.nc',
  '.brd', '.sch',
  '.png', '.jpg', '.jpeg',
  '.txt',
]);

const InquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(200).nullable(),
  country: z.string().trim().max(100).nullable(),
  phone: z.string().trim().max(50).nullable(),
  project_type: z.string().trim().max(120).nullable(),
  quantity: z.string().trim().max(80).nullable(),
  testing_requirements: z.string().trim().max(1500).nullable(),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal('true'),
  idempotency_key: z.string().uuid(),
});

export interface ValidatedAttachment {
  file: File;
  extension: string;
  safeName: string;
}

export interface ValidatedInquiryRequest {
  name: string;
  email: string;
  company: string | null;
  country: string | null;
  phone: string | null;
  message: string;
  idempotencyKey: string;
  acquisition: AcquisitionData;
  files: ValidatedAttachment[];
}

export type InquiryValidationResult =
  | { ok: true; value: ValidatedInquiryRequest }
  | {
      ok: false;
      error: {
        code: 'form_invalid' | 'file_count' | 'file_empty' | 'file_size' | 'file_type';
        message: string;
        fieldErrors?: Record<string, string[]>;
      };
    };

function optionalString(value: FormDataEntryValue | null): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}

function requiredString(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value : '';
}

function acquisitionInput(formData: FormData): Record<string, string> {
  const keys = [
    'page_path',
    'landing_page',
    'referrer',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'ga_client_id',
    'ga_session_id',
  ] as const;

  return Object.fromEntries(
    keys.flatMap((key) => {
      const value = formData.get(key);
      return typeof value === 'string' ? [[key, value]] : [];
    })
  );
}

export function parseInquiryFormData(formData: FormData): InquiryValidationResult {
  const parsed = InquirySchema.safeParse({
    name: requiredString(formData.get('name')),
    email: requiredString(formData.get('email')),
    company: optionalString(formData.get('company')),
    country: optionalString(formData.get('country')),
    phone: optionalString(formData.get('phone')),
    project_type: optionalString(formData.get('project_type')),
    quantity: optionalString(formData.get('quantity')),
    testing_requirements: optionalString(formData.get('testing_requirements')),
    message: requiredString(formData.get('message')),
    consent: requiredString(formData.get('consent')),
    idempotency_key: requiredString(formData.get('idempotency_key')),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: {
        code: 'form_invalid',
        message: 'Invalid form data.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
    };
  }

  const rawFiles = formData.getAll('files');
  if (rawFiles.length > MAX_FILE_COUNT) {
    return {
      ok: false,
      error: {
        code: 'file_count',
        message: `You can upload up to ${MAX_FILE_COUNT} files.`,
      },
    };
  }

  const files: ValidatedAttachment[] = [];
  for (const rawFile of rawFiles) {
    if (!(rawFile instanceof File) || rawFile.size === 0) {
      return {
        ok: false,
        error: { code: 'file_empty', message: 'An attachment is empty or invalid.' },
      };
    }

    if (rawFile.size > MAX_FILE_SIZE) {
      return {
        ok: false,
        error: { code: 'file_size', message: 'An attachment exceeds the 25 MB limit.' },
      };
    }

    const extensionIndex = rawFile.name.lastIndexOf('.');
    const extension = extensionIndex >= 0
      ? rawFile.name.slice(extensionIndex).toLowerCase()
      : '';
    if (!ALLOWED_EXTENSIONS.has(extension)) {
      return {
        ok: false,
        error: { code: 'file_type', message: 'An attachment type is not allowed.' },
      };
    }

    files.push({
      file: rawFile,
      extension,
      safeName: rawFile.name.replace(/[^a-zA-Z0-9._-]/g, '_'),
    });
  }

  const data = parsed.data;
  const message = [
    data.project_type ? `Project type: ${data.project_type}` : null,
    data.quantity ? `Quantity: ${data.quantity}` : null,
    data.testing_requirements
      ? `Testing requirements: ${data.testing_requirements}`
      : null,
    data.message,
  ].filter(Boolean).join('\n\n');

  return {
    ok: true,
    value: {
      name: data.name,
      email: data.email,
      company: data.company,
      country: data.country,
      phone: data.phone,
      message,
      idempotencyKey: data.idempotency_key,
      acquisition: sanitizeAcquisition(acquisitionInput(formData)),
      files,
    },
  };
}
