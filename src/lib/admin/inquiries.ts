export const INQUIRY_STATUSES = [
  { value: 'new', label: '新询盘' },
  { value: 'following', label: '跟进中' },
  { value: 'quoted', label: '已报价' },
  { value: 'completed', label: '已完成' },
] as const;

export type InquiryStatus = (typeof INQUIRY_STATUSES)[number]['value'];

const statusAliases: Record<string, InquiryStatus> = {
  new: 'new',
  '新询盘': 'new',
  following: 'following',
  reviewing: 'following',
  in_progress: 'following',
  '跟进中': 'following',
  '进行中': 'following',
  quoted: 'quoted',
  '已报价': 'quoted',
  completed: 'completed',
  closed: 'completed',
  '已完成': 'completed',
};

export const INQUIRY_STATUS_COLORS: Record<InquiryStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  following: 'bg-yellow-100 text-yellow-700',
  quoted: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
};

export function normalizeInquiryStatus(status?: string | null): InquiryStatus {
  if (!status) return 'new';
  return statusAliases[status] ?? 'new';
}

export function getInquiryStatusLabel(status?: string | null) {
  const normalized = normalizeInquiryStatus(status);
  return INQUIRY_STATUSES.find((item) => item.value === normalized)?.label ?? '新询盘';
}

export function getInquiryStatusColor(status?: string | null) {
  return INQUIRY_STATUS_COLORS[normalizeInquiryStatus(status)];
}

export function getStatusFilterValues(status: string) {
  const normalized = normalizeInquiryStatus(status);
  return Object.entries(statusAliases)
    .filter(([, value]) => value === normalized)
    .map(([key]) => key);
}
