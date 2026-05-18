import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

interface InquiryNotificationData {
  name: string;
  email: string;
  company?: string;
  country?: string;
  phone?: string;
  message: string;
  fileNames?: string[];
  inquiryId: string;
}

export async function sendInquiryNotification(data: InquiryNotificationData) {
  const to = process.env.INQUIRY_NOTIFICATION_EMAIL || 'teemo18420085181@gmail.com';
  const from = process.env.INQUIRY_FROM_EMAIL || 'noreply@onestoppcba.com';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1A1640;">
      <div style="background: #27215B; color: #fff; padding: 24px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0; font-size: 18px;">📩 新询盘通知 — OneStopPCBA</h2>
        <p style="margin: 8px 0 0; font-size: 12px; color: rgba(255,255,255,.7);">询盘ID: ${data.inquiryId}</p>
      </div>
      <div style="background: #fff; padding: 24px; border: 1px solid #E8E6F0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; font-size: 14px; line-height: 1.7;">
          <tr><td style="padding: 6px 0; color: #6B6783; width: 100px;">客户姓名</td><td><strong>${data.name}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #6B6783;">邮箱</td><td><a href="mailto:${data.email}" style="color: #27215B;">${data.email}</a></td></tr>
          ${data.company ? `<tr><td style="padding: 6px 0; color: #6B6783;">公司</td><td>${data.company}</td></tr>` : ''}
          ${data.country ? `<tr><td style="padding: 6px 0; color: #6B6783;">国家</td><td>${data.country}</td></tr>` : ''}
          ${data.phone ? `<tr><td style="padding: 6px 0; color: #6B6783;">电话</td><td>${data.phone}</td></tr>` : ''}
        </table>
        <div style="margin-top: 18px; padding: 14px; background: #FAFAF8; border-radius: 8px;">
          <div style="font-size: 12px; color: #6B6783; margin-bottom: 6px;">询盘内容</div>
          <div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
        </div>
        ${data.fileNames && data.fileNames.length > 0 ? `
          <div style="margin-top: 14px;">
            <div style="font-size: 12px; color: #6B6783; margin-bottom: 6px;">附件 (${data.fileNames.length})</div>
            <ul style="margin: 0; padding-left: 18px; font-size: 13px;">
              ${data.fileNames.map((n) => `<li>${n}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #E8E6F0;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/inquiries/${data.inquiryId}"
             style="display: inline-block; background: #FCEA0B; color: #27215B; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 13px;">
            查看完整询盘 →
          </a>
        </div>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: `OneStopPCBA <${from}>`,
    to,
    subject: `📩 New Inquiry from ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html,
    replyTo: data.email,
  });
}

export async function sendInquiryConfirmation(
  customerEmail: string,
  customerName: string,
  inquiryId: string
) {
  const from = process.env.INQUIRY_FROM_EMAIL || 'noreply@onestoppcba.com';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1A1640;">
      <div style="background: #27215B; color: #fff; padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <div style="display: inline-block; width: 48px; height: 48px; background: #FCEA0B; border-radius: 12px; line-height: 48px; font-weight: 700; color: #27215B; margin-bottom: 14px;">HT</div>
        <h1 style="margin: 0; font-size: 22px;">Thanks for your inquiry, ${customerName}!</h1>
        <p style="margin: 8px 0 0; font-size: 13px; color: rgba(255,255,255,.7);">Reference: ${inquiryId}</p>
      </div>
      <div style="background: #fff; padding: 28px 24px; border: 1px solid #E8E6F0; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 15px; line-height: 1.7;">We've received your project details and our engineering team is reviewing them now.</p>
        <p style="font-size: 15px; line-height: 1.7;"><strong>What happens next?</strong></p>
        <ul style="font-size: 14px; line-height: 1.8; color: #6B6783;">
          <li>Within <strong>24 hours</strong>, we'll respond with initial feedback and questions.</li>
          <li>If your files are complete, you'll receive a <strong>full turnkey quote</strong>.</li>
          <li>You'll be assigned <strong>one dedicated project engineer</strong> for the entire project.</li>
        </ul>
        <p style="font-size: 14px; line-height: 1.7; color: #6B6783; margin-top: 24px;">Best regards,<br/>The OneStopPCBA Engineering Team</p>
      </div>
      <div style="text-align: center; padding: 20px; font-size: 11px; color: #6B6783;">
        Shenzhen Huitai Electronics Technology Co., Ltd.<br/>
        Bao'an District, Shenzhen, China
      </div>
    </div>
  `;

  return resend.emails.send({
    from: `OneStopPCBA <${from}>`,
    to: customerEmail,
    subject: 'Thanks for your inquiry — we\'ll respond within 24h',
    html,
  });
}
