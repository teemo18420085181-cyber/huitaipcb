import {
  Resend,
  type CreateEmailOptions,
  type CreateEmailRequestOptions,
  type CreateEmailResponse,
} from 'resend';
import type { DeliveryStatus, FilesStatus } from '@/lib/inquiry/types';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export interface FileDeliverySummary {
  status: Exclude<FilesStatus, 'pending'>;
  expectedCount: number;
  savedCount: number;
  savedFileNames: string[];
}

export interface InquiryNotificationData {
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  message: string;
  inquiryId: string;
  files: FileDeliverySummary;
}

interface InquiryConfirmationData {
  customerEmail?: string;
  customerName: string;
  inquiryId: string;
  files: FileDeliverySummary;
}

export interface EmailDeliveryResult {
  status: Exclude<DeliveryStatus, 'pending'>;
  messageId?: string;
  errorCode?: 'resend_error' | 'resend_exception' | 'resend_unconfigured';
}

export type EmailSender = (
  payload: CreateEmailOptions,
  options?: CreateEmailRequestOptions
) => Promise<CreateEmailResponse>;

interface EmailDeliveryOptions {
  configured?: boolean;
  send?: EmailSender;
}

const defaultSend: EmailSender = (payload, options) =>
  resend.emails.send(payload, options);

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character] || character);
}

function safeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function safeAdminInquiryUrl(inquiryId: string): string | undefined {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return undefined;

  try {
    const origin = new URL(siteUrl).origin;
    return new URL(`/admin/inquiries/${encodeURIComponent(inquiryId)}`, origin).toString();
  } catch {
    return undefined;
  }
}

function adminFileStatusHtml(files: FileDeliverySummary): string {
  if (files.status === 'not_required') {
    return '<div style="margin-top: 14px; color: #6B6783;">附件状态：未提交附件</div>';
  }

  const savedList = files.savedFileNames.length > 0
    ? `<ul style="margin: 6px 0 0; padding-left: 18px; font-size: 13px;">${files.savedFileNames
      .map((name) => `<li>${escapeHtml(name)}</li>`).join('')}</ul>`
    : '';

  if (files.status === 'saved') {
    return `<div style="margin-top: 14px;"><strong>附件状态：全部保存 (${files.savedCount} / ${files.expectedCount})</strong>${savedList}</div>`;
  }

  if (files.status === 'partial') {
    return `<div style="margin-top: 14px; padding: 12px; background: #FFF7E6; color: #7A4B00; border-radius: 8px;"><strong>附件状态：部分保存 (${files.savedCount} / ${files.expectedCount})</strong><br/>警告：附件未完整保存，请联系客户补发缺失文件。${savedList}</div>`;
  }

  return `<div style="margin-top: 14px; padding: 12px; background: #FFF0F0; color: #8A1C1C; border-radius: 8px;"><strong>附件状态：保存失败 (0 / ${files.expectedCount})</strong><br/>警告：附件未完整保存，请联系客户重新发送。</div>`;
}

function customerFileStatusHtml(files: FileDeliverySummary): string {
  if (files.status === 'not_required') return '';
  if (files.status === 'saved') {
    return `<p style="font-size: 14px; line-height: 1.7; color: #35633D;">All ${files.expectedCount} attachment${files.expectedCount === 1 ? '' : 's'} were received with your inquiry.</p>`;
  }
  if (files.status === 'partial') {
    return `<p style="font-size: 14px; line-height: 1.7; color: #8A5200;"><strong>Attachment warning:</strong> We saved ${files.savedCount} of ${files.expectedCount} attachments; please resend the missing file${files.expectedCount - files.savedCount === 1 ? '' : 's'} when our team contacts you.</p>`;
  }
  return `<p style="font-size: 14px; line-height: 1.7; color: #8A1C1C;"><strong>Attachment warning:</strong> We could not save your ${files.expectedCount} attachment${files.expectedCount === 1 ? '' : 's'}. Your inquiry details were saved, but please resend the attachments when our team contacts you.</p>`;
}

