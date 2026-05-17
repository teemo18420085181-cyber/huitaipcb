import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '../components/AdminSidebar';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: adminUser } = await supabase
    .from('admin_users').select('role, full_name').eq('user_id', user.id).single();
  if (!adminUser) redirect('/admin/login');

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar user={{ email: user.email!, ...adminUser }} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
