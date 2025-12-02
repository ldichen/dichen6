# 🚀 Quick Start Guide

## 项目已经完成并可以运行！

开发服务器已经成功启动在 **http://localhost:5173/**

## ✅ 已完成的功能

- ✨ React 19 + TypeScript
- 🎨 TailwindCSS 3 完整配置
- 🌓 深色/浅色模式切换
- 🌍 中英文双语支持
- 📱 完全响应式设计
- 🎯 MDX 博客支持
- 🔄 React Router 路由
- 🎨 Iconify + Tabler Icons
- 📦 Claude 风格设计系统

## 🎯 开发命令

```bash
# 开发模式（已运行在 http://localhost:5173）
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

## 📁 项目结构

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx     ✅ 响应式导航栏
│   │   ├── Footer.tsx     ✅ 精美页脚
│   │   └── Layout.tsx     ✅ 主布局
│   └── home/
│       ├── Hero.tsx        ✅ 引人注目的 Hero 区域
│       └── WritingsSection.tsx  ✅ 博客卡片展示
├── contexts/
│   ├── ThemeContext.tsx   ✅ 主题管理
│   └── I18nContext.tsx    ✅ 国际化
├── pages/
│   ├── Home.tsx          ✅ 首页
│   ├── About.tsx         ✅ 关于页
│   ├── Blogs.tsx         ✅ 博客列表
│   ├── Projects.tsx      ✅ 项目展示
│   └── Category.tsx      ✅ 分类页
└── App.tsx               ✅ 路由配置
```

## 🎨 功能演示

### 1. 主题切换
- 点击右上角的太阳/月亮图标
- 支持系统偏好自动检测
- LocalStorage 持久化

### 2. 语言切换
- 点击右上角的 EN/中文 按钮
- 即时切换所有文本
- LocalStorage 持久化

### 3. 响应式
- 调整浏览器窗口大小
- 移动端：汉堡菜单
- 平板：2列布局
- 桌面：3列布局

## 📝 下一步操作

### 1. 添加你的信息

编辑 [src/contexts/I18nContext.tsx](src/contexts/I18nContext.tsx):
```typescript
const translations = {
  en: {
    "home.greeting": "Your Name",  // 修改这里
    // ... 其他翻译
  },
  zh: {
    "home.greeting": "你的名字",
    // ... 其他翻译
  }
}
```

### 2. 更新社交链接

在以下文件中更新你的社交媒体链接：
- [src/components/layout/Header.tsx](src/components/layout/Header.tsx) - Line 38
- [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx) - Line 14
- [src/components/home/Hero.tsx](src/components/home/Hero.tsx) - Line 93

### 3. 添加你的照片

将你的照片放到：
```
/public/assets/images/photo.png
```

### 4. 自定义颜色

编辑 [tailwind.config.js](tailwind.config.js):
```javascript
accent: {
  primary: '#f97316',   // 主色调
  secondary: '#3b82f6', // 次要色
}
```

### 5. 添加博客文章

在 `src/content/posts/` 创建 `.mdx` 文件：
```mdx
---
title: "文章标题"
date: "2025-12-02"
description: "简短描述"
category: "分类"
tags: ["标签1", "标签2"]
---

你的文章内容...
```

## 🎯 页面路由

- **/** - 首页（Hero + 精选文章）
- **/about** - 关于页
- **/blogs** - 博客列表
- **/projects** - 项目展示
- **/category** - 分类页

## 🎨 设计特点

### Claude 风格配色
- 专业灰度系统（11 级）
- 橙蓝渐变主题
- 完美深浅模式对比

### 精致排版
- Inter 字体（英文）
- Noto Serif SC（中文）
- 完美行高和字间距

### 流畅动画
- fade-in 淡入
- slide-up 上滑
- scale-in 缩放
- hover 悬停效果

### Iconify 图标
使用格式：`icon-[tabler--icon-name]`

浏览图标：https://icon-sets.iconify.design/tabler/

常用图标：
- `icon-[tabler--home]`
- `icon-[tabler--pencil]`
- `icon-[tabler--code]`
- `icon-[tabler--user]`
- `icon-[tabler--mail]`
- `icon-[tabler--brand-x]`
- `icon-[tabler--brand-github]`

## 🐛 常见问题

### Q: 图标不显示？
A: 已经安装 `@iconify-json/tabler`，重启服务器即可。

### Q: 样式不生效？
A: 检查 Tailwind 类名是否正确，或查看浏览器控制台。

### Q: 深色模式不工作？
A: 确保 HTML 标签有 `class="light"` 或 `class="dark"`。

### Q: 语言切换无效？
A: 检查 LocalStorage 是否被禁用。

## 📦 部署

### Vercel
```bash
pnpm build
# 上传 dist/ 文件夹
```

### Netlify
```bash
pnpm build
# 拖拽 dist/ 文件夹到 Netlify
```

### Cloudflare Pages
```bash
# 构建命令: pnpm build
# 输出目录: dist
```

## 🎉 完成！

你的网站已经准备好了！

访问 **http://localhost:5173** 查看效果。

有任何问题请参考：
- [README.md](README.md) - 完整文档
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - 迁移指南
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - 项目总结

祝你使用愉快！🚀
