# Modern Blog with Material Design 3

<div align="center">

![Blog Preview](https://picsum.photos/seed/blog/1200/400)

A modern personal blog built with **Astro 5 + React 19 + Material Design 3**, featuring Tailwind CSS v4 and deployed on Cloudflare Pages.

[🇨🇳 中文](./README.md) | **🇺🇸 English**

[![Visit Site](https://img.shields.io/badge/Visit-fans963blog.asia-blue)](https://fans963blog.asia)

</div>

---

## ✨ Features

### 🤖 AI-Powered Development

This project was almost entirely built with AI assistance, demonstrating the potential of AI-driven programming:

- Project architecture design from scratch
- Complex React Aria component integration
- Material Design 3 dynamic color system
- Giscus comment system integration
- Responsive layout optimization

> **"This project proves the viability of AI-assisted programming—from concept to deployment, completed entirely with AI support."**

### 🎨 Material Design 3 Design Language

- **Dynamic Color System** - Real-time generation of complete color schemes based on user-selected theme colors
- **Material You** - Auto-adaptive rounded corners, shadows, and animations
- **Dark Mode** - Complete dark theme support
- **Modern UI** - Cards, ripple effects, and smooth transitions

### ⚡ High-Performance Architecture

- **Astro Islands** - On-demand hydration for optimal first-load performance
- **Zero JS by Default** - JavaScript only loaded for interactive components
- **Static Generation** - Pre-rendered pages, CDN-friendly

### 🛠 Modern Engineering

- **TypeScript** - Complete type safety
- **Tailwind CSS v4** - Modern atomic CSS framework
- **Cloudflare Pages** - Global edge deployment
- **Content Collections** - Type-safe article management

---

## 🧰 Tech Stack

### Core Frameworks

| Technology | Purpose |
|------------|---------|
| [Astro 5.x](https://astro.build) | Static site generation, Islands architecture |
| [React 19](https://react.dev) | Interactive components |
| [TypeScript 5.x](https://www.typescriptlang.org) | Type safety |

### UI & Styling

| Technology | Purpose |
|------------|---------|
| [Material Design 3](https://m3.material.io) | Design system |
| [Tailwind CSS v4](https://tailwindcss.com) | Atomic CSS framework |
| [React Aria Components](https://react-spectrum.adobe/react-aria) | Accessible component library |
| [@material/material-color-utilities](https://github.com/material-foundation/material-color-utilities) | Color generation algorithms |

### Deployment & Tools

| Technology | Purpose |
|------------|---------|
| [Cloudflare Pages](https://pages.cloudflare.com) | Edge deployment |
| [wrangler](https://developers.cloudflare.com/wrangler) | Deployment toolchain |
| [GitHub Actions](https://github.com/features/actions) | CI/CD automation |
| [Giscus](https://giscus.app) | GitHub Discussions comment system |

---

## 📦 Project Structure

```
my-m3-blog/
├── public/                    # Static assets
│   └── fonts/                 # Local font files
├── src/
│   ├── components/            # Components
│   │   ├── react/            # React components (Islands)
│   │   │   ├── Button.tsx    # MD3 buttons
│   │   │   ├── Navbar.tsx    # Navigation bar
│   │   │   ├── ThemeToggle.tsx # Theme toggle
│   │   │   ├── ColorPicker.tsx # Color picker
│   │   │   ├── SearchField.tsx # Search field
│   │   │   └── CategoryFilter.tsx # Category filter
│   │   └── *.astro           # Astro components
│   ├── content/              # Content collections
│   │   └── blog/             # Blog posts (MDX)
│   │       └── *.mdx
│   ├── layouts/              # Page layouts
│   ├── pages/                # Page routes
│   │   ├── index.astro       # Home page
│   │   ├── about.astro       # About page
│   │   └── blog/
│   │       ├── index.astro   # Archive page
│   │       └── [slug].astro  # Article details
│   ├── styles/               # Styles
│   └── utils/                # Utility functions
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── wrangler.jsonc           # Cloudflare configuration
```

---

## 🚀 Quick Start

### Requirements

- Node.js 18+
- Bun or npm

### Install Dependencies

```bash
bun install
# or
npm install
```

### Development Mode

```bash
bun dev
# or
npm run dev
```

Visit `http://localhost:4321`

### Build for Production

```bash
bun build
# or
npm run build
```

### Preview Build

```bash
bun preview
# or
npm run preview
```

---

## 🎨 Theme System

### Preset Theme Colors

| Color Name | Hex Value |
|------------|-----------|
| Blue | `#0066CC` |
| Purple | `#6750A4` |
| Pink | `#7D5260` |
| Green | `#006D3B` |
| Dark Blue | `#0054A5` |
| Orange | `#BE4D25` |
| Magenta | `#9C27B0` |
| Teal | `#00796B` |

### Custom Colors

Users can customize theme colors via the color picker, and the system will automatically:

1. Generate complete color schemes using Material Color Utilities
2. Apply to all CSS variables
3. Support both light and dark modes

---

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| `< 360px` | Minimal layout, hidden text labels |
| `360px - 479px` | Compact layout |
| `480px - 767px` | Mobile layout |
| `768px - 1023px` | Tablet layout |
| `1024px - 1279px` | Desktop layout |
| `≥ 1280px` | Wide screen layout |

---

## 🔧 Configuration

### Modify Site Information

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://your-domain.com', // Change to your domain
  // ...
});
```

### Add New Posts

Create `.mdx` files in the `src/content/blog/` directory:

```markdown
---
title: "Your Article Title"
description: "Article description"
date: 2026-01-04
category: "Category"
tags: ["tag1", "tag2"]
image: "https://example.com/cover.jpg"
featured: false
---

Your article content...
```

---

## 🤝 Contributing

This is an experimental project developed with AI assistance. Contributions are welcome:

- Report issues via GitHub Issues
- Submit PRs to improve the code
- Suggest new features

---

## 📄 License

This project is licensed under the MIT License

---

## 🙏 Acknowledgments

- [Astro](https://astro.build) - Modern static site generator
- [Material Design](https://material.io/design) - Beautiful design system
- [Tailwind CSS](https://tailwindcss.com) - Fast CSS framework
- [Giscus](https://giscus.app) - GitHub Discussions-based comment system
- [Cloudflare Pages](https://pages.cloudflare.com) - Fast global deployment

---

<div align="center">

**Built with ❤️, Powered by 🤖 AI**

</div>
