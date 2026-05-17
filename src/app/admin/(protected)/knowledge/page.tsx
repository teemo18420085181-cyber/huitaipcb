import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const statusMap: Record<string, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'bg-gray-100 text-gray-600' },
  published: { label: '已发布', color: 'bg-green-100 text-green-700' },
  archived: { label: '已归档', color: 'bg-yellow-100 text-yellow-600' },
};

export default async function KnowledgePage() {
  const supabase = await createClient();
  const { data: articles } = await supabase.from('knowledge_articles').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">知识库管理</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-3 text-left font-medium">标题</th>
              <th className="px-6 py-3 text-left font-medium">分类</th>
              <th className="px-6 py-3 text-left font-medium">状态</th>
              <th className="px-6 py-3 text-left font-medium">浏览量</th>
              <th className="px-6 py-3 text-left font-medium">更新时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(!articles || articles.length === 0) ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">暂无文章</td></tr>
            ) : articles.map((a: any) => (
              <tr key={a.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  <div className="font-medium text-gray-900">{a.title}</div>
                  <div className="text-xs text-gray-400">/{a.slug}</div>
                </td>
                <td className="px-6 py-3 text-gray-600">{a.category || '-'}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[a.status]?.color}`}>{statusMap[a.status]?.label}</span>
                </td>
                <td className="px-6 py-3 text-gray-600">{a.view_count}</td>
                <td className="px-6 py-3 text-gray-400 text-xs">{new Date(a.updated_at).toLocaleDateString('zh-CN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
