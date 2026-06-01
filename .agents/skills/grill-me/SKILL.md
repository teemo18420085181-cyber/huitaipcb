---
name: grill-me
description: Ask focused clarifying questions before implementation when the user’s request is vague, incomplete, risky, or likely to hide product, SEO, API, database, permission, deployment, or UX pitfalls.
---

# 使用场景

用户需求模糊、不完整、可能有坑，或者实现前需要明确范围、验收标准、业务规则、数据结构、权限、SEO 目标或部署影响。

# 输入

- 用户的初始需求。
- 当前项目上下文。
- 已知风险和不确定点。

# 工作步骤

1. 不急着开发。
2. 找出最关键的不确定点和潜在坑。
3. 优先问 3-5 个关键问题。
4. 帮用户把需求变成可执行版本。
5. 如果可以合理假设，说明假设和影响；高风险处必须等确认。

# 输出格式

```text
我先确认几个关键点：
1. ...
2. ...
3. ...

我目前的默认理解：
- ...

确认后我会按这个范围执行：
- ...
```

# 禁止事项

- 不要一次问太多问题。
- 不要把不确定内容当成已确认。
- 不要在高风险问题未确认前改代码。
- 不要扩大需求范围。
