'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const BUCKET = 'article-images';
const MAX_SIZE = 5 * 1024 * 1024;

function cleanFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'article-image';
}

function fileExtension(file: File) {
  const fromName = file.name.split('.').pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  if (file.type === 'image/avif') return 'avif';
  return 'jpg';
}

type ImageUploadFieldProps = {
  slug: string;
  currentCoverImage: string;
  onSetCover: (url: string) => void;
  onInsertMarkdown: (markdown: string) => void;
};

export default function ImageUploadField({
  slug,
  currentCoverImage,
  onSetCover,
  onInsertMarkdown,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');

  async function handleUpload(file: File) {
    setError('');

    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件。');
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('图片不能超过 5MB。');
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const baseSlug = cleanFileName(slug || 'knowledge-article');
    const fileBase = cleanFileName(file.name);
    const path = `knowledge/${baseSlug}/${Date.now()}-${fileBase}.${fileExtension(file)}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        cacheControl: '31536000',
        contentType: file.type,
        upsert: false,
      });

    setUploading(false);

    if (uploadError) {
      setError(`上传失败：${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    const publicUrl = data.publicUrl;
    setUploadedUrl(publicUrl);

    if (!currentCoverImage) {
      onSetCover(publicUrl);
    }
  }

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-medium text-gray-900">文章图片上传</div>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            上传到 Supabase Storage：article-images。支持 JPG、PNG、WebP、AVIF，单张不超过 5MB。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleUpload(file);
              event.currentTarget.value = '';
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? '上传中...' : '选择图片上传'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {uploadedUrl && (
        <div className="mt-4 space-y-3">
          <input
            value={uploadedUrl}
            readOnly
            className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-gray-600"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSetCover(uploadedUrl)}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
            >
              设为封面图
            </button>
            <button
              type="button"
              onClick={() => onInsertMarkdown(`\n\n![PCB assembly article image](${uploadedUrl})\n\n`)}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
            >
              插入到正文
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
