'use client';
import { useState, useRef } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const categories = ['Gerber文件', 'BOM清单', '原理图', 'PCB文件', '测试报告', '其他'];

export default function LibraryClient({ initialFiles }: { initialFiles: any[] }) {
  const [files, setFiles] = useState(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('其他');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [search, setSearch] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleUpload() {
    if (!selectedFile || !title) return;
    setUploading(true);

    try {
      const ext = selectedFile.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: storageError } = await supabase.storage
        .from('library-files')
        .upload(path, selectedFile);

      if (storageError) throw storageError;

      const { data, error: dbError } = await supabase.from('library_files').insert({
        title,
        description,
        category,
        storage_path: path,
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
      }).select().single();

      if (dbError) throw dbError;

      setFiles([data, ...files]);
      setTitle(''); setDescription(''); setCategory('其他');
      setSelectedFile(null); setShowForm(false);
      if (fileRef.current) fileRef.current.value = '';
    } catch (e: any) {
      alert('上传失败：' + e.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleDownload(file: any) {
    const { data } = await supabase.storage.from('library-files').createSignedUrl(file.storage_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, '_blank');
  }

  async function handleDelete(file: any) {
    if (!confirm(`确定删除「${file.title}」？`)) return;
    await supabase.storage.from('library-files').remove([file.storage_path]);
    await supabase.from('library_files').delete().eq('id', file.id);
    setFiles(files.filter(f => f.id !== file.id));
  }

  function formatSize(bytes: number) {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  }

  const filtered = files.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    (f.description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">项目资料库</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          {showForm ? '取消' : '+ 上传文件'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">上传新文件</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">文件标题 *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="例：客户A Gerber文件 2024-01"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">分类</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">备注说明</label>
              <input value={description} onChange={e => setDescription(e.target.value)} placeholder="可选，简单描述文件内容"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 mb-1 block">选择文件 *</label>
              <input ref={fileRef} type="file" onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleUpload} disabled={uploading || !selectedFile || !title}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg transition disabled:opacity-50">
              {uploading ? '上传中...' : '确认上传'}
            </button>
            <button onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 text-sm px-4 py-2">取消</button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索文件..."
          className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-3 text-left font-medium">文件名称</th>
              <th className="px-6 py-3 text-left font-medium">分类</th>
              <th className="px-6 py-3 text-left font-medium">大小</th>
              <th className="px-6 py-3 text-left font-medium">上传时间</th>
              <th className="px-6 py-3 text-left font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">暂无文件，点击「上传文件」添加</td></tr>
            ) : filtered.map(f => (
              <tr key={f.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  <div className="font-medium text-gray-900">{f.title}</div>
                  <div className="text-xs text-gray-400">{f.file_name}</div>
                  {f.description && <div className="text-xs text-gray-400 mt-0.5">{f.description}</div>}
                </td>
                <td className="px-6 py-3">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{f.category || '-'}</span>
                </td>
                <td className="px-6 py-3 text-gray-600">{formatSize(f.file_size)}</td>
                <td className="px-6 py-3 text-gray-400 text-xs">{new Date(f.created_at).toLocaleDateString('zh-CN')}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => handleDownload(f)} className="text-blue-600 hover:underline text-xs">下载</button>
                    <button onClick={() => handleDelete(f)} className="text-red-500 hover:underline text-xs">删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
