import Link from 'next/link';
import ArticleForm from '../../ArticleForm';
import { updateArticle } from '../../actions';
import { createClient } from '@/lib/supabase/server';
import type { CmsArticle } from '@/lib/content/articles';

export default async function EditKnowledgeArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from('articles').select('*').eq('id', id).maybeSingle();

  if (!article) {
    return (
      <div className="p-8">
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">文章不存在</h1>
          <p className="mt-2 text-sm text-gray-500">可能已经被删除，或当前账号没有权限查看。</p>
          <Link
            href="/admin/knowledge"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            返回文章列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">编辑文章</h1>
        <p className="mt-1 text-sm text-gray-500">修改后会同步影响前台文章内容和 SEO 信息。</p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <ArticleForm article={article as CmsArticle} action={updateArticle} submitLabel="保存修改" />
      </div>
    </div>
  );
}
