# Dichen6 Personal Website

A modern, responsive personal website built with React, TypeScript, TailwindCSS, and MDX.

🎉 **Project is ready and running at http://localhost:5173**

📖 **Quick Start**: See [QUICK_START.md](QUICK_START.md) for immediate next steps!

## Features

✨ **Modern Design System**
- Claude-inspired color palette
- Professional, sophisticated aesthetics
- Smooth animations and transitions

🎨 **Beautiful UI Components**
- Responsive header with smooth scrolling
- Eye-catching hero section
- Card-based blog/project layouts
- Elegant footer

🌓 **Dark/Light Mode**
- Seamless theme switching
- System preference detection
- Persistent user preference

🌍 **Internationalization (i18n)**
- English and Chinese support
- Context-based translation system
- Easy language switching

📱 **Fully Responsive**
- Mobile-first design
- Tablet and desktop optimized
- Perfect display on all devices

🎯 **MDX Support**
- Write blog posts in MDX
- Rich content with React components
- Frontmatter support

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **Routing**: React Router 7
- **Content**: MDX
- **Icons**: Iconify (Tabler Icons)

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── home/           # Hero, WritingsSection
│   └── ui/             # Reusable UI components
├── contexts/           # React contexts (Theme, i18n)
├── pages/              # Page components
├── content/            # MDX content files
│   ├── posts/
│   └── projects/
├── styles/             # Global styles
├── utils/              # Utility functions
└── types/              # TypeScript types
```

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Run development server**
   ```bash
   pnpm dev
   ```

3. **Build for production**
   ```bash
   pnpm build
   ```

4. **Preview production build**
   ```bash
   pnpm preview
   ```

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```js
colors: {
  accent: {
    primary: '#f97316',
    secondary: '#3b82f6',
  }
}
```

### Translations
Update translations in `src/contexts/I18nContext.tsx`:
```typescript
const translations = {
  en: { ... },
  zh: { ... }
}
```

### Content
Add your blog posts in `src/content/posts/` as MDX files with frontmatter:
```mdx
---
title: "My Post"
date: "2025-12-02"
category: "Technology"
---

Your content here...
```

## Design Philosophy

This website follows modern web design principles:

- **Typography**: Carefully chosen font combinations for optimal readability
- **Spacing**: Generous white space for visual balance
- **Layout**: Grid-based responsive layouts
- **Animation**: Subtle, purposeful animations that enhance UX
- **Colors**: Professional palette inspired by Claude's design system
- **Accessibility**: WCAG compliant with proper ARIA labels

## License

MIT
