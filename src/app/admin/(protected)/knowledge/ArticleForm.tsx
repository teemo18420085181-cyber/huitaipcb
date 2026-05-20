'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { slugifyTitle, type CmsArticle } from '@/lib/content/article-utils';
import ImageUploadField from './ImageUploadField';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type ArticleFormProps = {
  article?: Partial<CmsArticle>;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

export default function ArticleForm({ article, action, submitLabel }: ArticleFormProps) {
  const editorRootRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState(article?.title || '');
  const [slug, setSlug] = useState(article?.slug || '');
  const [slugEdited, setSlugEdited] = useState(Boolean(article?.slug));
  const [content, setContent] = useState(article?.content || '');
  const [coverImage, setCoverImage] = useState(article?.cover_image || '');

  useEffect(() => {
    if (!slugEdited) {
      setSlug(slugifyTitle(title));
    }
  }, [slugEdited, title]);

  const publishedAt = useMemo(() => {
    if (article?.published_at) return article.published_at;
    if (article?.status === 'published') return new Date().toISOString();
    return '';
  }, [article?.published_at, article?.status]);

  function insertMarkdownAtCursor(markdown: string) {
    const textarea = editorRootRef.current?.querySelector('textarea');

    if (!textarea) {
      setContent((current) => `${current}${markdown}`);
      return;
    }

    const start = textarea.selectionStart ?? content.length;
    const end = textarea.selectionEnd ?? start;

    setContent((current) => {
      const safeStart = Math.min(start, current.length);
      const safeEnd = Math.min(end, current.length);
      return `${current.slice(0, safeStart)}${markdown}${current.slice(safeEnd)}`;
    });

    window.requestAnimationFrame(() => {
      textarea.focus();
      const nextPosition = start + markdown.length;
      textarea.setSelectionRange(nextPosition, nextPosition);
    });
  }

  return (
    <form action={action} className="space-y-5">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="published_at" value={publishedAt} />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-gray-500">标题 *</label>
          <input
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">URL slug *</label>
          <input
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(slugifyTitle(event.target.value));
            }}
            required
            placeholder="how-to-prepare-bom"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">SEO 描述（最多 160 字符）</label>
        <textarea
          name="description"
          defaultValue={article?.description || ''}
          maxLength={160}
          rows={3}
          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_160px_180px]">
        <div>
          <label className="mb-1 block text-xs text-gray-500">封面图 URL（可选）</label>
          <input
            name="cover_image"
            value={coverImage}
            onChange={(event) => setCoverImage(event.target.value)}
            placeholder="/factory/flow-01.png 或 https://..."
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">阅读时间（分钟）</label>
          <input
            name="read_time"
            type="number"
            min={1}
            defaultValue={article?.read_time || 5}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-gray-500">状态</label>
          <select
            name="status"
            defaultValue={article?.status || 'draft'}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">草稿</option>
            <option value="published">发布</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">作者</label>
        <input
          name="author"
          defaultValue={article?.author || 'Huitai Engineering Team'}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ImageUploadField
        slug={slug}
        currentCoverImage={coverImage}
        onSetCover={setCoverImage}
        onInsertMarkdown={insertMarkdownAtCursor}
      />

      <div ref={editorRootRef} data-color-mode="light">
        <label className="mb-1 block text-xs text-gray-500">Markdown 正文</label>
        <p className="mb-2 text-xs text-gray-400">
          插图提示：先把光标放到左侧 Markdown 正文的目标位置，再点击图片的插入按钮。
        </p>
        <MDEditor
          value={content}
          onChange={(value) => setContent(value || '')}
          height={520}
          preview="live"
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {submitLabel}
        </button>
        <Link href="/admin/knowledge" className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
          取消
        </Link>
      </div>
    </form>
  );
}
