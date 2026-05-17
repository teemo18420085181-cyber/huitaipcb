# 邮箱配置指南

> 配公司邮箱 + 配询盘自动通知

## 第一部分：公司邮箱（Cloudflare Email Routing，免费）

**前提**：域名 onestoppcba.com 已经在 Cloudflare 注册或托管。

### 1. 启用 Email Routing

1. 登录 Cloudflare → 选中 `onestoppcba.com` 域名
2. 左侧菜单 → **Email → Email Routing**
3. 点击 **Get started**
4. Cloudflare 会自动添加 MX 记录，点击 **Add and enable**

### 2. 创建邮件路由

**Destination addresses** 标签页 → **Add destination address**：
- 输入你的 Gmail：`teemo18420085181@gmail.com`
- Cloudflare 会发验证邮件，去 Gmail 点击确认

**Routing rules** 标签页 → **Create address**：

| Custom address | Action | Destination |
|----------------|--------|-------------|
| `sales@onestoppcba.com` | Send to | 你的 Gmail |
| `info@onestoppcba.com` | Send to | 你的 Gmail |
| `support@onestoppcba.com` | Send to | 你的 Gmail |

也可以一行搞定（捕获所有邮件）：
- **Catch-all address** → Send to your Gmail

完成后，发到 `sales@onestoppcba.com` 的邮件会自动转到你的 Gmail。

### 3. 让 Gmail 以公司邮箱身份发送

Gmail → 右上角设置 ⚙ → **查看所有设置 → 帐号和导入 → 用这地址发送邮件 → 添加另一个邮箱地址**：

- 名称：OneStopPCBA Sales
- 电子邮件地址：`sales@onestoppcba.com`
- ❌ 取消勾选 "将其视为别名"
- 下一步 → SMTP 服务器：`smtp.gmail.com` (Port 587)
- 用户名：你的 Gmail
- 密码：使用 Gmail **应用专用密码**（不是 Gmail 登录密码）
  - 应用密码在 Google 帐号 → 安全性 → 两步验证 → 应用专用密码 中创建

完成后，从 Gmail 写邮件时左上角可选发件人为 `sales@onestoppcba.com`。

---

## 第二部分：Resend（询盘自动通知）

询盘提交后，系统会：
1. 发邮件通知你（管理员）
2. 发确认邮件给客户

### 1. 注册 Resend

1. 打开 https://resend.com 注册
2. 验证邮箱

### 2. 添加并验证域名

进入 **Domains → Add Domain → 输入 `onestoppcba.com`**

Resend 会给你 3 条 DNS 记录（SPF / DKIM / DMARC），需要添加到 Cloudflare：

1. 回到 Cloudflare → onestoppcba.com → **DNS → Records**
2. 按 Resend 给出的内容添加 3 条 TXT 记录（每条复制粘贴即可）
3. 添加完点击 Resend 的 **Verify**

通常几分钟内会显示 ✅ Verified。

### 3. 获取 API Key

左侧 → **API Keys → Create API Key**
- 名称：`production`
- 权限：**Full access**

复制密钥，粘贴到 `.env.local` 的 `RESEND_API_KEY`。

### 4. 测试

在项目根目录运行：

```bash
npm run dev
```

访问 http://localhost:3000/contact，提交测试询盘：
- 你的工作邮箱应该收到 "📩 新询盘通知" 邮件
- 测试用的客户邮箱应该收到 "Thanks for your inquiry" 邮件

---

## 💰 费用

- **Cloudflare Email Routing**：永久免费
- **Resend**：3000封/月免费，超出后 $20/月 起

## 🔍 排查

### 收不到通知邮件？

- 检查 `.env.local` 的 `INQUIRY_NOTIFICATION_EMAIL` 是否填了你能收到的邮箱
- 去 Resend Dashboard → **Logs** 看是否有发送记录
- 看 Gmail 垃圾邮件文件夹

### 客户收不到确认邮件？

- 同样在 Resend Logs 检查
- 可能是客户邮箱有反垃圾设置（很正常，不是系统问题）

### 邮件被标为垃圾？

- 确保 SPF/DKIM/DMARC 全部 ✅ Verified
- 不要群发，前期低频发送即可

---

完成这两部分配置后，公司邮箱和询盘自动通知就跑起来了。
