# Round 1.5 增量更新说明

## 这次更新了什么

✅ **新开屏动画**：粒子从四面八方聚合成你的 Logo（4秒，比之前短得多）
✅ **导航修复**：
  - 点击各栏目能正常跳转
  - 鼠标悬停有黄色下划线
  - 当前所在页面有持续的黄色下划线高亮
✅ **5个内页**：Services / Capabilities / Quality / Industries / Knowledge —— 每个都是完整页面，不会再 404

---

## 怎么应用更新（3 分钟）

### 方式 A：直接覆盖（推荐）

1. 把 `onestoppcba_update` 文件夹里的 `src` 整个**拷贝**到你项目根目录
2. Windows 会询问是否覆盖，选 **"替换文件"**
3. 如果项目正在跑（`npm run dev` 还开着），保存后会自动刷新页面

具体来说：
- 把 `onestoppcba_update/src/components/Splash.tsx` 覆盖 `G:\onestoppcba\onestoppcba\src\components\Splash.tsx`
- 把 `onestoppcba_update/src/components/Nav.tsx` 覆盖 `G:\onestoppcba\onestoppcba\src\components\Nav.tsx`
- 新增 `onestoppcba_update/src/components/PageShell.tsx` 到对应位置
- 新增 5 个内页文件夹（services / capabilities / quality / industries / knowledge）

### 方式 B：用 Codex CLI

在你的项目根目录运行 Codex，让它"应用更新包到当前项目"，把这个文件夹指给它。

---

## 文件清单

```
src/
├── components/
│   ├── Splash.tsx           ← 替换（新开屏动画）
│   ├── Nav.tsx              ← 替换（hover + 高亮）
│   └── PageShell.tsx        ← 新增（内页通用骨架）
└── app/
    ├── services/page.tsx       ← 新增
    ├── capabilities/page.tsx   ← 新增
    ├── quality/page.tsx        ← 新增
    ├── industries/page.tsx     ← 新增
    └── knowledge/page.tsx      ← 新增
```

---

## 验证

应用完成后，刷新浏览器，应该看到：

1. **开屏**：黑色宇宙背景 → 彩色粒子从四周飞向中心 → 聚合成 HT Logo + 黄/绿弧线 → 3层冲击波 → "ONESTOPPCBA"文字浮现 → 进入网站（约4秒）
2. **导航**：鼠标悬停 Services / Capabilities / Quality / Industries / Knowledge 都会出现黄色下划线，点击进入相应页面后下划线保持高亮
3. **内页**：每个页面都有标题、特性卡片网格、"More details coming soon"提示

如果开屏一直循环或者卡住，刷新一下页面（F5）即可。
