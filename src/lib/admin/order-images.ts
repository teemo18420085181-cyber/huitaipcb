import 'server-only';

import { requireAdmin } from './require-admin';
import {
  ORDER_IMAGE_BUCKET,
  ORDER_IMAGE_SIGNED_URL_TTL_SECONDS,
  parseOrderImageReference,
} from './order-image-model';

export async function getOrderImageDisplayUrls(references: unknown[]) {
  const { supabase } = await requireAdmin();
  const displayUrls: string[] = [];
  let bucket: ReturnType<typeof supabase.storage.from> | undefined;

  for (const reference of references) {
    const parsed = parseOrderImageReference(
      reference,
      process.env.NEXT_PUBLIC_SUPABASE_URL
    );
    if (!parsed) continue;
    if (parsed.kind === 'external-url') {
      displayUrls.push(parsed.url);
      continue;
    }

    bucket ??= supabase.storage.from(ORDER_IMAGE_BUCKET);
    try {
      const { data, error } = await bucket.createSignedUrl(
        parsed.path,
        ORDER_IMAGE_SIGNED_URL_TTL_SECONDS
      );
      if (!error && data?.signedUrl) displayUrls.push(data.signedUrl);
    } catch {
      // A malformed legacy row or transient Storage failure must not crash the admin page.
    }
  }

  return displayUrls;
}
