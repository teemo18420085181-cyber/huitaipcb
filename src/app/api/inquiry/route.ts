import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import {
  sendInquiryConfirmation,
  sendInquiryNotification,
} from '@/lib/email/resend';
import { sendGenerateLead } from '@/lib/analytics/server';
import { parseInquiryFormData } from '@/lib/inquiry/validation';
import { processInquiry } from '@/lib/inquiry/process';
import {
  createSupabaseFileStorage,
  createSupabaseInquiryRepository,
} from '@/lib/inquiry/supabase-adapter';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const validation = parseInquiryFormData(formData);
    if (!validation.ok) {
      return NextResponse.json({
        error: validation.error.message,
        code: validation.error.code,
        details: validation.error.fieldErrors,
      }, { status: 400 });
    }

    const supabase = createServiceClient();
    const result = await processInquiry(validation.value, {
      repository: createSupabaseInquiryRepository(supabase),
      storage: createSupabaseFileStorage(supabase),
      email: {
        sendAdmin: (input, files) => sendInquiryNotification({
          name: input.name,
          email: input.email,
          company: input.company || undefined,
          country: input.country || undefined,
          phone: input.phone || undefined,
          message: input.message,
          inquiryId: input.inquiryId,
          files,
        }),
        sendCustomer: (input, files) => sendInquiryConfirmation(
          input.email,
          input.name,
          input.inquiryId,
          files
        ),
      },
      analytics: {
        send: (input) => sendGenerateLead(input),
      },
      createUuid: () => crypto.randomUUID(),
      now: () => new Date(),
      log: (entry) => {
        const method = entry.outcome === 'failed' ? 'error' : 'info';
        console[method]('[inquiry-state]', entry);
      },
    });

    if (!result.success) {
      return NextResponse.json({
        error: 'Failed to save inquiry.',
        code: result.errorCode,
      }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch {
    console.error('[inquiry-state]', {
      stage: 'database',
      outcome: 'failed',
      code: 'unhandled_request_error',
    });
    return NextResponse.json({
      error: 'Internal server error.',
      code: 'unhandled_request_error',
    }, { status: 500 });
  }
}
