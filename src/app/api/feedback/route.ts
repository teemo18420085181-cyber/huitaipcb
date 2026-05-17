import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';

const FeedbackSchema = z.object({
  name: z.string().max(100).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  category: z.enum(['Question', 'Suggestion', 'Feature Request', 'Other']),
  message: z.string().min(1).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = FeedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const data = parsed.data;

    // Store in Supabase (table: feedback_messages)
    const supabase = createServiceClient();
    const { error } = await supabase.from('feedback_messages').insert({
      name: data.name || null,
      country: data.country || null,
      category: data.category,
      message: data.message,
      is_published: false,
    });

    if (error) {
      // Log but don't fail — Supabase might not be configured yet
      console.error('Feedback insert error:', error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Feedback API error:', err);
    return NextResponse.json({ success: true }); // Always return success to user
  }
}
