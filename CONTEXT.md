# 项目背景

这是 huitaipcb.com 独立站的本地真实项目，目录为 `G:\onestoppcba\onestoppcba`。代码仓库当前主分支为 `main`。项目用于展示 HuiTai Electronics / OneStopPCBA 的 PCB assembly、turnkey PCBA、BOM sourcing、testing、quality control 等服务，并承接海外客户询盘。

# 业务目标

- 面向海外 B2B 客户展示 PCBA 制造、组装、元器件采购和测试能力。
- 通过 SEO 落地页和知识库获取搜索流量。
- 通过联系页/询盘表单收集客户项目信息、文件和联系方式。
- 通过后台管理询盘、客户、订单、知识库、资料库和反馈。

# 当前网站定位

已知定位：China-based PCB assembly / turnkey PCBA manufacturing website for overseas customers。

待确认：

- 品牌对外统一名称是 `Huitai PCB`、`HuiTai Electronics` 还是 `OneStopPCBA`。
- 当前最终生产域名、历史域名和备用域名的使用策略。
- 是否已有正式 SEO 关键词优先级和内容发布计划。

# 主要页面

- `/`：首页。
- `/services`、`/capabilities`、`/quality`、`/industries`：服务、能力、质量和行业页面。
- `/contact`：询盘入口。
- `/knowledge`、`/knowledge/[slug]`：知识库列表和文章详情。
- SEO 落地页包括 `/pcb-assembly-services`、`/turnkey-pcb-assembly`、`/china-pcb-assembly`、`/prototype-pcb-assembly`、`/low-volume-pcba-assembly`、`/bom-sourcing-pcb-assembly`、`/pcba-testing-quality-control` 等。
- `/privacy`、`/terms`：政策页面。
- `/robots.txt` 和 `/sitemap.xml` 由 `src/app/robots.ts`、`src/app/sitemap.ts` 生成。

# 后台功能

- `/admin/login`：后台登录。
- `/admin` 及受保护路由：需要 Supabase 用户并存在 `admin_users` 记录。
- 后台模块包括 inquiries、orders、customers、knowledge、library、feedback。
- 询盘接口 `src/app/api/inquiry/route.ts` 会写入 Supabase、上传附件到 `inquiry-files` bucket，并通过 Resend 发送通知和确认邮件。
- 反馈接口 `src/app/api/feedback/route.ts` 会写入 `feedback_messages` 表；失败时仍对用户返回成功。

# SEO 现状

- 根布局配置了 metadata、Open Graph、Twitter、robots 和 canonical。
- `src/lib/content/seoPages.ts` 保存多组 SEO 落地页内容。
- `src/lib/content/knowledge.ts`、`articles.ts`、`faq.ts` 等保存知识库和 FAQ 内容。
- `next.config.js` 配置了 `www.huitaipcb.com` 到 `https://huitaipcb.com` 的 301 跳转，以及一个知识库旧 URL 的 301 跳转。
- 待确认：Google Search Console、GA4、真实排名和已索引页面状态。

# 已完成的重要功能

- Next.js App Router 网站结构。
- 首页、服务页、能力页、质量页、行业页、联系页、知识库和多个 SEO 落地页。
- Supabase 数据库 schema、RLS policies、文章和 Storage SQL 文件。
- Supabase 登录后台与 admin 受保护布局。
- 询盘表单 API、附件上传、询盘邮件通知和客户确认邮件。
- 反馈 API 和后台反馈页面。
- Vercel、Supabase、Resend、域名配置说明文档。

# 常见风险

- `README.md` 和部分中文文档/字符串存在编码显示异常，修改前要确认原始意图，避免误删有效内容。
- 当前 `package.json` 中 Next/React 版本较新，但 `eslint-config-next` 和 React types 版本较旧，检查命令可能暴露既有兼容问题。
- `.env.local`、`.env.production` 包含环境相关配置，默认不要修改或输出敏感内容。
- Supabase service role key 只能在服务端使用，不能暴露到客户端。
- 数据库 schema、RLS、Storage bucket、后台权限改动风险高，必须先计划和确认。
- `video/` 是未跟踪目录，除非用户明确要求，不要处理。
- 当前没有 `test` 或 `typecheck` 脚本，验证时不要假装存在。

# 给后续 AI 的注意事项

- 永远在 `G:\onestoppcba\onestoppcba` 工作，不要在临时目录改网站代码。
- 修改前先读相关文件和 `AGENTS.md`，复杂任务先写计划。
- 不要自动 commit、push、删除文件或安装依赖。
- 不要碰 `video/`，除非任务明确要求。
- 涉及页面改动后要访问页面验证；涉及 API/后台/Supabase 后要说明接口和数据验证方式。
- 不确定业务信息时使用“待确认”，不要编造。
