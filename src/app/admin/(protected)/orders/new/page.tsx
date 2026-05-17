'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const statusMap = [
  { value: 'pending', label: '待处理' },
  { value: 'in_production', label: '生产中' },
  { value: 'shipped', label: '已发货' },
  { value: 'completed', label: '已完成' },
  { value: 'cancelled', label: '已取消' },
];

export default function NewOrderPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [form, setForm] = useState({
    customer_name: '', company: '', country: '', email: '', phone: '',
    product_name: '', quantity: '', board_amount: '', bom_amount: '',
    unit_price: '', total_amount: '', status: 'pending', notes: '',
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function uploadImage(file: File) {
    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('order-images').upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from('order-images').getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSubmit() {
    if (!form.customer_name) return alert('请填写客户姓名');
    setSaving(true);
    try {
      const imageUrls = await Promise.all(
        images.map(img => img ? uploadImage(img) : Promise.resolve(null))
      );
      const { error } = await supabase.from('orders').insert({
        ...form,
        quantity: form.quantity ? parseInt(form.quantity) : 0,
        board_amount: form.board_amount ? parseFloat(form.board_amount) : 0,
        bom_amount: form.bom_amount ? parseFloat(form.bom_amount) : 0,
        unit_price: form.unit_price ? parseFloat(form.unit_price) : 0,
        total_amount: form.total_amount ? parseFloat(form.total_amount) : 0,
        image_1: imageUrls[0], image_2: imageUrls[1], image_3: imageUrls[2],
      });
      if (error) throw error;
      router.push('/admin/orders');
    } catch (e: any) {
      alert('保存失败：' + e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/orders" className="text-gray-400 hover:text-gray-600 text-sm">← 返回订单列表</Link>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新建订单</h1>

      <div className="space-y-5">
        {/* 客户信息 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">客户信息</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '客户姓名 *', field: 'customer_name', placeholder: '客户全名' },
              { label: '公司', field: 'company', placeholder: '公司名称' },
              { label: '国家', field: 'country', placeholder: '例：USA' },
              { label: '邮箱', field: 'email', placeholder: 'email@example.com' },
              { label: '电话', field: 'phone', placeholder: '+1 234 567 8900' },
            ].map(item => (
              <div key={item.field}>
                <label className="text-xs text-gray-500 mb-1 block">{item.label}</label>
                <input value={(form as any)[item.field]} onChange={e => set(item.field, e.target.value)}
                  placeholder={item.placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 订单信息 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">订单信息</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">产品名称</label>
              <input value={form.product_name} onChange={e => set('product_name', e.target.value)}
                placeholder="例：4层PCB板"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">下单数量</label>
              <input type="number" value={form.quantity} onChange={e => set('quantity', e.target.value)}
                placeholder="0"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">制板金额 (USD)</label>
              <input type="number" value={form.board_amount} onChange={e => set('board_amount', e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">BOM金额 (USD)</label>
              <input type="number" value={form.bom_amount} onChange={e => set('bom_amount', e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">单价 (USD)</label>
              <input type="number" value={form.unit_price} onChange={e => set('unit_price', e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">总成交价格 (USD)</label>
              <input type="number" value={form.total_amount} onChange={e => set('total_amount', e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">订单状态</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {statusMap.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">备注</label>
              <input value={form.notes} onChange={e => set('notes', e.target.value)}
                placeholder="可选备注"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* 图片上传 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">PCB板图（最多3张）</h2>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <div key={i}>
                <label className="text-xs text-gray-500 mb-1 block">图片 {i + 1}</label>
                {images[i] ? (
                  <div className="relative">
                    <img src={URL.createObjectURL(images[i]!)} alt="" className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                    <button onClick={() => { const arr = [...images]; arr[i] = null; setImages(arr); }}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">✕</button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition">
                    <span className="text-2xl mb-1">📷</span>
                    <span className="text-xs text-gray-400">点击上传</span>
                    <input type="file" accept="image/*" className="hidden"
                      onChange={e => { const arr = [...images]; arr[i] = e.target.files?.[0] || null; setImages(arr); }} />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleSubmit} disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg transition disabled:opacity-50">
            {saving ? '保存中...' : '保存订单'}
          </button>
          <Link href="/admin/orders" className="text-gray-500 hover:text-gray-700 px-4 py-2.5 text-sm">取消</Link>
        </div>
      </div>
    </div>
  );
}
