'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const BUCKET = 'article-images';
const MAX_SIZE = 5 * 1024 * 1024;

type UploadedImage = {
  name: string;
  url: string;
};

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

function markdownFor(image: UploadedImage) {
  return `![${image.name}](${image.url})`;
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
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    return () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, []);

  function showNotice(message: string) {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 3500);
  }

  async function uploadOne(file: File, index: number): Promise<UploadedImage | null> {
    if (!file.type.startsWith('image/')) {
      setErrors((current) => [...current, `${file.name}: 请选择图片文件。`]);
      return null;
    }

    if (file.size > MAX_SIZE) {
      setErrors((current) => [...current, `${file.name}: 图片不能超过 5MB。`]);
      return null;
    }

    const supabase = createClient();
    const baseSlug = cleanFileName(slug || 'knowledge-article');
    const fileBase = cleanFileName(file.name);
    const path = `knowledge/${baseSlug}/${Date.now()}-${index}-${fileBase}.${fileExtension(file)}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        cacheControl: '31536000',
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      setErrors((current) => [...current, `${file.name}: 上传失败，${uploadError.message}`]);
      return null;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return {
      name: file.name.replace(/\.[^.]+$/, '') || 'PCB assembly article image',
      url: data.publicUrl,
    };
  }

  async function handleUpload(files: FileList) {
    setErrors([]);
    setUploading(true);

    const uploaded: UploadedImage[] = [];
    for (const [index, file] of Array.from(files).entries()) {
      const result = await uploadOne(file, index);
      if (result) uploaded.push(result);
    }

    setUploading(false);

    if (uploaded.length === 0) return;

    setUploadedImages((current) => [...uploaded, ...current]);

    if (!currentCoverImage) {
      onSetCover(uploaded[0].url);
      showNotice(`已上传 ${uploaded.length} 张图片，第一张已自动设为封面图。`);
    } else {
      showNotice(`已上传 ${uploaded.length} 张图片。`);
    }
  }

  function insertAllUploaded() {
    if (uploadedImages.length === 0) return;
    const markdown = uploadedImages.map(markdownFor).join('\n\n');
    onInsertMarkdown(`\n\n${markdown}\n\n`);
    showNotice(`已插入 ${uploadedImages.length} 张图片到当前光标位置。`);
  }

  function setAsCover(image: UploadedImage) {
    onSetCover(image.url);
    showNotice(`已将「${image.name}」设为封面图。`);
  }

  function insertImage(image: UploadedImage) {
    onInsertMarkdown(`\n\n${markdownFor(image)}\n\n`);
    showNotice(`已插入「${image.name}」到当前光标位置。`);
  }

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-medium text-gray-900">文章图片批量上传</div>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            上传到 Supabase Storage：article-images。先把光标放到正文目标位置，再插入图片。可一次选择多张，单张不超过 5MB。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => {
              const files = event.target.files;
              if (files && files.length > 0) void handleUpload(files);
              event.currentTarget.value = '';
            }}
          />
          {uploadedImages.length > 1 && (
            <button
              type="button"
              onClick={insertAllUploaded}
              className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
            >
              全部插入到光标位置
            </button>
          )}
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

      {errors.length > 0 && (
        <div className="mt-3 space-y-1 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      )}

      {notice && (
        <div className="mt-3 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
          {notice}
        </div>
      )}

      {currentCoverImage && (
        <div className="mt-3 rounded-lg border border-green-100 bg-white px-3 py-2 text-xs text-green-700">
          当前封面图已设置，保存文章后生效。
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="mt-4 space-y-3">
          {uploadedImages.map((image) => {
            const isCover = currentCoverImage === image.url;

            return (
              <div
                key={image.url}
                className={`rounded-lg border p-3 ${
                  isCover ? 'border-green-200 bg-green-50/70' : 'border-blue-100 bg-white'
                }`}
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-gray-700">{image.name}</span>
                  {isCover && (
                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-medium text-white">
                      当前封面
                    </span>
                  )}
                </div>
                <input
                  value={image.url}
                  readOnly
                  className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-gray-600"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={isCover}
                    onClick={() => setAsCover(image)}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      isCover
                        ? 'cursor-default border-green-200 bg-green-100 text-green-700'
                        : 'border-blue-200 bg-white text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {isCover ? '已设为封面' : '设为封面图'}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertImage(image)}
                    className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
                  >
                    插入到光标位置
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
