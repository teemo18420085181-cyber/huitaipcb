import ConfirmSubmitButton from '../../components/ConfirmSubmitButton';
import { deleteFeedback, togglePublish } from './actions';
import { requireAdminPage } from '@/lib/admin/require-admin-page';

export default async function FeedbackPage() {
  const { supabase } = await requireAdminPage();
  const { data: messages } = await supabase.from('feedback_messages').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">留言管理</h1>
      <div className="space-y-4">
        {(!messages || messages.length === 0) ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-400">暂无留言</div>
        ) : messages.map((msg: any) => (
          <div key={msg.id} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-medium text-gray-900">{msg.name || '匿名'}</span>
              {msg.country && <span className="text-xs text-gray-400">{msg.country}</span>}
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{msg.category}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${msg.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {msg.is_published ? '已发布' : '待审核'}
              </span>
              <span className="text-xs text-gray-400 ml-auto">{new Date(msg.created_at).toLocaleDateString('zh-CN')}</span>
            </div>
            <p className="text-gray-700 text-sm mb-3">{msg.message}</p>
            <div className="flex items-center gap-3">
              <form action={togglePublish} className="flex flex-1 items-center gap-3">
                <input type="hidden" name="id" value={msg.id} />
                <input type="hidden" name="is_published" value={String(msg.is_published)} />
                <input type="text" name="admin_response" defaultValue={msg.admin_response || ''} placeholder="回复内容（可选）"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit"
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${msg.is_published ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                  {msg.is_published ? '取消发布' : '发布'}
                </button>
              </form>
              <form action={deleteFeedback}>
                <input type="hidden" name="id" value={msg.id} />
                <ConfirmSubmitButton
                  label="删除"
                  confirmMessage="确定删除这条留言？此操作不可恢复。"
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
