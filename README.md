# My Blog - Material Design 3 风格现代化博客

<div align="center">

![Blog Preview](https://picsum.photos/seed/blog/1200/400)

一个基于 **Astro + React + Material Design 3** 构建的现代化个人博客网站。

**🇨🇳 中文** | [🇺🇸 English](./README.en.md)

</div>

---

## ✨ 特点

### 🤖 AI Vibe Coding 驱动

这个项目几乎完全由 AI 辅助开发，展现了 AI 编程的无限可能性：

- 从零到一的项目架构设计
- 复杂的 React Aria 组件集成
- Material Design 3 动态颜色系统
- Giscus 评论系统适配
- 响应式布局优化

> **"这个项目证明了 AI 辅助编程的可行性——从概念到上线，全程由 AI 辅助完成。"**

### 🎨 Material Design 3 设计语言

- **动态颜色系统** - 基于用户选择的主题色实时生成完整配色
- **Material You** - 自动适配的圆角、阴影和动效
- **深色模式** - 完整的暗色主题支持
- **现代化 UI** - 卡片、涟漪动画、过渡效果

### ⚡ 高性能架构

- **Astro Islands** - 按需 hydration，极致的首屏性能
- **零 JS 默认** - 只有交互组件才加载 JavaScript
- **静态生成** - 预渲染所有页面，CDN 友好

### 🛠 现代化工程化

- **TypeScript** - 完整的类型安全
- **Tailwind CSS v4** - 现代化的原子化 CSS
- **Cloudflare Pages** - 全球边缘部署
- **Content Collections** - 类型安全的文章管理

---

## 🧰 技术栈

### 核心框架

| 技术 | 用途 |
|------|------|
| [Astro 5.x](https://astro.build) | 静态站点生成，Islands 架构 |
| [React 19](https://react.dev) | 交互式组件 |
| [TypeScript 5.x](https://www.typescriptlang.org) | 类型安全 |

### UI 与样式

| 技术 | 用途 |
|------|------|
| [Material Design 3](https://m3.material.io) | 设计语言系统 |
| [Tailwind CSS v4](https://tailwindcss.com) | 原子化 CSS |
| [React Aria Components](https://react-spectrum.adobe/react-aria) | 无障碍组件库 |
| [@material/material-color-utilities](https://github.com/material-foundation/material-color-utilities) | 颜色生成算法 |

### 部署与工具

| 技术 | 用途 |
|------|------|
| [Cloudflare Pages](https://pages.cloudflare.com) | 边缘部署 |
| [wrangler](https://developers.cloudflare.com/wrangler) |部署工具链 |
| [GitHub Actions](https://github.com/features/actions) | CI/CD 自动化 |
| [Giscus](https://giscus.app) | GitHub Discussions 评论系统 |

---

## 📦 项目结构

```
my-m3-blog/
├── public/                    # 静态资源
│   └── fonts/                 # 本地字体文件
├── src/
│   ├── components/            # 组件
│   │   ├── react/            # React 组件 (Islands)
│   │   │   ├── Button.tsx    # MD3 按钮
│   │   │   ├── Navbar.tsx    # 导航栏
│   │   │   ├── ThemeToggle.tsx # 主题切换
│   │   │   ├── ColorPicker.tsx # 颜色选择器
│   │   │   ├── SearchField.tsx # 搜索框
│   │   │   └── CategoryFilter.tsx # 分类过滤
│   │   └── *.astro           # Astro 组件
│   ├── content/              # 内容集合
│   │   └── blog/             # 博客文章 (MDX)
│   │       └── *.mdx
│   ├── layouts/              # 页面布局
│   ├── pages/                # 页面路由
│   │   ├── index.astro       # 首页
│   │   ├── about.astro       # 关于页
│   │   └── blog/
│   │       ├── index.astro   # 归档页
│   │       └── [slug].astro  # 文章详情
│   ├── styles/               # 样式
│   └── utils/                # 工具函数
├── astro.config.mjs          # Astro 配置
├── tailwind.config.mjs       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
└── wrangler.jsonc           # Cloudflare 配置
```

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- Bun 或 npm

### 安装依赖

```bash
bun install
# 或
npm install
```

### 开发模式

```bash
bun dev
# 或
npm run dev
```

访问 `http://localhost:4321`

### 构建生产版本

```bash
bun build
# 或
npm run build
```

### 预览构建结果

```bash
bun preview
# 或
npm run preview
```

---

## 🎨 主题系统

### 预设主题色

| 颜色名称 | 十六进制值 |
|---------|-----------|
| 蓝色 | `#0066CC` |
| 紫色 | `#6750A4` |
| 粉红 | `#7D5260` |
| 绿色 | `#006D3B` |
| 深蓝 | `#0054A5` |
| 橙色 | `#BE4D25` |
| 紫红 | `#9C27B0` |
| 青绿 | `#00796B` |

### 自定义颜色

用户可以通过颜色选择器自定义主题色，系统会自动：

1. 使用 Material Color Utilities 生成完整配色方案
2. 应用到所有 CSS 变量
3. 同时支持亮色和暗色模式

---

## 📱 响应式设计

| 断点 | 布局 |
|------|------|
| `< 360px` | 极简布局，隐藏文字标签 |
| `360px - 479px` | 紧凑布局 |
| `480px - 767px` | 移动端布局 |
| `768px - 1023px` | 平板布局 |
| `1024px - 1279px` | 桌面布局 |
| `≥ 1280px` | 宽屏布局 |

---

## 🔧 配置

### 修改网站信息

编辑 `astro.config.mjs`：

```javascript
export default defineConfig({
  site: 'https://your-domain.com', // 修改为你的域名
  // ...
});
```

### 添加新文章

在 `src/content/blog/` 目录下创建 `.mdx` 文件：

```markdown
---
title: "你的文章标题"
description: "文章描述"
date: 2026-01-04
category: "分类"
tags: ["标签1", "标签2"]
image: "https://example.com/cover.jpg"
featured: false
---

你的文章内容...
```

---

## 🤝 贡献

这个项目是 AI 辅助开发的实验性项目，欢迎：

- 提 Issue 报告问题
- 提交 PR 改进代码
- 提出功能建议

---

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE)

---

## 🙏 致谢

- [Astro](https://astro.build) - 现代化的静态站点生成器
- [Material Design](https://material.io/design) - 美丽的设计系统
- [Tailwind CSS](https://tailwindcss.com) - 快速的 CSS 框架
- [Giscus](https://giscus.app) - 基于 GitHub Discussions 的评论系统
- [Cloudflare Pages](https://pages.cloudflare.com) - 快速的全球部署

---

<div align="center">

**用 ❤️ 打造，用 🤖 AI 驱动**

</div>
