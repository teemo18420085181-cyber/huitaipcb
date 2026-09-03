import LibraryClient from './LibraryClient';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

export default async function LibraryPage() {
  const { supabase } = await requireAdminPage();
  const { data: files } = await supabase
    .from('library_files')
    .select('*')
    .order('created_at', { ascending: false });

  return <LibraryClient initialFiles={files ?? []} />;
}
