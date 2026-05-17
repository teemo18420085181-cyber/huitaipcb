import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';
import {
  sendInquiryNotification,
  sendInquiryConfirmation,
} from '@/lib/email/resend';

// Validation schema
const InquirySchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().max(200).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  message: z.string().min(1).max(5000),
  consent: z.literal('true'),
});

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_EXTENSIONS = [
  '.zip', '.rar', '.7z',
  '.pdf', '.xlsx', '.xls', '.csv',
  '.gbr', '.ger', '.drl', '.nc',
  '.brd', '.sch',
  '.png', '.jpg', '.jpeg',
  '.txt',
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Validate text fields
    const fields = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company') || null,
      country: formData.get('country') || null,
      phone: formData.get('phone') || null,
      message: formData.get('message'),
      consent: formData.get('consent'),
    };

    const parsed = InquirySchema.safeParse(fields);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // Process files
    const files = formData.getAll('files') as File[];
    const fileNames: string[] = [];
    const uploadedPaths: string[] = [];

    const supabase = createServiceClient();

    // Insert inquiry first to get ID
    const { data: inquiry, error: insertError } = await supabase
      .from('inquiries')
      .insert({
        name: data.name,
        email: data.email,
        company: data.company,
        country: data.country,
        phone: data.phone,
        message: data.message,
        status: 'new',
        source: 'website',
      })
      .select('id')
      .single();

    if (insertError || !inquiry) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
    }

    const inquiryId = inquiry.id;

    // Upload files
    for (const file of files) {
      if (!file || !(file instanceof File) || file.size === 0) continue;

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large: ${file.name} (max 25MB)` },
          { status: 400 }
        );
      }

      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
          { error: `File type not allowed: ${file.name}` },
          { status: 400 }
        );
      }

      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `inquiries/${inquiryId}/${Date.now()}_${cleanName}`;

      const { error: uploadError } = await supabase.storage
        .from('inquiry-files')
        .upload(path, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      fileNames.push(file.name);
      uploadedPaths.push(path);

      // Record in inquiry_files table
      await supabase.from('inquiry_files').insert({
        inquiry_id: inquiryId,
        file_name: file.name,
        storage_path: path,
        file_size: file.size,
        mime_type: file.type,
      });
    }

    // Send notification email to admin
    try {
      await sendInquiryNotification({
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        country: data.country || undefined,
        phone: data.phone || undefined,
        message: data.message,
        fileNames,
        inquiryId,
      });
    } catch (e) {
      console.error('Notification email failed:', e);
    }

    // Send confirmation to customer
    try {
      await sendInquiryConfirmation(data.email, data.name, inquiryId);
    } catch (e) {
      console.error('Confirmation email failed:', e);
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Inquiry received. We\'ll respond within 24 hours.',
    });
  } catch (err) {
    console.error('Inquiry API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
