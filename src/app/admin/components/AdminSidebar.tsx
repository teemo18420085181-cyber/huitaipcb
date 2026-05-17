'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

const navItems = [
  { href: '/admin', label: '控制台', icon: '📊' },
  { href: '/admin/orders', label: '订单管理', icon: '🗂️' },
  { href: '/admin/inquiries', label: '询盘管理', icon: '📨' },
  { href: '/admin/customers', label: '客户管理', icon: '👥' },
  { href: '/admin/feedback', label: '留言管理', icon: '💬' },
  { href: '/admin/library', label: '项目资料库', icon: '📁' },
  { href: '/admin/knowledge', label: '知识库', icon: '📚' },
];

export default function AdminSidebar({ user }: { user: { email: string; full_name?: string; role: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }
  return (
    <aside className="w-56 bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="text-lg font-bold">会泰电子</div>
        <div className="text-xs text-gray-400 mt-0.5">管理后台</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <span>{item.icon}</span><span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-gray-700">
        <div className="text-sm text-gray-300 truncate">{user.full_name || user.email}</div>
        <div className="text-xs text-gray-500 mb-3">{user.role === 'admin' ? '管理员' : user.role}</div>
        <button onClick={handleLogout}
          className="w-full text-xs text-gray-400 hover:text-white py-1.5 px-3 rounded-lg hover:bg-gray-800 transition text-left">
          退出登录
        </button>
      </div>
    </aside>
  );
}
