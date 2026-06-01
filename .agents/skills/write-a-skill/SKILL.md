---
name: write-a-skill
description: Create a new concise .agents skill when a workflow repeats. Use when the user asks to add a skill, document a repeated process, or turn recurring project work into a reusable SKILL.md.
---

# 使用场景

某个流程反复出现，用户要求创建 Skill，或需要把稳定工作流沉淀为 `.agents/skills/xxx/SKILL.md`。

# 输入

- 重复任务的触发条件。
- 需要的输入、步骤、输出和禁止事项。
- 目标 skill 名称或主题。

# 工作步骤

1. 观察重复任务，确认它适合做成 Skill。
2. 抽象触发条件、输入、步骤、输出格式和禁止事项。
3. 使用小写字母、数字和短横线命名目录。
4. 创建 `.agents/skills/<skill-name>/SKILL.md`。
5. 保持 Skill 小而专注，不把多个大流程塞进一个 Skill。
6. 检查 frontmatter、标题和内容是否完整。

# 输出格式

```text
创建的 Skill：
- .agents/skills/<name>/SKILL.md

触发场景：
- ...

使用方式：
- ...
```

# 禁止事项

- 不要把一个 Skill 写得过大。
- 不要创建无关 README、指南或多余文件。
- 不要缺少 `name` 和 `description` frontmatter。
- 不要覆盖已有 Skill；应先读取并合并。
