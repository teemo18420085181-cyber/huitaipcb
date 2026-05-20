import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import {
  getInquiryStatusColor,
  getInquiryStatusLabel,
  INQUIRY_STATUSES,
  normalizeInquiryStatus,
} from '@/lib/admin/inquiries';

async function updateInquiry(formData: FormData) {
  'use server';

  const supabase = await createClient();
  const id = String(formData.get('id') || '');
  const requestedStatus = normalizeInquiryStatus(String(formData.get('status') || 'new'));
  const internalNotes = String(formData.get('internal_notes') || '').trim() || null;
  const now = new Date().toISOString();

  const payload = {
    status: requestedStatus,
    internal_notes: internalNotes,
    updated_at: now,
  };

  const { error } = await supabase.from('inquiries').update(payload).eq('id', id);

  if (error && requestedStatus === 'following') {
    await supabase
      .from('inquiries')
      .update({ ...payload, status: 'reviewing' })
      .eq('id', id);
  }

  redirect(`/admin/inquiries/${id}`);
}

async function archiveInquiry(formData: FormData) {
  'use server';

  const supabase = await createClient();
  const id = String(formData.get('id') || '');
  await supabase
    .from('inquiries')
    .update({
      status: 'closed',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  redirect('/admin/inquiries');
}

function formatSize(bytes?: number | null) {
  if (!bytes) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-sm text-gray-800 break-words">{value || '-'}</div>
    </div>
  );
}

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: inquiry } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (!inquiry) {
    return (
      <div className="p-8 max-w-3xl">
        <Link href="/admin/inquiries" className="text-gray-400 hover:text-gray-600 text-sm">
          ← 返回询盘列表
        </Link>
        <div className="mt-6 bg-white rounded-xl shadow-sm p-10 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">询盘不存在</h1>
          <p className="text-sm text-gray-500">
            该询盘可能已经被归档、删除，或当前链接不正确。
          </p>
        </div>
      </div>
    );
  }

  const { data: files } = await supabase
    .from('inquiry_files')
    .select('*')
    .eq('inquiry_id', id)
    .order('created_at', { ascending: false });

  const filesWithLinks = await Promise.all(
    (files ?? []).map(async (file) => {
      const { data } = await supabase.storage
        .from('inquiry-files')
        .createSignedUrl(file.storage_path, 60 * 60);
      return { ...file, signedUrl: data?.signedUrl ?? null };
    })
  );

  const normalizedStatus = normalizeInquiryStatus(inquiry.status);

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/admin/inquiries" className="text-gray-400 hover:text-gray-600 text-sm">
          ← 返回询盘列表
        </Link>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getInquiryStatusColor(inquiry.status)}`}>
          {getInquiryStatusLabel(inquiry.status)}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-5">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-5">询盘详情</h1>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="客户姓名" value={inquiry.name} />
              <Field label="邮箱" value={inquiry.email} />
              <Field label="手机 / WhatsApp" value={inquiry.phone} />
              <Field label="公司" value={inquiry.company} />
              <Field label="国家" value={inquiry.country} />
              <Field label="来源" value={inquiry.source} />
              <Field label="提交时间" value={new Date(inquiry.created_at).toLocaleString('zh-CN')} />
              <Field label="更新时间" value={new Date(inquiry.updated_at || inquiry.created_at).toLocaleString('zh-CN')} />
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-3">客户留言</h2>
            <div className="text-sm leading-7 text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg border border-gray-100 p-4">
              {inquiry.message}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">上传文件</h2>
            {filesWithLinks.length === 0 ? (
              <div className="text-sm text-gray-400 bg-gray-50 rounded-lg p-5 text-center">暂无上传文件</div>
            ) : (
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                {filesWithLinks.map((file) => (
                  <div key={file.id} className="flex items-center justify-between gap-4 px-4 py-3">
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">{file.file_name}</div>
                      <div className="text-xs text-gray-400">
                        {formatSize(file.file_size)} · {file.mime_type || 'unknown type'}
                      </div>
                    </div>
                    {file.signedUrl ? (
                      <a
                        href={file.signedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 text-xs text-blue-600 hover:underline"
                      >
                        下载文件
                      </a>
                    ) : (
                      <span className="flex-shrink-0 text-xs text-red-500">下载链接生成失败</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">状态与跟进</h2>
            <form action={updateInquiry} className="space-y-4">
              <input type="hidden" name="id" value={inquiry.id} />
              <div>
                <label className="text-xs text-gray-500 mb-1 block">当前状态</label>
                <select
                  name="status"
                  defaultValue={normalizedStatus}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {INQUIRY_STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">备注 / 跟进记录</label>
                <textarea
                  name="internal_notes"
                  defaultValue={inquiry.internal_notes || ''}
                  rows={8}
                  placeholder="记录报价进度、客户要求、下次跟进时间等"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition"
              >
                保存状态和备注
              </button>
            </form>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-2">归档询盘</h2>
            <p className="text-xs text-gray-500 leading-5 mb-4">
              归档后不会出现在默认询盘列表中，避免误删真实客户资料。
            </p>
            <form action={archiveInquiry}>
              <input type="hidden" name="id" value={inquiry.id} />
              <button
                type="submit"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg transition"
              >
                归档该询盘
              </button>
            </form>
          </section>
        </aside>
      </div>
    </div>
  );
}
