/**
 * 从文章 slug 中提取分类
 * @param {string} slug - 文章的 slug，例如 "frontend/astro-tips" 或 "my-article"
 * @returns {string} 分类名称，如果没有分类则返回 "uncategorized"
 */
export function getCategoryFromSlug(slug) {
  const parts = slug.split("/");
  return parts.length > 1 ? parts[0] : "uncategorized";
}

/**
 * 从文章 slug 中提取完整的分类路径（支持多级分类）
 * @param {string} slug - 文章的 slug
 * @returns {string[]} 分类路径数组，例如 ["frontend", "framework", "astro"]
 */
export function getCategoryPathFromSlug(slug) {
  const parts = slug.split("/");
  parts.pop(); // 移除文件名
  return parts.length > 0 ? parts : ["uncategorized"];
}

/**
 * 获取分类的显示名称（将 kebab-case 转换为可读格式）
 * @param {string} category - 分类名称
 * @returns {string} 格式化的分类名称
 */
export function formatCategoryName(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * 从所有文章中提取所有唯一的分类
 * @param {Array} posts - 文章数组
 * @returns {Array} 包含 {name, count, slug} 的分类数组
 */
export function getAllCategories(posts) {
  const categoryMap = new Map();

  for (const post of posts) {
    const category = getCategoryFromSlug(post.slug);
    if (categoryMap.has(category)) {
      categoryMap.set(category, categoryMap.get(category) + 1);
    } else {
      categoryMap.set(category, 1);
    }
  }

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name,
      displayName: formatCategoryName(name),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 从所有文章中提取所有唯一的标签
 * @param {Array} posts - 文章数组
 * @returns {Array} 包含 {name, count, slug} 的标签数组
 */
export function getAllTags(posts) {
  const tagMap = new Map();

  for (const post of posts) {
    const tags = post.data.tags || [];
    for (const tag of tags) {
      if (tagMap.has(tag)) {
        tagMap.set(tag, tagMap.get(tag) + 1);
      } else {
        tagMap.set(tag, 1);
      }
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}