export function renderInquiryNotificationHtml(data: InquiryNotificationData): string {
  const adminUrl = safeAdminInquiryUrl(data.inquiryId);
  const link = adminUrl
    ? `<div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #E8E6F0;"><a href="${escapeHtml(adminUrl)}" style="display: inline-block; background: #FCEA0B; color: #27215B; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px;">查看完整询盘 →</a></div>`
    : '';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1A1640;">
      <div style="background: #27215B; color: #fff; padding: 24px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0; font-size: 18px;">📩 新询盘通知 — Huitai PCB</h2>
        <p style="margin: 8px 0 0; font-size: 12px; color: rgba(255,255,255,.7);">询盘ID: ${escapeHtml(data.inquiryId)}</p>
      </div>
      <div style="background: #fff; padding: 24px; border: 1px solid #E8E6F0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; font-size: 14px; line-height: 1.7;">
          <tr><td style="padding: 6px 0; color: #6B6783; width: 100px;">客户姓名</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #6B6783;">邮箱</td><td><a href="mailto:${escapeHtml(data.email)}" style="color: #27215B;">${escapeHtml(data.email)}</a></td></tr>
          ${data.company ? `<tr><td style="padding: 6px 0; color: #6B6783;">公司</td><td>${escapeHtml(data.company)}</td></tr>` : ''}
          ${data.country ? `<tr><td style="padding: 6px 0; color: #6B6783;">国家</td><td>${escapeHtml(data.country)}</td></tr>` : ''}
          ${data.phone ? `<tr><td style="padding: 6px 0; color: #6B6783;">电话</td><td>${escapeHtml(data.phone)}</td></tr>` : ''}
        </table>
        <div style="margin-top: 18px; padding: 14px; background: #FAFAF8; border-radius: 8px;">
          <div style="font-size: 12px; color: #6B6783; margin-bottom: 6px;">询盘内容</div>
          <div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
        </div>
        ${adminFileStatusHtml(data.files)}
        ${link}
      </div>
    </div>
  `;
}

export function renderInquiryConfirmationHtml(data: InquiryConfirmationData): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1A1640;">
      <div style="background: #27215B; color: #fff; padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <div style="display: inline-block; width: 48px; height: 48px; background: #FCEA0B; border-radius: 12px; line-height: 48px; font-weight: 700; color: #27215B; margin-bottom: 14px;">HT</div>
        <h1 style="margin: 0; font-size: 22px;">Thanks for your inquiry, ${escapeHtml(data.customerName)}!</h1>
        <p style="margin: 8px 0 0; font-size: 13px; color: rgba(255,255,255,.7);">Reference: ${escapeHtml(data.inquiryId)}</p>
      </div>
      <div style="background: #fff; padding: 28px 24px; border: 1px solid #E8E6F0; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 15px; line-height: 1.7;">We've received your project details and our engineering team is reviewing them now.</p>
        ${customerFileStatusHtml(data.files)}
        <p style="font-size: 15px; line-height: 1.7;"><strong>What happens next?</strong></p>
        <ul style="font-size: 14px; line-height: 1.8; color: #6B6783;">
          <li>We typically respond within <strong>1 business day</strong> with initial feedback and questions.</li>
          <li>Once the required files are complete, we can prepare a <strong>turnkey PCBA quotation</strong> covering PCB fabrication, component sourcing and assembly.</li>
          <li>You will have a dedicated project contact who coordinates with our engineering and production teams throughout your project.</li>
        </ul>
        <p style="font-size: 14px; line-height: 1.7; color: #6B6783; margin-top: 24px;">Best regards,<br/>The Huitai PCB Engineering Team</p>
      </div>
      <div style="text-align: center; padding: 20px; font-size: 11px; color: #6B6783;">
        Shenzhen Huitai Electronics Technology Co., Ltd.<br/>
        Bao'an District, Shenzhen, China
      </div>
    </div>
  `;
}

async function deliverEmail(
  payload: CreateEmailOptions,
  idempotencyKey: string,
  options: EmailDeliveryOptions
): Promise<EmailDeliveryResult> {
  const configured = options.configured ?? Boolean(process.env.RESEND_API_KEY);
  if (!configured) {
    return { status: 'skipped_unconfigured', errorCode: 'resend_unconfigured' };
  }

  try {
    const result = await (options.send ?? defaultSend)(payload, {
      idempotencyKey,
    });
    if (result.error || !result.data?.id) {
      return { status: 'failed', errorCode: 'resend_error' };
    }
    return { status: 'sent', messageId: result.data.id };
  } catch {
    return { status: 'failed', errorCode: 'resend_exception' };
  }
}

export async function sendInquiryNotification(
  data: InquiryNotificationData,
  options: EmailDeliveryOptions = {}
): Promise<EmailDeliveryResult> {
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL
    ? process.env.INQUIRY_NOTIFICATION_EMAIL.split(',').map((value) => value.trim())
    : ['sales@huitaipcb.com', 'teemo18420085181@gmail.com'];
  const from = process.env.INQUIRY_FROM_EMAIL || 'noreply@huitaipcb.com';

  return deliverEmail({
    from: `Huitai PCB <${from}>`,
    to,
    subject: `📩 New Inquiry from ${safeHeaderValue(data.name)}${data.company ? ` (${safeHeaderValue(data.company)})` : ''}`,
    html: renderInquiryNotificationHtml(data),
    replyTo: safeHeaderValue(data.email),
  }, `inquiry-admin-${data.inquiryId}`, options);
}

export async function sendInquiryConfirmation(
  customerEmail: string,
  customerName: string,
  inquiryId: string,
  files: FileDeliverySummary,
  options: EmailDeliveryOptions = {}
): Promise<EmailDeliveryResult> {
  const from = process.env.INQUIRY_FROM_EMAIL || 'noreply@huitaipcb.com';

  return deliverEmail({
    from: `Huitai PCB <${from}>`,
    to: safeHeaderValue(customerEmail),
    subject: 'Thanks for your inquiry — we typically respond within 1 business day',
    html: renderInquiryConfirmationHtml({ customerName, inquiryId, files }),
  }, `inquiry-customer-${inquiryId}`, options);
}
