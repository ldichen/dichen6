# Migration Guide: Astro to React

## Overview

This guide explains how to migrate your content from the old Astro project to the new React application.

## Content Migration

### Blog Posts

1. **Location**: Move your blog posts from the old project's `src/content/post/` to the new `src/content/posts/`

2. **Format**: Your existing MDX files should work with minimal changes. Ensure frontmatter follows this format:

```mdx
---
title: "Your Post Title"
date: "2025-12-02"
description: "A brief description"
category: "Category Name"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Images and Assets

1. **Images**: Place images in `/public/assets/images/`
2. **Reference in content**: Use `/assets/images/your-image.png`

### Project Data

Update the projects array in [src/pages/Projects.tsx](src/pages/Projects.tsx) with your actual project data:

```typescript
const projects = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    technologies: ["React", "TypeScript"],
    link: "https://github.com/...",
    status: "Active",
  },
  // Add more projects
];
```

### About Page

Update your experience and bio in [src/pages/About.tsx](src/pages/About.tsx):

```typescript
const experiences = [
  {
    title: "Your Role",
    company: "Company Name",
    period: "2020 - Present",
    description: "What you did",
  },
];
```

## Customization

### Personal Information

Update these files with your information:

1. **i18n Translations**: [src/contexts/I18nContext.tsx](src/contexts/I18nContext.tsx)
   - Update all translation strings
   - Add your personal information

2. **Social Links**:
   - [src/components/layout/Header.tsx](src/components/layout/Header.tsx)
   - [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)
   - Update Twitter, GitHub, Email links

3. **Hero Section**: [src/components/home/Hero.tsx](src/components/home/Hero.tsx)
   - Add your photo to `/public/assets/images/photo.png`
   - Update skills list

### Styling

The color scheme is inspired by Claude's design. To customize:

1. **Colors**: Edit [tailwind.config.js](tailwind.config.js)
   ```js
   colors: {
     accent: {
       primary: '#your-color',
       secondary: '#your-color',
     }
   }
   ```

2. **Fonts**: Update in [tailwind.config.js](tailwind.config.js) and [src/index.css](src/index.css)

### Categories

Update category data in [src/pages/Category.tsx](src/pages/Category.tsx):

```typescript
const categories = [
  {
    id: 'your-category-slug',
    name: '中文名称',
    nameEn: 'English Name',
    description: 'Category description',
    icon: 'icon-[tabler--icon-name]',
    count: 0, // Will be dynamic later
  },
];
```

## Features Implemented

✅ Responsive design (mobile, tablet, desktop)
✅ Dark/Light mode with system preference detection
✅ i18n (English/Chinese)
✅ Modern, Claude-inspired design
✅ TailwindCSS with custom design system
✅ MDX support for blog posts
✅ Routing with React Router
✅ Smooth animations and transitions
✅ Iconify integration (Tabler icons)

## Next Steps

1. **Content**: Migrate your existing blog posts
2. **Images**: Add your photos and project images
3. **Personalize**: Update all personal information
4. **Deploy**: Build and deploy to your hosting platform

## Running the App

```bash
# Development
pnpm dev

# Build
pnpm build

# Preview production build
pnpm preview
```

## Building for Production

```bash
pnpm build
```

The built files will be in the `dist` folder, ready to deploy to any static hosting service (Vercel, Netlify, Cloudflare Pages, etc.).

## Deployment

This is a static React app that can be deployed to:

- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag & drop the `dist` folder
- **Cloudflare Pages**: Connect your repo
- **GitHub Pages**: Use `gh-pages` branch

Build command: `pnpm build`
Output directory: `dist`

## Tips

1. **Icons**: Browse available icons at https://icon-sets.iconify.design/tabler/
   - Use format: `icon-[tabler--icon-name]`

2. **Responsive Design**: Use Tailwind's responsive prefixes:
   - `sm:` (640px+)
   - `md:` (768px+)
   - `lg:` (1024px+)
   - `xl:` (1280px+)

3. **Dark Mode**: Use `dark:` prefix for dark mode styles
   - Example: `bg-white dark:bg-gray-900`

4. **Animations**: Pre-configured animations available:
   - `animate-fade-in`
   - `animate-slide-up`
   - `animate-scale-in`

## Support

If you encounter any issues during migration, check:

1. Console errors in browser dev tools
2. Terminal output for build errors
3. React DevTools for component issues

Happy coding! 🚀
