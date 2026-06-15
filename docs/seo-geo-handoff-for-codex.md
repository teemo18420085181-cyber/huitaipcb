# Huitai PCB — SEO/GEO 协作交接(给 Codex)— 2026-06-13

这份文档把 huitaipcb.com 的 SEO/GEO 优化**规则、纪律、进度、待办**完整整理给你(Codex)。用户已决定把这条主线**完整交给你独立执行**,本文件是你接手需要知道的一切。

---

## 0. 你的角色(Codex 全权执行)

用户已把 huitaipcb.com 的 SEO/GEO 优化**完整交给你(Codex)独立执行**。你能连用户登录的 Chrome、能改代码+部署+拉 GSC/GA4+请求收录,即**全栈自主**。下面是你接手需要的全部规则、进度、待办。

- **执行闭环**:选题/优化 → 改 `knowledge.ts`/`seoPages.ts` 等 → `npm run build` 验证 → commit + push(Vercel 自动部署)→ 线上验证 → 全新 URL 去 GSC 请求收录。
- **触发节奏**:用户说"查数据"→ 连浏览器拉 GSC/GA4 出报告;"继续"→ 做下一篇/优化。**无人值守做不到**(GSC/GA4 需用户登录态在场),所以靠用户一句话手动触发。
- **git 纪律**:动代码前 `git fetch origin` + `git status` 确认本地 HEAD = origin/main;改完**即 commit+push**,别堆未推改动。
- **拉后台数据的坑**:GSC 有 2-3 天延迟;Chrome 会把 GSC/GA4 界面自动翻译成中文(查询词是译文);GA4 标星关键事件点一次即生效,**再点会弹"取消标记"确认框,要选 Cancel**;浏览器偶发 "grouping not supported"(需用户把普通 Chrome 窗口置顶)。
- **遵守下面全部规则(第 2–5 节)。**

---

## 1. 项目与环境

- 站点:**huitaipcb.com**;真实源码 `G:\onestoppcba\onestoppcba`(Next.js App Router + Supabase + Tailwind);部署 = Vercel,**push main 即部署**。
- 品牌:主品牌 **Huitai Electronics**,法律主体 Shenzhen Huitai Electronics Technology Co., Ltd.(仅作 legalName)。**OneStopPCBA 已于 2026-06-12 全面弃用**(可见品牌+结构化数据+邮件模板全切,src 已清零)。
- 真实定位:**无自有工厂的 turnkey PCBA 服务商,靠合作工厂网络**(影响"诚实红线",见第 5 节)。
- 联系:**sales@huitaipcb.com**(2026-06-12 切换,询盘通知双发 sales@+Gmail 过渡);WhatsApp +8618420085181。
- 标识:GSC 资源 `sc-domain:huitaipcb.com`;GA4 property `538821600`,衡量 ID `G-T6N6Q07QRH`。
- 内容架构:静态数组 `src/lib/content/knowledge.ts`(文章)+ `src/lib/content/seoPages.ts`(落地页)+ Supabase CMS(`articles` 表)。详情页 `/knowledge/[slug]` 用 ReactMarkdown 渲染(正文可内链);落地页用 `SeoLandingPage.tsx`(section.body 和 FAQ answer **是纯文本,不能放内链**,内链只能走 relatedLinks 侧栏)。

---

## 2. GEO/SEO 打法规则(playbook)

**同行拆解结论(PCBasic/Wintech 等)**:AI 推荐谁 ≈ 谁写了符合提问形态的内容。同行靠:自写 Top N 榜单自排第一(用真大厂垫底背书)、年份标题保新鲜、对比表+编号 H2+FAQ 纯文本、描述塞硬属性(认证/MOQ/交期/数字)、vs/alternatives 截流文、多源第三方印证。**头部被引用页连 JSON-LD 都没有 → 赢在内容形态,Schema 优先级靠后。**

**小厂策略(我们)**:
- 打**窄场景词做唯一信源**(AI 必须回答、全网只有一篇就引谁),不抢红海大词。
- 蹭 JLCPCB/PCBWay 写 **alternatives/对比截流文**,接它们服务不了的溢出客户。
- 把"小"**量化成可引用属性**(MOQ 1 片、24h 回复、工程师直连)。
- 差异化写法:榜单**带透明披露**("本榜单由我们发布")+ 诚实写"什么时候该选别人" → 比纯自夸更可信、更易被 AI 原样引用。

