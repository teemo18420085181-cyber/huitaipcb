# 项目简介

这是 huitaipcb.com 独立站的本地真实项目，项目目录为 `G:\onestoppcba\onestoppcba`。站点面向海外 B2B PCB/PCBA 客户，核心内容包括 PCBA 服务介绍、SEO 落地页、知识库、询盘表单和后台管理。

# 技术栈

- Next.js App Router，源码位于 `src/app`。
- React + TypeScript，路径别名为 `@/* -> ./src/*`。
- Tailwind CSS，配置在 `tailwind.config.ts`。
- Supabase：认证、数据库、Storage，连接代码在 `src/lib/supabase`，SQL 文件在 `supabase/`。
- Resend：询盘通知和客户确认邮件，代码在 `src/lib/email/resend.ts`。
- 表单和校验：`react-hook-form`、`zod`。
- Markdown/文章编辑：`@uiw/react-md-editor`、`react-markdown`、`remark-gfm`。
- 部署目标：Vercel。当前仓库没有发现 `vercel.json`，部署说明在 `docs/DEPLOYMENT.md`。

# 重要目录说明

- `src/app/`：Next.js App Router 页面、布局、API 路由、SEO 文件。
- `src/app/page.tsx`：首页入口。
- `src/app/layout.tsx`：全站根布局、全局 metadata、Analytics 和 JSON-LD 注入。
- `src/app/api/inquiry/route.ts`：询盘提交接口，写入 Supabase、上传文件并发送邮件。
- `src/app/api/feedback/route.ts`：反馈提交接口，写入 Supabase。
- `src/app/admin/`：后台登录、受保护布局、询盘、订单、客户、知识库、资料库、反馈等页面。
- `src/components/`：前台页面组件，如导航、页脚、Hero、询盘表单、SEO 落地页组件等。
- `src/lib/content/`：SEO 页面、知识库、FAQ、文章等内容数据。
- `src/lib/supabase/`：Supabase 客户端和服务端客户端。
- `src/lib/admin/`：后台业务辅助逻辑。
- `src/lib/email/`：Resend 邮件发送逻辑。
- `public/`：Logo、工厂图片、知识库封面等静态资源。
- `docs/`：部署、域名、邮件、Supabase 配置说明。
- `supabase/`：数据库 schema、RLS policy、文章和 Storage 相关 SQL。
- `video/`：当前未跟踪目录。除非用户明确要求，不要删除、移动、修改或纳入提交。

# 本地启动命令

从 `package.json` 确认：

```bash
npm run dev
```

生产模式启动命令：

```bash
npm run start
```

注意：`npm run start` 通常需要先执行 `npm run build`。

# 构建命令

从 `package.json` 确认：

```bash
npm run build
```

# 检查命令

从 `package.json` 确认：

```bash
npm run lint
```

当前 `package.json` 没有定义 `typecheck` 或 `test` 脚本。不要声称已经存在这些命令；如果任务需要类型检查，应先说明项目未配置对应脚本，再征求或说明替代验证方式。

# 开发规则

1. 修改代码前必须先阅读并理解相关文件、调用链和配置。
2. 优先遵循现有目录结构、命名方式、组件风格和 Tailwind 设计规则。
3. 为小问题做最小必要修改，不做无关重构。
4. 保留已有功能、页面、接口和内容，除非用户明确要求删除或替换。
5. 涉及环境变量、Supabase schema/RLS/Storage、登录权限、支付、邮件、部署配置时，必须先说明影响范围和风险。
6. 不确定的信息必须标注疑问并询问用户，不要把猜测写成事实。
7. 前端修改后要检查相关页面是否能正常访问，必要时启动本地服务并用浏览器验证。
8. 后端/API 修改后要检查接口行为、错误处理、环境变量依赖和数据写入路径。
9. 数据库相关修改必须额外说明风险、迁移顺序和回滚方式。
10. 修改完成后必须说明改了哪些文件、为什么改、怎么验证、是否还有风险。
11. 不要自动安装依赖。确需安装时，先说明原因并等待确认。
12. 不要自动 commit、push 或创建 PR，除非用户明确说“可以提交”或提出对应要求。

# 禁止事项

- 不要在 `C:\Users\Administrator\Documents\Codex...` 等临时目录修改网站代码。
- 不要修改、删除、移动 `video/` 未跟踪目录，除非用户明确要求。
- 不要覆盖用户已有改动；修改前后都要查看 `git status`。
- 不要随意改动 `.env.local`、`.env.production`、Supabase service role key、Vercel 配置或生产域名配置。
- 不要为了通过检查而删除功能、隐藏错误或绕开权限。
- 不要把无关文件加入修改范围。
- 不要在未确认需求时开发新功能、改 SEO、改后台或改数据库。

# 每次修改后的验证流程

1. 查看 `git status`，确认只包含本次任务相关文件，且 `video/` 未被处理。
2. 查看 `git diff`，检查是否有无关改动、误删、格式异常或敏感信息。
3. 根据修改类型运行检查：
   - 文档或流程文件：至少检查 diff 和文件内容。
   - 前端页面/组件：运行 `npm run lint`，并访问相关页面。
   - API/后台/Supabase/邮件：运行 `npm run lint`，并说明接口或后台验证方式。
   - 构建或部署相关：运行 `npm run build`，并检查环境变量影响。
4. 如果命令无法运行，要说明失败原因、是否与本次修改有关、替代验证方式。
5. 输出风险和回滚方式；数据库改动必须单独说明回滚 SQL 或恢复方案。

# 交付总结格式

每次交付请按以下格式简短说明：

```text
改动文件：
- path/to/file：改动内容和原因

验证：
- 已运行命令或手动检查结果
- 未运行的命令及原因

风险：
- 已知风险或“暂无发现”

备注：
- 是否涉及业务代码
- 是否处理了 video/
- 是否需要用户确认下一步
```
