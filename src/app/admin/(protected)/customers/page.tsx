import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import ConfirmSubmitButton from '../../components/ConfirmSubmitButton';

async function deleteCustomer(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const id = String(formData.get('id') || '');
  if (id) {
    await supabase.from('customers').delete().eq('id', id);
    revalidatePath('/admin/customers');
  }
}

const tierMap: Record<string, { label: string; color: string }> = {
  prospect: { label: '潜在客户', color: 'bg-gray-100 text-gray-600' },
  active: { label: '活跃客户', color: 'bg-blue-100 text-blue-700' },
  vip: { label: 'VIP', color: 'bg-yellow-100 text-yellow-700' },
  inactive: { label: '沉睡客户', color: 'bg-gray-100 text-gray-400' },
  blacklist: { label: '黑名单', color: 'bg-red-100 text-red-600' },
};

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase.from('customers').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">客户管理</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-3 text-left font-medium">客户</th>
              <th className="px-6 py-3 text-left font-medium">公司</th>
              <th className="px-6 py-3 text-left font-medium">国家</th>
              <th className="px-6 py-3 text-left font-medium">行业</th>
              <th className="px-6 py-3 text-left font-medium">级别</th>
              <th className="px-6 py-3 text-left font-medium">创建时间</th>
              <th className="px-6 py-3 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(!customers || customers.length === 0) ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">暂无客户数据</td></tr>
            ) : customers.map((c: any) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  <div className="font-medium text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-400">{c.email || '-'}</div>
                </td>
                <td className="px-6 py-3 text-gray-600">{c.company || '-'}</td>
                <td className="px-6 py-3 text-gray-600">{c.country || '-'}</td>
                <td className="px-6 py-3 text-gray-600">{c.industry || '-'}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tierMap[c.tier]?.color}`}>{tierMap[c.tier]?.label}</span>
                </td>
                <td className="px-6 py-3 text-gray-400 text-xs">{new Date(c.created_at).toLocaleDateString('zh-CN')}</td>
                <td className="px-6 py-3">
                  <form action={deleteCustomer}>
                    <input type="hidden" name="id" value={c.id} />
                    <ConfirmSubmitButton
                      label="删除"
                      confirmMessage={`确定删除客户「${c.name}」？此操作不可恢复。`}
                      className="text-red-500 hover:underline text-xs disabled:opacity-50"
                    />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
