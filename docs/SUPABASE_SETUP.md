# Supabase 配置指南

> 数据库 / 用户认证 / 文件存储，一站搞定

## 1. 创建项目（5分钟）

1. 打开 https://supabase.com 注册账号
2. 点击 "New Project"
3. 项目名称：`onestoppcba`
4. **Region 选择 `East US (North Virginia)`**（部署在美国，配合 Vercel 最快）
5. 创建一个强密码并妥善保存
6. 等待项目初始化（约2分钟）

## 2. 获取密钥

项目创建好后，左侧菜单 → **Project Settings → API**：

| 字段 | 用途 | 环境变量 |
|------|------|----------|
| Project URL | 公开 URL | `NEXT_PUBLIC_SUPABASE_URL` |
| anon public key | 客户端用 | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| service_role secret | 服务端用（**不能泄露**） | `SUPABASE_SERVICE_ROLE_KEY` |

把这三个值粘贴到 `.env.local`。

## 3. 初始化数据库

左侧菜单 → **SQL Editor → New query**

### 第一步：建表

打开本项目 `supabase/schema.sql`，复制全部内容粘贴到 SQL Editor，点击 **Run**。

应该看到：`Success. No rows returned`

### 第二步：建安全策略

打开本项目 `supabase/policies.sql`，同样粘贴并 Run。

## 4. 创建 Storage Buckets

左侧菜单 → **Storage → New bucket**，创建以下3个：

| Bucket 名称 | Public? | 用途 |
|------------|---------|------|
| `inquiry-files` | **Private** | 客户提交的 Gerber/BOM |
| `library-files` | **Private** | 内部资料库 |
| `knowledge-covers` | **Public** | 知识库文章封面 |

> ⚠️ `inquiry-files` 和 `library-files` 必须设为 Private，避免客户文件被搜索引擎抓取。

## 5. 创建管理员账号

左侧 → **Authentication → Users → Add user → Create new user**

填入：
- Email：你的工作邮箱
- Password：强密码
- Auto Confirm User：✅勾选

创建后，记下用户 ID（点击用户行可看到 UUID）。

回到 **SQL Editor**，把这个 UUID 加到 admin_users 表：

```sql
insert into public.admin_users (user_id, role, full_name)
values ('刚才记下的UUID', 'admin', '你的姓名');
```

完成。后台 `/admin` 用这个邮箱+密码登录。

## 6. 验证

在本项目根目录运行 `npm run dev`，访问 http://localhost:3000/contact ，提交一个测试询盘，然后到 Supabase 的 **Table Editor → inquiries** 应该能看到记录。

---

## 💰 费用

- **免费额度**：500MB 数据库 + 1GB 文件存储 + 50,000 月活
- **业务规模上来后**：$25/月 升级 Pro 计划

前期完全够用。
