import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import ConfirmSubmitButton from '@/app/admin/components/ConfirmSubmitButton';
import { deleteArticle } from './actions';
import type { CmsArticle } from '@/lib/content/articles';

const statusMap: Record<string, { label: string; color: string }> = {
  draft: { label: '草稿', color: 'bg-gray-100 text-gray-600' },
  published: { label: '已发布', color: 'bg-green-100 text-green-700' },
};

const filters = [
  { label: '全部', value: 'all' },
  { label: '草稿', value: 'draft' },
  { label: '已发布', value: 'published' },
];

function formatDate(value: string | null) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('zh-CN');
}

export default async function KnowledgePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = status === 'draft' || status === 'published' ? status : 'all';
  const supabase = await createClient();
  let query = supabase.from('articles').select('*').order('created_at', { ascending: false });

  if (activeStatus !== 'all') {
    query = query.eq('status', activeStatus);
  }

  const { data: articles, error } = await query;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">知识库管理</h1>
          <p className="mt-1 text-sm text-gray-500">管理前台 Knowledge Base 文章，支持 Markdown 编辑和发布。</p>
        </div>
        <Link
          href="/admin/knowledge/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          新建文章
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={filter.value === 'all' ? '/admin/knowledge' : `/admin/knowledge?status=${filter.value}`}
            className={`rounded-full px-4 py-2 text-sm transition ${
              activeStatus === filter.value
                ? 'bg-blue-600 text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600'
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {error ? (
          <div className="px-6 py-12 text-center text-sm text-red-500">
            文章表暂不可用。请先在 Supabase 执行 articles 建表 SQL。
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
                <th className="px-6 py-3 text-left font-medium">标题</th>
                <th className="px-6 py-3 text-left font-medium">状态</th>
                <th className="px-6 py-3 text-left font-medium">发布时间</th>
                <th className="px-6 py-3 text-left font-medium">更新时间</th>
                <th className="px-6 py-3 text-right font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(!articles || articles.length === 0) ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    暂无文章
                  </td>
                </tr>
              ) : (
                (articles as CmsArticle[]).map((article) => (
                  <tr key={article.id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{article.title}</div>
                      <div className="text-xs text-gray-400">/knowledge/{article.slug}</div>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusMap[article.status]?.color || statusMap.draft.color
                        }`}
                      >
                        {statusMap[article.status]?.label || article.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{formatDate(article.published_at)}</td>
                    <td className="px-6 py-3 text-gray-400">{formatDate(article.updated_at)}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/knowledge/${article.id}/edit`}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition hover:border-blue-200 hover:text-blue-600"
                        >
                          编辑
                        </Link>
                        <form action={deleteArticle}>
                          <input type="hidden" name="id" value={article.id} />
                          <ConfirmSubmitButton
                            label="删除"
                            confirmMessage="确定删除这篇文章吗？此操作不可恢复。"
                            className="rounded-lg border border-red-100 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50"
                          />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