**内容原则(博主实测+我们验证)**:
- **不买外链**:内容够好自然得链;只走免费路线(目录/Quora/Crunchbase/自然引用)。
- **核心更新期波动别慌**:曝光波动但点击/识别在变准 = 方向对,持续发优质内容穿越。
- **第一人称真实经验(Experience)是护城河**:Google 的 scaled-content-abuse 时代,真实经验/真实影像是区分"真实站 vs 批量站"的硬信号。我们没自有厂,但有真实经验来源:报价台一线模式、真实客户项目(脱敏)、工厂跟单/验厂观察、采购实时信息。**未来用真实样品照/测试视频强化(用户会拍)。**
- 按平台原生方式做内容;Reddit 话题拆解值得补(目前只做了 Quora)。

---

## 3. 数据严谨纪律(Codex 你定的,Claude 已采纳 — 双方都守)

涉及关税/法规/缺料/市场统计等外部数据:
- **关税**:不报统一税率;取决于 HTS 编码/产品分类/原产地/排除条款;政策在变;引用方注明非海关/法律意见。
- **合规红线**:绝不把"第三国最终组装 = 改原产地/降关税"当建议(需 substantial transformation;简单转运 = 规避关税)。
- **缺料**:区分"选择性紧张"(特定高容值/大尺寸 MLCC、特定 MCU 系列,AI 服务器抢产能)vs"全面缺货"(普通 0402/0603 充足);数字带**具体系列+日期+来源**,来源冲突并列不择一;evergreen 文章不钉死时效数字。
- **来源分级**:利益相关方博客(竞品 EMS/厂商自营)市场统计降级,不当独立依据。
- **战略克制**:别因单个未核实数字贸然转移资源(如市场重心);先小规模测试再分配。

---

## 4. 内容生产规范(每篇文章/落地页)

- 开头 **Quick answer**(可被 AI 整段摘录)。
- 用**对比表格**(markdown,文章正文可渲染)、**编号/分点**、清晰 H2。
- **FAQ**:在文章里加一个 heading 正好为 `FAQ` 的 section,body 内用 `### 问题` + 答案 → 自动解析成 **FAQPage 结构化数据**(`extractFaqItemsFromMarkdown`)。落地页用 `faq:` 数组字段,同样生成 schema。
- **内链接进落地页防孤儿**:新文章发布后,接进相关落地页的 `relatedLinks`;文章正文用精准锚文本反链落地页(传权重)。
- **专属封面**:用户 AI 生图(碳黑底+铜金 ENIG 质感、写实工业摄影、shallow DOF、3:2、no text)→ 存 `图片/` → sharp 压缩到 1280px jpg q82(~120-150KB)→ 存 `public/factory/<slug>.jpg` → 改 image 字段。
- **发布后**:build 通过 → push 部署 → 线上验证 → **全新 URL 由 Claude 在 GSC 请求收录**(已收录页内容更新靠自然重爬,重点页可手动请求重爬)。
- 验证脚本套路:本地 `npm run start` + Invoke-WebRequest 探针确认标题/表格/FAQPage schema 条数/内链都在,再部署。

---

## 5. 红线与约束(违反会反伤,严格守)

- ⛔ **英文站绝不碰** reverse engineering / 抄板 / PCB copy / IC unlock / clone / 旧板复刻 —— 海外买家视为侵权信号。虽然实际能做,英文站一字不写。
- ⛔ **不编造**认证(已删未证实的 ISO 声明)、案例数字、产能。
- ⛔ **不假装自有工厂** —— 用"we coordinate / our sourcing desk / 合作产线",不用"our factory"。
- ⛔ 客户信息一律**脱敏**(不点名、遮 logo/可识别特征)。
- 内容**聚焦 PCB/PCBA 核心**(制板+贴片),不往 box-build/整机代工飘(虽接了个 ESP32 整机单,内容不引偏)。
- 替代料**只建议、需客户确认**,有规格/认证含义的不擅自换。

---

## 6. 当前进度(2026-06-13)

