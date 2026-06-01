---
name: diagnose
description: Diagnose broken behavior with minimal fixes. Use when the user says “报错了”, “打不开”, “不生效”, “构建失败”, “部署失败”, “后台空白”, “页面 404”, or reports runtime, build, deployment, API, admin, or page failures.
---

# 使用场景

项目出现报错、页面打不开、修改不生效、构建失败、部署失败、后台空白、API 异常或页面 404。

# 输入

- 用户描述、报错截图或日志。
- 本地终端输出、浏览器控制台、构建日志、Vercel/Supabase/Resend 相关信息。
- 相关源码和配置。

# 工作步骤

1. 先复现问题或读取错误日志。
2. 确认最近改动和当前 `git status`，避免覆盖用户改动。
3. 定位可能原因，区分前端、API、数据库、环境变量、部署和数据问题。
4. 给出最小修复方案。
5. 只改必要文件。
6. 修完后运行相关检查命令，并说明是否解决。

# 输出格式

```text
现象：
定位过程：
原因：
修复文件：
验证：
仍需关注：
```

# 禁止事项

- 不要大范围重构。
- 不要猜测式修复。
- 不要隐藏未解决的问题。
- 不要删除已有功能来绕过错误。
- 不要处理无关文件或 `video/`。
