---
name: git-guardrails
description: Protect user changes during multi-file work. Use before and after changes to check git status, avoid overwriting user edits, inspect diffs, avoid auto-commits, and report changed files. Special care: do not touch the untracked video/ directory unless explicitly requested.
---

# 使用场景

每次涉及多文件修改、复杂任务、交付前检查，或用户提醒不要覆盖已有改动。

# 输入

- 当前仓库路径。
- 用户任务目标。
- `git status` 和 `git diff`。

# 工作步骤

1. 修改前查看 `git status`。
2. 识别用户已有改动、未跟踪文件和本次任务范围。
3. 不覆盖用户已有改动；如果冲突，先说明并询问。
4. 修改后查看 `git status` 和 `git diff`。
5. 输出本次改动文件清单。
6. 明确说明是否触碰 `video/`。

# 输出格式

```text
修改前状态：
- ...

本次改动文件：
- ...

未处理文件：
- video/ 保持未处理

提交状态：
- 未提交，等待用户明确指令
```

# 禁止事项

- 不要自动 commit、push 或创建 PR。
- 不要把无关文件加入修改范围。
- 不要删除、移动、修改 `video/`，除非用户明确要求。
- 不要执行破坏性 git 命令，除非用户明确要求并确认。
