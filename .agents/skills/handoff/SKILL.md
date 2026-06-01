---
name: handoff
description: Produce a concise handoff document for another AI, developer, or future session. Use when the user wants to transfer context, continue later, summarize completed and remaining work, or prepare a copyable handoff.
---

# 使用场景

用户需要把任务交给另一个 AI、开发者或下一轮会话，或者希望生成可复制的交接文档。

# 输入

- 当前任务目标。
- 已完成和未完成内容。
- 关键文件、命令、验证结果和风险。

# 工作步骤

1. 总结项目背景和当前目录。
2. 总结已完成内容和未完成内容。
3. 列出关键文件和它们的作用。
4. 说明运行、构建、检查方式。
5. 总结风险点、待确认问题和下一步建议。
6. 输出可复制的交接文档。

# 输出格式

```text
项目背景：
已完成：
未完成：
关键文件：
运行方式：
验证结果：
风险点：
下一步：
```

# 禁止事项

- 不要编造未确认信息。
- 不要遗漏未解决风险。
- 不要把无关聊天内容写进交接。
- 不要自动提交。
