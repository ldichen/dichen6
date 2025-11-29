# 分类和标签使用指南

## 概览

你的博客现在支持基于文件夹的分类系统和基于 frontmatter 的标签系统。

## 分类系统（Categories）

### 工作原理

- **分类由文件夹结构决定** - 文章所在的文件夹名称就是它的分类
- **自动提取** - 无需在 frontmatter 中手动指定分类
- **支持多级分类** - 可以使用子文件夹创建层级分类

### 示例

```
src/content/post/
├── frontend/              # 前端分类
│   ├── astro-tips.md     → 分类: frontend
│   └── react-hooks.md    → 分类: frontend
├── cloudflare/           # Cloudflare 分类
│   └── workers.md        → 分类: cloudflare
└── my-article.md         → 分类: uncategorized
```

### 创建新分类

只需创建一个新文件夹并将文章放入其中：

```bash
mkdir -p src/content/post/backend
mv src/content/post/my-api-guide.md src/content/post/backend/
```

### 分类命名规范

- 使用 kebab-case（小写，连字符分隔）：`web-development`
- 避免空格和特殊字符
- 文件夹名会成为 URL 的一部分：`/category/web-development`

## 标签系统（Tags）

### 工作原理

- **在 frontmatter 中手动指定**
- **支持多个标签**
- **跨分类使用**

### 添加标签

在文章的 frontmatter 中添加 `tags` 字段：

```yaml
---
layout: ../../layouts/post.astro
title: 我的文章标题
description: 文章描述
dateFormatted: Jan 8th, 2024
tags: ["JavaScript", "Tutorial", "Performance"]
---
```

### 标签命名建议

- 使用有意义的关键词
- 保持简短和具体
- 可以混合使用大小写
- 常见标签示例：
  - 技术栈：React, Vue, Node.js, Python
  - 类型：Tutorial, Guide, Opinion, News
  - 主题：Performance, Security, SEO, Testing

## 可用页面

构建后会自动生成以下页面：

- `/categories` - 所有分类列表
- `/category/[分类名]` - 某个分类下的所有文章
- `/tags` - 所有标签列表（标签云）
- `/tag/[标签名]` - 某个标签下的所有文章

## 文章示例

### 根目录文章（无分类）

```yaml
---
layout: ../../layouts/post.astro
title: Hello World
description: My first post
dateFormatted: Jan 1, 2024
tags: ["Introduction", "First Post"]
---
```

- 分类：uncategorized
- 标签：Introduction, First Post
- URL：`/post/hello-world`

### 子文件夹文章（有分类）

文件位置：`src/content/post/frontend/react-hooks.md`

```yaml
---
layout: ../../../layouts/post.astro  # 注意：子文件夹需要额外的 ../
title: React Hooks 指南
description: 深入理解 React Hooks
dateFormatted: Jan 15, 2024
tags: ["React", "Hooks", "Tutorial"]
---
```

- 分类：frontend
- 标签：React, Hooks, Tutorial
- URL：`/post/frontend/react-hooks`

### 多级分类文章

文件位置：`src/content/post/frontend/framework/react/hooks-guide.md`

```yaml
---
layout: ../../../../../../layouts/post.astro  # 每多一级目录，多加一个 ../
title: Hooks 完整指南
description: React Hooks 完整教程
dateFormatted: Feb 1, 2024
tags: ["React", "Advanced", "Tutorial"]
---
```

- 分类路径：frontend/framework/react
- 主分类：frontend
- URL：`/post/frontend/framework/react/hooks-guide`

## 最佳实践

### 分类建议

1. **保持简单** - 不要创建太多分类（5-10 个主分类）
2. **清晰明确** - 每篇文章应该明确属于某个分类
3. **层级合理** - 最多 2-3 层子分类
4. **统一命名** - 使用一致的命名风格

### 标签建议

1. **3-5 个标签** - 每篇文章不要超过 5 个标签
2. **混合使用** - 结合技术栈、类型和主题
3. **复用标签** - 使用已有的标签，避免创建过多相似标签
4. **描述性** - 标签应该准确描述文章内容

### 组织建议

```
推荐的文件夹结构：

src/content/post/
├── frontend/           # 前端技术
│   ├── react/
│   ├── vue/
│   └── css/
├── backend/            # 后端技术
│   ├── nodejs/
│   └── python/
├── cloudflare/         # Cloudflare 相关
├── tutorial/           # 教程
└── news/              # 新闻/更新
```

## 迁移现有文章

如果你想将现有文章组织到分类中：

1. 创建分类文件夹
2. 移动文章到对应文件夹
3. 更新文章的 `layout` 路径（每深入一级目录，增加一个 `../`）
4. 添加 `tags` 字段

示例迁移脚本：

```bash
# 创建分类文件夹
mkdir -p src/content/post/cloudflare

# 移动文章
mv src/content/post/cloudflare-*.md src/content/post/cloudflare/

# 然后手动编辑每个文件，更新 layout 路径：
# layout: ../../layouts/post.astro  → layout: ../../../layouts/post.astro
```

## 工具函数

在代码中使用这些工具函数（位于 `src/utils/category.js`）：

```javascript
import {
  getCategoryFromSlug,        // 从 slug 获取分类
  getCategoryPathFromSlug,    // 获取完整分类路径
  formatCategoryName,         // 格式化分类名称显示
  getAllCategories,           // 获取所有分类及文章数
  getAllTags                  // 获取所有标签及文章数
} from '../utils/category.js';
```

## 故障排除

### 构建失败

如果构建时报错 `Could not resolve layout`，检查：

1. 子文件夹中的文章是否使用了正确的相对路径
2. 每深入一级目录，layout 路径需要多一个 `../`

示例：
- `post/article.md` → `layout: ../../layouts/post.astro`
- `post/tech/article.md` → `layout: ../../../layouts/post.astro`
- `post/tech/js/article.md` → `layout: ../../../../layouts/post.astro`

### 分类显示为 uncategorized

- 确保文章在某个子文件夹中
- 根目录下的文章会自动归类为 uncategorized

### 标签不显示

- 检查 frontmatter 中的 `tags` 字段格式是否正确
- 确保使用数组格式：`tags: ["tag1", "tag2"]`
