---
name: pr-review
description: Self-review local changes after implementation. Use after changes to inspect git diff, check for unrelated edits, behavioral regressions, safety, performance, edge cases, and produce a review conclusion before handoff.
---

# 使用场景

修改完成后做自查，或者用户要求 review、本次 diff 检查、交付前检查。

# 输入

- `git status`。
- `git diff`。
- 本次任务目标和修改文件。

# 工作步骤

1. 查看本次 diff 和改动文件清单。
2. 检查是否有无关改动、误删、敏感信息、格式异常。
3. 检查是否破坏已有功能、路由、API、权限、SEO、构建或数据流。
4. 检查安全、性能、边界情况和错误处理。
5. 输出 review 结论、风险和建议。

# 输出格式

```text
Review 结论：
检查点：
- 无关改动：
- 既有功能影响：
- 安全/权限：
- 性能/边界：
- 验证状态：

建议：
- ...
```

# 禁止事项

- 不要自动提交。
- 不要忽略无关改动。
- 不要只说“没问题”，必须说明检查点。
- 不要处理 `video/`，除非用户明确要求。
