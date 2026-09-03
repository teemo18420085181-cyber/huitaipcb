import { describe, expect, it } from 'vitest';
import {
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  parseInquiryFormData,
} from './validation';

function makeFile(name: string, size = 10): File {
  const file = new File(['x'], name, { type: 'application/octet-stream' });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

function makeFormData(files: File[] = []): FormData {
  const formData = new FormData();
  formData.set('name', 'Buyer');
  formData.set('email', 'buyer@example.com');
  formData.set('message', 'Please quote this assembly.');
  formData.set('consent', 'true');
  formData.set('idempotency_key', '11111111-1111-4111-8111-111111111111');
  formData.set('page_path', '/contact?from=test');
  formData.set('landing_page', '/knowledge/example?utm_source=google');
  for (const file of files) formData.append('files', file);
  return formData;
}

describe('parseInquiryFormData', () => {
  it('returns normalized text, attribution, and validated files', () => {
    const result = parseInquiryFormData(makeFormData([makeFile('board.zip')]));

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.idempotencyKey).toBe('11111111-1111-4111-8111-111111111111');
    expect(result.value.acquisition).toMatchObject({
      page_path: '/contact',
      landing_page: '/knowledge/example',
    });
    expect(result.value.files).toHaveLength(1);
    expect(result.value.message).toBe('Please quote this assembly.');
  });

  it('rejects a disallowed file extension', () => {
    const result = parseInquiryFormData(makeFormData([makeFile('payload.exe')]));
    expect(result).toMatchObject({ ok: false, error: { code: 'file_type' } });
  });

  it('rejects an oversized file', () => {
    const result = parseInquiryFormData(
      makeFormData([makeFile('board.zip', MAX_FILE_SIZE + 1)])
    );
    expect(result).toMatchObject({ ok: false, error: { code: 'file_size' } });
  });

  it('rejects too many files', () => {
    const files = Array.from(
      { length: MAX_FILE_COUNT + 1 },
      (_, index) => makeFile(`board-${index}.zip`)
    );
    const result = parseInquiryFormData(makeFormData(files));
    expect(result).toMatchObject({ ok: false, error: { code: 'file_count' } });
  });

  it('rejects an invalid idempotency key', () => {
    const formData = makeFormData();
    formData.set('idempotency_key', 'not-a-uuid');
    const result = parseInquiryFormData(formData);
    expect(result).toMatchObject({ ok: false, error: { code: 'form_invalid' } });
  });
});
