import ArticleForm from '../ArticleForm';
import { createArticle } from '../actions';

export default function NewKnowledgeArticlePage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">新建文章</h1>
        <p className="mt-1 text-sm text-gray-500">保存为草稿或直接发布到前台 Knowledge Base。</p>
      </div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <ArticleForm action={createArticle} submitLabel="保存文章" />
      </div>
    </div>
  );
}
