'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const BUCKET = 'article-images';
const MAX_SIZE = 5 * 1024 * 1024;

const COMMON_SECTIONS = [
  'Quick Answer',
  'The Main Factors That Affect a PCB Assembly Quote',
  'PCB Fabrication Cost',
  'Component Sourcing Cost',
  'SMT and DIP Assembly Cost',
  'Engineering Review and BOM Verification',
  'Testing and Quality Inspection Cost',
  'Order Quantity, Setup Cost, and Lead Time',
  'Why Online PCB Assembly Quotes May Differ From Custom One-Stop PCBA Quotes',
  'What Files Are Needed for an Accurate PCB Assembly Quote?',
  'How to Reduce Your PCBA Cost Without Increasing Risk',
  'FAQ',
  'Ready to Get a PCB Assembly Quote?',
];

type UploadedImage = {
  name: string;
  url: string;
};

export type SectionActionResult = {
  ok: boolean;
  message: string;
  sectionTitle?: string;
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

function markdownFor(image: UploadedImage, altText: string) {
  return `![${altText.trim()}](${image.url})`;
}

function confirmDuplicate(content: string, imageUrl: string) {
  if (!content.includes(imageUrl)) return true;
  return window.confirm('这张图片已经在正文中，是否仍然继续插入？');
}

type ImageUploadFieldProps = {
  slug: string;
  content: string;
  currentCoverImage: string;
  onSetCover: (url: string) => void;
  onInsertMarkdown: (markdown: string) => void;
  onFindSection: (sectionTitle: string) => SectionActionResult;
  onInsertMarkdownAtSection: (sectionTitle: string, markdown: string) => SectionActionResult;
};

type ImageCardProps = {
  image: UploadedImage;
  content: string;
  isCover: boolean;
  onSetCover: (image: UploadedImage) => void;
  onInsertMarkdown: (markdown: string) => void;
  onFindSection: (sectionTitle: string) => SectionActionResult;
  onInsertMarkdownAtSection: (sectionTitle: string, markdown: string) => SectionActionResult;
};

function UploadedImageCard({
  image,
  content,
  isCover,
  onSetCover,
  onInsertMarkdown,
  onFindSection,
  onInsertMarkdownAtSection,
}: ImageCardProps) {
  const [altText, setAltText] = useState(image.name);
  const [sectionTitle, setSectionTitle] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [cardMessageType, setCardMessageType] = useState<'success' | 'error'>('success');

  function showCardMessage(message: string, type: 'success' | 'error' = 'success') {
    setCardMessage(message);
    setCardMessageType(type);
  }

  function requireAltText() {
    if (altText.trim()) return true;
    showCardMessage('请先填写 ALT 文案，再插入正文。', 'error');
    return false;
  }

  function requireSectionTitle() {
    if (sectionTitle.trim()) return true;
    showCardMessage('请输入要查找的章节标题。', 'error');
    return false;
  }

  function handleCopyUrl() {
    void navigator.clipboard.writeText(image.url);
    showCardMessage('图片 URL 已复制。');
  }

  function handleInsertAtCursor() {
    if (!requireAltText()) return;
    if (!confirmDuplicate(content, image.url)) return;

    onInsertMarkdown(`\n\n${markdownFor(image, altText)}\n\n`);
    showCardMessage(`已插入「${image.name}」到当前光标位置。`);
  }

  function handleFindSection() {
    if (!requireSectionTitle()) return;
    const result = onFindSection(sectionTitle);
    showCardMessage(result.message, result.ok ? 'success' : 'error');
  }

  function handleInsertAtSection() {
    if (!requireAltText()) return;
    if (!requireSectionTitle()) return;
    if (!confirmDuplicate(content, image.url)) return;

    const result = onInsertMarkdownAtSection(sectionTitle, markdownFor(image, altText));
    showCardMessage(result.message, result.ok ? 'success' : 'error');
  }

  return (
    <div
      className={`rounded-lg border p-3 ${
        isCover ? 'border-green-200 bg-green-50/70' : 'border-blue-100 bg-white'
      }`}
    >
      <div className="grid gap-3 md:grid-cols-[140px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
          <img src={image.url} alt={altText || image.name} className="h-28 w-full object-cover" />
        </div>

        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
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

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">ALT 文案 *</label>
              <input
                value={altText}
                onChange={(event) => setAltText(event.target.value)}
                placeholder="例如 PCB assembly quote cost breakdown"
                className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">快捷章节</label>
              <select
                value=""
                onChange={(event) => setSectionTitle(event.target.value)}
                className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">选择常用章节</option>
                {COMMON_SECTIONS.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
            <div className="mb-2 text-xs font-semibold text-gray-700">查找并插入</div>
            <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
              <input
                value={sectionTitle}
                onChange={(event) => setSectionTitle(event.target.value)}
                placeholder="输入要查找的章节标题，例如 Component Sourcing Cost"
                className="w-full rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleFindSection}
                className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
              >
                查找章节
              </button>
              <button
                type="button"
                onClick={handleInsertAtSection}
                className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
              >
                插入到该章节下方
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isCover}
              onClick={() => onSetCover(image)}
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
              onClick={handleInsertAtCursor}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
            >
              插入到当前光标位置
            </button>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-50"
            >
              复制图片 URL
            </button>
          </div>

          {cardMessage && (
            <div
              className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                cardMessageType === 'success'
                  ? 'border-green-100 bg-green-50 text-green-700'
                  : 'border-red-100 bg-red-50 text-red-600'
              }`}
            >
              {cardMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ImageUploadField({
  slug,
  content,
  currentCoverImage,
  onSetCover,
  onInsertMarkdown,
  onFindSection,
  onInsertMarkdownAtSection,
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
    const imagesToInsert = uploadedImages.filter((image) => !content.includes(image.url));
    const skippedCount = uploadedImages.length - imagesToInsert.length;

    if (imagesToInsert.length === 0) {
      showNotice('这些图片已经在正文中，没有重复插入。');
      return;
    }

    const markdown = imagesToInsert
      .map((image) => markdownFor(image, image.name || 'PCB assembly article image'))
      .join('\n\n');
    onInsertMarkdown(`\n\n${markdown}\n\n`);
    showNotice(
      skippedCount > 0
        ? `已插入 ${imagesToInsert.length} 张图片到当前光标位置，跳过 ${skippedCount} 张已存在图片。`
        : `已插入 ${imagesToInsert.length} 张图片到当前光标位置。`
    );
  }

  function setAsCover(image: UploadedImage) {
    onSetCover(image.url);
    showNotice(`已将「${image.name}」设为封面图。`);
  }

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm font-medium text-gray-900">文章图片批量上传</div>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            上传到 Supabase Storage：article-images。可一次选择多张，也可以按章节标题自动插入图片，单张不超过 5MB。
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
          {uploadedImages.map((image) => (
            <UploadedImageCard
              key={image.url}
              image={image}
              content={content}
              isCover={currentCoverImage === image.url}
              onSetCover={setAsCover}
              onInsertMarkdown={onInsertMarkdown}
              onFindSection={onFindSection}
              onInsertMarkdownAtSection={onInsertMarkdownAtSection}
            />
          ))}
        </div>
      )}
    </div>
  );
}
