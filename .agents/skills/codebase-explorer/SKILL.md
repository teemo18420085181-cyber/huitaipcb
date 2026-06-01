---
name: codebase-explorer
description: Explore this project without editing code. Use when the user says “先看看项目”, “这个项目怎么跑”, “帮我了解代码结构”, “先别改代码”, or asks for a project map, stack summary, run commands, entry points, API routes, database files, or deployment configuration.
---

# 使用场景

用户希望先了解项目、运行方式、代码结构、主要入口、API、数据库或部署配置，并明确或暗示暂时不要改代码。

# 输入

- 用户的问题或目标。
- 当前项目目录。
- 可读取的配置文件、源码目录和文档。

# 工作步骤

1. 确认当前目录和分支，读取 `git status`。
2. 读取目录结构，避开无关未跟踪目录，例如当前的 `video/`。
3. 查看 `package.json`、README、Next/Tailwind/TypeScript/PostCSS/ESLint/Vercel/Supabase 相关配置。
4. 找入口文件、主要页面、API 路由、后台目录、数据库 SQL、部署文档和环境变量示例。
5. 从实际文件确认启动、构建、检查命令；不确定时标注“不确定”。
6. 输出项目地图、技术栈、目录用途、命令和注意事项。

# 输出格式

```text
技术栈：
- ...

主要目录：
- ...

命令：
- 启动：...
- 构建：...
- 检查：...

关键发现：
- ...

风险/待确认：
- ...
```

# 禁止事项

- 不要改代码。
- 不要删除、移动或格式化文件。
- 不要自动安装依赖。
- 不要处理 `video/`，除非用户明确要求。
- 不要猜测不存在的命令或配置。