**本轮 GEO 已发 4 篇新文章(均带 FAQ schema + 内链成网)**:
1. `top-low-volume-turnkey-pcba-suppliers-china` — Top 7 低批量榜,Huitai #1 带披露,专属封面,**已收录**。
2. `jlcpcb-alternatives-turnkey-pcba` — 截流文,专属封面,**已收录**。
3. `china-pcb-assembly-online-quote-accuracy` — 数据驱动选题(命中真实词 "china pcb assembly online quote"),专属封面,**已请求收录**。
4. `bom-risk-alternative-component-sourcing` — 按第 3 节纪律写(选择性紧张/数字带限定/替代料需确认),**已请求收录**,**封面借用 svc-bom-sourcing.jpg 待换专属**。

**落地页优化**:`china-pcb-assembly` — 标题/meta 从 supplier 聚焦到真实高频词 "service"、加 2 section(英文沟通+质量验证)、加 3 FAQ(FAQ schema 5→8)、relatedLinks 扩充、从 Top 7 文用精准锚文本 "China PCB assembly service" 反链。已请求重爬。

**其他已完成**:全站 og:image 回归修复(commit ccee48c,新建 `src/lib/seo/og.ts` OG_IMAGES 常量补 19 页);域名邮箱切 sales@(commit e635782);GA4 关键事件 generate_lead 已标星;清理 16MB 重复图。

**收录**:GSC 已收录 **33 页**(持续增长)。

---

## 7. 数据现状与瓶颈诊断

- GSC 近 7 天(到 6/12):点击 ~9–14、展示 ~98、CTR ~9.2%、均位 ~54(在涨,方向对)。
- GA4 28 天:用户 ~76、会话 ~112、关键事件 7。**自然搜索流量质量高**(平均 47s、参与率 55%、贡献多数关键事件);直接访问多为爬虫噪音(~11s)。
- **落地页 CTR 瓶颈的真因(按页诊断)**:不是文案问题,是**排名太靠后**。`china-pcb-assembly` 92 展示但排 position 65–82(第 7–8 页),且匹配的多是擦边泛词(product assembly services china)。**内容优化能帮聚焦主题,但第 8 页→前 2 页主要靠外链+时间。**
- **真正瓶颈 = 站外权重/外链**(慢功夫),不是站内。

---

## 8. 待办与选题队列

**内容选题队列(窄词/真实搜索意图优先)**:`pcb lead time`、`AOI vs flying probe vs functional testing`、工业客群窄问题文(工业传感器/边缘AI/机器人/BMS/EV充电,来自市场雷达)、更多细分榜(startups/small-batch)。第二篇关税文(框架须为 "How to Estimate the True Landed Cost of China PCB Assembly",不报固定税率、不教规避)。

**站外/外链**:Crunchbase 已上(进 sameAs);PCBA Finder / PCB Directory 审核中(上线补 sameAs);LinkedIn 公司页等"工作场所验证"开放;Quora 答案 1-2 已发(隔 2-3 天纪律),答案 3 待发;**站外资料包署名邮箱还是旧 Gmail,投放前改 sales@**。

**市场战略**:欧洲/德国优先级可提高(关税逼出),但**不放弃美国**,先 1 个月市场测试看 RFQ/回复率再分配。

**其他**:询盘 Nikita(ESP32 500 台试单)待**英文**跟进(之前发的中文跟进客户可能读不懂)。

---

## 9. 协作约定与授权边界

- **浏览器法做不到无人值守**(GSC/GA4 需用户登录态在场)→ 不做 daily 自动 loop;手动触发:用户说"查数据"→ 拉后台出报告;"继续"→ 做下一篇/优化。
- **部署授权**:构建通过后直接 commit+push 部署(已授权,做完通知);push 前先 `git fetch` 确认无冲突。
- **永远先问**(安全带):发邮件/消息给第三方、注册账号/输密码、花钱、删数据、改账号安全设置、提交真实询盘表单、注册目录账号。
- **格式与数据红线提醒**:改落地页/文章遵守第 4 节(FAQ heading=`FAQ`、内链防孤儿、`SeoLandingPage` 的 section.body 与 FAQ answer 是纯文本不放链接);市场数据严守第 3 节,别 commit 未经核实的统一税率/缺料数字。

---

*维护:本文件随进度更新。最新逐条进度见 Claude 记忆 `seo-geo-monitor`;打法原则见 `geo-playbook`;数据纪律见 `market-data-rigor`。*
