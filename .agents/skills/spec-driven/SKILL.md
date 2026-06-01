---
name: spec-driven
description: Turn vague feature or change requests into a clear implementation specification before coding. Use for new features, feature changes, admin changes, SEO changes, page changes, API changes, database-related changes, or multi-file work.
---

# 使用场景

用户要做新功能、改功能、改后台、改 SEO、改页面、改接口、改数据流，或者任务涉及多个文件和较高风险。

# 输入

- 用户的口语需求。
- 当前代码和相关配置。
- 已知业务目标、限制和验收条件。

# 工作步骤

1. 先复述当前理解，把口语需求整理成明确规格。
2. 拆分功能点，区分必须做、可选做和待确认。
3. 标注涉及页面、组件、API、数据表、权限、状态、SEO、环境变量。
4. 列出验收标准和验证方式。
5. 对复杂任务填写 `PLANS.md` 或在对话中输出同样结构的计划。
6. 等用户确认后再进入代码修改。

# 输出格式

```text
任务目标：
当前理解：
涉及范围：
实施步骤：
验收标准：
风险点：
需要确认的问题：
验证方式：
```

# 禁止事项

- 不要直接开始开发。
- 不要自行扩大需求范围。
- 不要把不确定内容当成已确认。
- 不要跳过数据库、权限、SEO、后台影响分析。
- 不要自动 commit。
