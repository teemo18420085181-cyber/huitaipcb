# 域名配置指南

> 注册 onestoppcba.com 并接入 Cloudflare

## 1. 注册域名

### 推荐：Cloudflare Registrar（最便宜，无溢价）

1. 打开 https://dash.cloudflare.com 注册账号
2. 左侧菜单 → **Domain Registration → Register Domains**
3. 搜索 `onestoppcba.com`
4. 如果可用，约 **$10.44/年**（.com 成本价）
5. 完成支付，立即使用

> ⚠️ **不要**在国内域名商（阿里云/腾讯云）注册，理由：
> - 需要实名认证 + ICP 备案（针对国内服务器，但你部署在美国不需要）
> - 转出麻烦
> - 与 Cloudflare 配合差

### 备选：Namecheap（如果 Cloudflare 不能用）

https://namecheap.com 注册，约 $13/年，注册完成后**立即转到 Cloudflare 管理 DNS**。

## 2. 接入 Cloudflare（如果不是 Cloudflare 注册的）

1. 登录 Cloudflare → 左上角 **Add a site**
2. 输入 `onestoppcba.com`
3. 选 **Free** 计划（足够用）
4. Cloudflare 会自动扫描现有 DNS 记录（如果有）
5. 提供 2 个 nameserver，把它们填到 Namecheap 的 **Nameservers** 设置里
6. 等待 5-30 分钟生效

确认在 Cloudflare Dashboard 顶部看到 ✅ Active 状态。

## 3. 域名备用方案

如果 `onestoppcba.com` 被人抢注：

| 备选 | 说明 |
|------|------|
| `onestoppcba.co` | 价格略贵但短 |
| `onestop-pcba.com` | 加连字符 |
| `onestoppcba.io` | 科技感强但贵 |
| `1stoppcba.com` | 数字替换 |

---

## 4. 后续操作

域名注册完毕后：

1. 配置邮箱 → 见 [EMAIL_SETUP.md](EMAIL_SETUP.md)
2. 配置邮件服务 → 见 [EMAIL_SETUP.md](EMAIL_SETUP.md)
3. 绑定到 Vercel → 见 [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 💰 总成本估算

| 项目 | 年费 |
|------|------|
| Cloudflare Registrar 域名 | $10.44 |
| Cloudflare Free（DNS+CDN+SSL） | $0 |
| Cloudflare Email Routing | $0 |
| **小计** | **$10.44/年** |
