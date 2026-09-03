import { describe, expect, it } from 'vitest';
import { isInquiryWarningCode } from './types';

describe('inquiry contracts', () => {
  it('recognizes a public warning code', () => {
    expect(isInquiryWarningCode('files_partial')).toBe(true);
  });
});
