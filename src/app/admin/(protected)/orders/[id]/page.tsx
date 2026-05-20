import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '待处理', color: 'bg-yellow-100 text-yellow-700' },
  in_production: { label: '生产中', color: 'bg-blue-100 text-blue-700' },
  shipped: { label: '已发货', color: 'bg-purple-100 text-purple-700' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-700' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-600' },
};

async function updateOrder(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const id = formData.get('id') as string;
  await supabase.from('orders').update({
    status: formData.get('status'),
    product_name: formData.get('product_name'),
    quantity: parseInt(formData.get('quantity') as string) || 0,
    board_amount: parseFloat(formData.get('board_amount') as string) || 0,
    bom_amount: parseFloat(formData.get('bom_amount') as string) || 0,
    unit_price: parseFloat(formData.get('unit_price') as string) || 0,
    total_amount: parseFloat(formData.get('total_amount') as string) || 0,
    notes: formData.get('notes'),
  }).eq('id', id);
  redirect(`/admin/orders/${id}`);
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: o } = await supabase.from('orders').select('*').eq('id', id).single();
  if (!o) notFound();
  const images = [o.image_1, o.image_2, o.image_3].filter(Boolean);

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/orders" className="text-gray-400 hover:text-gray-600 text-sm">← 返回订单列表</Link>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-5">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">客户信息</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusMap[o.status]?.color}`}>{statusMap[o.status]?.label}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-gray-400 text-xs mb-0.5">姓名</div><div className="text-gray-800 font-medium">{o.customer_name}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">公司</div><div className="text-gray-800">{o.company || '-'}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">国家</div><div className="text-gray-800">{o.country || '-'}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">邮箱</div><div className="text-gray-800">{o.email || '-'}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">电话</div><div className="text-gray-800">{o.phone || '-'}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">下单时间</div><div className="text-gray-800">{new Date(o.created_at).toLocaleString('zh-CN')}</div></div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">金额明细</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-gray-400 text-xs mb-0.5">产品名称</div><div className="text-gray-800">{o.product_name || '-'}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">下单数量</div><div className="text-gray-800">{o.quantity || 0} 件</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">制板金额</div><div className="text-gray-800">¥{(o.board_amount||0).toLocaleString()}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">BOM金额</div><div className="text-gray-800">¥{(o.bom_amount||0).toLocaleString()}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">单价</div><div className="text-gray-800">¥{(o.unit_price||0).toLocaleString()}</div></div>
              <div><div className="text-gray-400 text-xs mb-0.5">总成交价格</div><div className="text-2xl font-bold text-blue-600">¥{(o.total_amount||0).toLocaleString()}</div></div>
            </div>
            {o.notes && <div className="mt-4 pt-4 border-t border-gray-100"><div className="text-gray-400 text-xs mb-1">备注</div><div className="text-gray-700 text-sm">{o.notes}</div></div>}
          </div>
          {images.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4">PCB板图</h2>
              <div className="grid grid-cols-3 gap-3">
                {images.map((url: string, i: number) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                    <img src={url} alt={`PCB图${i+1}`} className="w-full h-40 object-cover rounded-lg border border-gray-100 hover:opacity-90 transition cursor-pointer" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">更新订单</h2>
            <form action={updateOrder} className="space-y-3">
              <input type="hidden" name="id" value={o.id} />
              <div>
                <label className="text-xs text-gray-500 mb-1 block">状态</label>
                <select name="status" defaultValue={o.status} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {Object.entries(statusMap).map(([v,{label}]) => <option key={v} value={v}>{label}</option>)}
                </select>
              </div>
              <div><label className="text-xs text-gray-500 mb-1 block">产品名称</label><input name="product_name" defaultValue={o.product_name||''} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="text-xs text-gray-500 mb-1 block">数量</label><input type="number" name="quantity" defaultValue={o.quantity||0} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="text-xs text-gray-500 mb-1 block">制板金额 (¥)</label><input type="number" name="board_amount" defaultValue={o.board_amount||0} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="text-xs text-gray-500 mb-1 block">BOM金额 (¥)</label><input type="number" name="bom_amount" defaultValue={o.bom_amount||0} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="text-xs text-gray-500 mb-1 block">单价 (¥)</label><input type="number" name="unit_price" defaultValue={o.unit_price||0} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="text-xs text-gray-500 mb-1 block">总成交价格 (¥)</label><input type="number" name="total_amount" defaultValue={o.total_amount||0} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="text-xs text-gray-500 mb-1 block">备注</label><textarea name="notes" defaultValue={o.notes||''} rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" /></div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition">保存更新</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
