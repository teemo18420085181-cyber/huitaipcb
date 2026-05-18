# Vercel 部署指南

> 把网站从本地部署到生产环境

## 前置准备

完成以下三个文档：
- [DOMAIN_SETUP.md](DOMAIN_SETUP.md) ✓ 域名已注册
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) ✓ Supabase 已配好
- [EMAIL_SETUP.md](EMAIL_SETUP.md) ✓ Resend 已验证

## 1. 把代码推到 GitHub

```bash
# 在项目根目录
git init
git add .
git commit -m "Initial commit"

# 在 GitHub 创建一个 private 仓库 onestoppcba，然后：
git remote add origin https://github.com/你的用户名/onestoppcba.git
git branch -M main
git push -u origin main
```

> ⚠️ 仓库选 **Private**，不要 Public（避免代码被竞争对手扒）

## 2. 在 Vercel 部署

1. 打开 https://vercel.com，用 GitHub 账号登录
2. **Add New → Project**
3. 选择 `onestoppcba` 仓库 → **Import**
4. **Framework Preset** 自动识别为 Next.js（确认即可）
5. **Environment Variables** 区域，填入：

```
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJxxx...
SUPABASE_SERVICE_ROLE_KEY = eyJxxx...
RESEND_API_KEY = re_xxx...
INQUIRY_NOTIFICATION_EMAIL = teemo18420085181@gmail.com
INQUIRY_FROM_EMAIL = noreply@onestoppcba.com
NEXT_PUBLIC_SITE_URL = https://onestoppcba.com
```

> 这些值就是你 `.env.local` 里的内容

6. **Deploy** → 等 2-3 分钟

部署完成后 Vercel 会给一个临时域名 `onestoppcba.vercel.app`，先打开验证一切正常。

## 3. 绑定自定义域名

1. Vercel 项目 → **Settings → Domains**
2. 输入 `onestoppcba.com` → **Add**
3. Vercel 会显示需要在 Cloudflare 添加的 DNS 记录

回到 Cloudflare → **DNS → Records**，添加：

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | 76.76.21.21 | DNS only |
| CNAME | `www` | cname.vercel-dns.com | DNS only |

> 重要：**Proxy status 选 "DNS only"（灰色云）**，不要橙色云。Vercel 自带 CDN，开 Cloudflare proxy 会冲突。

5-30 分钟后，Vercel 会显示 ✅ Valid Configuration，访问 https://onestoppcba.com 就能看到站点。

## 4. 自动 HTTPS

Vercel 自动配置 Let's Encrypt SSL 证书，访问 https:// 即可。

---

## 5. 后续维护

### 推送代码 = 自动部署

```bash
git add .
git commit -m "update homepage copy"
git push
```

Vercel 监听 GitHub，推送后约 1-2 分钟自动部署到生产环境。

### 预览环境

任何非 main 分支的 push 都会生成预览 URL（独立域名），不影响生产环境。适合改大功能前先看效果。

### 回滚

Vercel Dashboard → Deployments → 找到任一历史版本 → 三点菜单 → **Promote to Production**，瞬间回滚。

---

## 💰 费用

- **Vercel Hobby**：免费（每月 100GB 流量 / 100GB 带宽）
- 业务规模上来后升级 Pro $20/月

前期足够用。

---

## 🐛 常见问题

### 部署成功但访问 500 错误？

检查 Vercel **Project → Logs**，多半是环境变量没填全。

### 询盘表单提交报错？

- 看浏览器开发者工具 Network → 看 `/api/inquiry` 返回什么
- Vercel Logs 也能看 API 的 console.log
- 通常是 Supabase Service Role Key 没填对，或者 Storage bucket 没建

### 邮件没发出？

- Resend Dashboard → **Logs** 看请求记录
- 检查域名验证状态是否 ✅

---

## ✅ 上线检查清单

- [ ] 首页打开正常（含开屏动画）
- [ ] 工厂图片全部正常加载
- [ ] 询盘表单能提交（用真实邮箱测试）
- [ ] 管理员邮箱收到通知邮件
- [ ] 测试客户邮箱收到确认邮件
- [ ] Supabase Table Editor 看到询盘记录
- [ ] Supabase Storage 看到上传的文件
- [ ] HTTPS 证书生效（地址栏小锁）
- [ ] www 和不带 www 都能打开

全部 ✅ 后可以正式宣传引流。
