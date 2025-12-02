# 📝 博客文章快速参考

## 🎯 最简流程

### 1️⃣ 选择分类

| 分类 | 目录 | 主题 |
|------|------|------|
| 满座衣冠似雪 | `Snow-Like/` | 辩论、思维、成长 |
| AI4Everything | `AI4Everything/` | AI、技术、应用 |
| 杂念 | `Idle-Thoughts/` | 随想、思考、问题 |
| 巨人的肩膀 | `Shoulders-of-Giants/` | 学习、摘录、智慧 |

### 2️⃣ 创建文件

```bash
# 格式：日期-标题.mdx
src/content/posts/[分类]/2025-12-02-article-title.mdx
```

### 3️⃣ 写入内容

```mdx
---
title: "文章标题"
date: "2025-12-02"
description: "简短描述（100字以内）"
category: "AI4Everything"  # 选择一个分类
tags: ["标签1", "标签2", "标签3"]
author: "Dichen6"
---

# 正文开始

你的内容...
```

## ✅ 必需字段检查清单

- [ ] `title` - 文章标题
- [ ] `date` - 日期（YYYY-MM-DD）
- [ ] `description` - 描述
- [ ] `category` - 分类（必须是四大分类之一）
- [ ] `tags` - 标签数组
- [ ] `author` - 作者（可选，默认 Dichen6）

## 🚀 快速创建命令

```bash
# 方法 1: 手动创建
cd src/content/posts/AI4Everything
touch 2025-12-02-my-article.mdx

# 方法 2: 使用今天日期
touch src/content/posts/AI4Everything/$(date +%Y-%m-%d)-article.mdx

# 方法 3: 复制模板
cp src/content/posts/AI4Everything/example-ai-post.mdx \
   src/content/posts/AI4Everything/2025-12-02-new-post.mdx
```

## 📍 当前示例文章

已创建 4 篇示例文章供参考：

1. `AI4Everything/example-ai-post.mdx` - AI 主题
2. `Snow-Like/2025-11-25-debate-thinking.mdx` - 辩论思维
3. `Idle-Thoughts/2025-12-01-why-blog.mdx` - 写作思考
4. `Shoulders-of-Giants/2025-11-20-learn-from-masters.mdx` - 学习方法

## 🎨 Markdown 速查

```markdown
# H1 标题
## H2 标题
### H3 标题

**粗体** *斜体* ~~删除线~~

- 列表项
- 列表项

1. 有序列表
2. 有序列表

> 引用文字

[链接](https://example.com)

`行内代码`

​```javascript
// 代码块
const x = 1;
​```
```

## ⚡️ 常见问题

**Q: 文章不显示？**
- 检查 category 是否正确
- 检查 frontmatter 格式
- 确保文件是 .mdx 扩展名

**Q: 图片如何添加？**
- 放在 `/public/images/`
- 引用：`![描述](/images/photo.png)`

**Q: 如何修改分类？**
- 只需修改 frontmatter 中的 `category` 字段

## 📚 详细文档

完整指南请查看：[BLOG_GUIDE.md](./BLOG_GUIDE.md)
