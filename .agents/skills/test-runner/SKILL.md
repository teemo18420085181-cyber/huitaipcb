---
name: test-runner
description: Run and report the project’s available checks after code changes. Use after modifications to identify package.json scripts, run relevant lint/build/test commands, distinguish new failures from pre-existing issues, and summarize validation status.
---

# 使用场景

每次完成代码修改后，或用户要求“跑一下检查”“验证一下”“看看构建是否通过”。

# 输入

- 本次修改的文件。
- `package.json` scripts。
- 项目配置和可用测试/构建工具。

# 工作步骤

1. 从 `package.json` 识别可用命令，不要猜测不存在的脚本。
2. 根据改动范围选择相关命令：文档改动可只做 diff 检查，代码改动至少考虑 lint，构建/部署相关考虑 build。
3. 运行命令并记录结果。
4. 如果失败，判断是本次修改导致还是项目原有问题；证据不足时标注待确认。
5. 输出验证结论和对交付的影响。

# 输出格式

```text
已运行命令：
- ...

通过项：
- ...

失败项：
- ...

失败原因：
- ...

是否影响本次交付：
- ...
```

# 禁止事项

- 不要声称运行了没有运行的命令。
- 不要忽略失败输出。
- 不要把项目原有问题直接归因于本次修改。
- 不要自动安装依赖。
