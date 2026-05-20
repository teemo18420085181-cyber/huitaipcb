import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  getInquiryStatusColor,
  getInquiryStatusLabel,
  getStatusFilterValues,
  INQUIRY_STATUSES,
  normalizeInquiryStatus,
} from '@/lib/admin/inquiries';

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const supabase = await createClient();
  const resolvedSearchParams = await searchParams;
  const activeStatus = resolvedSearchParams.status ? normalizeInquiryStatus(resolvedSearchParams.status) : 'all';
  let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
  if (activeStatus === 'all') {
    query = query.not('status', 'in', '("closed","spam","已关闭","垃圾")');
  } else {
    query = query.in('status', getStatusFilterValues(activeStatus));
  }
  const { data: inquiries } = await query;

  const tabs = [
    { value: 'all', label: '全部' },
    ...INQUIRY_STATUSES,
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">询盘管理</h1>
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <Link key={tab.value} href={tab.value === 'all' ? '/admin/inquiries' : `/admin/inquiries?status=${tab.value}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeStatus === tab.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            {tab.label}
          </Link>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-3 text-left font-medium">客户信息</th>
              <th className="px-6 py-3 text-left font-medium">公司 / 国家</th>
              <th className="px-6 py-3 text-left font-medium">留言摘要</th>
              <th className="px-6 py-3 text-left font-medium">状态</th>
              <th className="px-6 py-3 text-left font-medium">时间</th>
              <th className="px-6 py-3 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(!inquiries || inquiries.length === 0) ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">暂无询盘</td></tr>
            ) : inquiries.map((inq: any) => (
              <tr key={inq.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  <div className="font-medium text-gray-900">{inq.name}</div>
                  <div className="text-xs text-gray-400">{inq.email}</div>
                </td>
                <td className="px-6 py-3 text-gray-600">
                  <div>{inq.company || '-'}</div>
                  <div className="text-xs text-gray-400">{inq.country || '-'}</div>
                </td>
                <td className="px-6 py-3 text-gray-600 max-w-xs">
                  <div className="truncate">{inq.message}</div>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getInquiryStatusColor(inq.status)}`}>
                    {getInquiryStatusLabel(inq.status)}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-400 text-xs">{new Date(inq.created_at).toLocaleDateString('zh-CN')}</td>
                <td className="px-6 py-3">
                  <Link href={`/admin/inquiries/${inq.id}`} className="text-blue-600 hover:underline text-xs">查看详情</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
