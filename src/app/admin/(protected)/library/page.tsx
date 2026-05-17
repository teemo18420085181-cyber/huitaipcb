import { createClient } from '@/lib/supabase/server';
import LibraryClient from './LibraryClient';

export default async function LibraryPage() {
  const supabase = createClient();
  const { data: files } = await supabase
    .from('library_files')
    .select('*')
    .order('created_at', { ascending: false });

  return <LibraryClient initialFiles={files ?? []} />;
}
