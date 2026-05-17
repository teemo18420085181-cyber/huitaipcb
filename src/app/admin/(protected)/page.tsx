import { createClient } from '@/lib/supabase/server';

const statusMap: Record<string, { label: string; color: string }> = {
  new: { label: '新询盘', color: 'bg-blue-100 text-blue-700' },
  reviewing: { label: '跟进中', color: 'bg-yellow-100 text-yellow-700' },
  quoted: { label: '已报价', color: 'bg-purple-100 text-purple-700' },
  in_progress: { label: '进行中', color: 'bg-orange-100 text-orange-700' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
  closed: { label: '已关闭', color: 'bg-gray-100 text-gray-600' },
  spam: { label: '垃圾', color: 'bg-red-100 text-red-600' },
};

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [inquiries, customers, feedback, newInq, recent] = await Promise.all([
    supabase.from('inquiries').select('id', { count: 'exact', head: true }),
    supabase.from('customers').select('id', { count: 'exact', head: true }),
    supabase.from('feedback_messages').select('id', { count: 'exact', head: true }).eq('is_published', false),
    supabase.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('inquiries').select('id,name,email,company,country,status,created_at').order('created_at', { ascending: false }).limit(8),
  ]);

  const stats = [
    { label: '总询盘', value: inquiries.count ?? 0, icon: '📨', color: 'bg-blue-50 text-blue-600' },
    { label: '新询盘', value: newInq.count ?? 0, icon: '🔔', color: 'bg-orange-50 text-orange-600' },
    { label: '客户总数', value: customers.count ?? 0, icon: '👥', color: 'bg-green-50 text-green-600' },
    { label: '待审留言', value: feedback.count ?? 0, icon: '💬', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">控制台</h1>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-xl ${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">最近询盘</h2>
          <a href="/admin/inquiries" className="text-sm text-blue-600 hover:underline">查看全部 →</a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-100">
              <th className="px-6 py-3 text-left font-medium">客户</th>
              <th className="px-6 py-3 text-left font-medium">公司</th>
              <th className="px-6 py-3 text-left font-medium">国家</th>
              <th className="px-6 py-3 text-left font-medium">状态</th>
              <th className="px-6 py-3 text-left font-medium">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {(recent.data ?? []).length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">暂无询盘数据</td></tr>
            ) : (recent.data ?? []).map((inq: any) => (
              <tr key={inq.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  <a href={`/admin/inquiries/${inq.id}`} className="font-medium text-gray-900 hover:text-blue-600">{inq.name}</a>
                  <div className="text-xs text-gray-400">{inq.email}</div>
                </td>
                <td className="px-6 py-3 text-gray-600">{inq.company || '-'}</td>
                <td className="px-6 py-3 text-gray-600">{inq.country || '-'}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[inq.status]?.color}`}>
                    {statusMap[inq.status]?.label}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-400">{new Date(inq.created_at).toLocaleDateString('zh-CN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
