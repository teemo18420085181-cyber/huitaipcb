---
name: contextmd
description: Create or update CONTEXT.md as compact long-term project context. Use when project context becomes complex, important decisions need to be recorded, or future AI sessions need durable business and technical orientation.
---

# 使用场景

项目上下文变复杂，或者需要记录业务目标、项目结构、已完成内容、重要决策、常见坑，方便后续 AI 快速接手。

# 输入

- 当前代码结构。
- 用户已确认的业务信息。
- 已完成的重要功能和风险点。

# 工作步骤

1. 读取现有 `CONTEXT.md`，有内容时合并，不直接覆盖。
2. 从当前代码和已确认信息提炼长期上下文。
3. 用“待确认”标注不确定的业务信息。
4. 保持简洁，只记录未来接手有价值的信息。
5. 更新后检查 diff，确认没有编造内容。

# 输出格式

```text
更新内容：
- ...

依据：
- ...

待确认：
- ...
```

# 禁止事项

- 不要写太长。
- 不要编造业务信息。
- 不要记录无关聊天内容。
- 不要覆盖已有上下文中的有效信息。
