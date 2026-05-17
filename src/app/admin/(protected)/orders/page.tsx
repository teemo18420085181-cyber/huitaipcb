import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '待处理', color: 'bg-yellow-100 text-yellow-700' },
  in_production: { label: '生产中', color: 'bg-blue-100 text-blue-700' },
  shipped: { label: '已发货', color: 'bg-purple-100 text-purple-700' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-600' },
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const totalRevenue = (orders ?? []).reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const completedCount = (orders ?? []).filter(o => o.status === 'completed').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
        <Link href="/admin/orders/new"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          + 新建订单
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{(orders ?? []).length}</div>
          <div className="text-sm text-gray-500 mt-0.5">总订单数</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{completedCount}</div>
          <div className="text-sm text-gray-500 mt-0.5">已完成</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-500 mt-0.5">总成交额 (USD)</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-3 text-left font-medium">客户</th>
              <th className="px-6 py-3 text-left font-medium">产品</th>
              <th className="px-6 py-3 text-left font-medium">数量</th>
              <th className="px-6 py-3 text-left font-medium">总金额</th>
              <th className="px-6 py-3 text-left font-medium">状态</th>
              <th className="px-6 py-3 text-left font-medium">日期</th>
              <th className="px-6 py-3 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(!orders || orders.length === 0) ? (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">暂无订单，点击「新建订单」添加</td></tr>
            ) : orders.map((o: any) => (
              <tr key={o.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  <div className="font-medium text-gray-900">{o.customer_name}</div>
                  <div className="text-xs text-gray-400">{o.company || o.email || '-'}</div>
                </td>
                <td className="px-6 py-3 text-gray-600">{o.product_name || '-'}</td>
                <td className="px-6 py-3 text-gray-600">{o.quantity || '-'}</td>
                <td className="px-6 py-3 font-medium text-gray-900">
                  ${(o.total_amount || 0).toLocaleString()}
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[o.status]?.color}`}>
                    {statusMap[o.status]?.label}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-400 text-xs">
                  {new Date(o.created_at).toLocaleDateString('zh-CN')}
                </td>
                <td className="px-6 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="text-blue-600 hover:underline text-xs">查看</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
