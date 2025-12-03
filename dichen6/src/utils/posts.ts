import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  author?: string;
  content?: string;
  readTime?: string;
}

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  category: string;
  tags: string[];
  author?: string;
}

// 计算阅读时间（基于字数）
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200; // 平均阅读速度
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// 从 MDX 内容中提取元数据
export function parsePostMetadata(content: string): {
  metadata: PostMetadata;
  content: string;
} {
  const { data, content: postContent } = matter(content);
  return {
    metadata: {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      description: data.description || "",
      category: data.category || "Uncategorized",
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author,
    },
    content: postContent,
  };
}

// 生成 slug（从文件路径或标题）
export function generateSlug(filePath: string, title?: string): string {
  if (title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  const fileName =
    filePath
      .split("/")
      .pop()
      ?.replace(/\.mdx?$/, "") || "";
  return fileName;
}

// 格式化日期
export function formatDate(
  dateString: string,
  locale: "en" | "zh" = "en",
): string {
  const date = new Date(dateString);

  if (locale === "zh") {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// 按日期排序文章
export function sortPostsByDate(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// 按分类过滤文章
export function filterPostsByCategory(posts: Post[], category: string): Post[] {
  return posts.filter((post) => post.category === category);
}

// 按标签过滤文章
export function filterPostsByTag(posts: Post[], tag: string): Post[] {
  return posts.filter((post) => post.tags.includes(tag));
}

// 获取所有唯一的标签
export function getAllTags(posts: Post[]): string[] {
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

// 获取每个分类的文章数量
export function getCategoryCounts(posts: Post[]): Record<string, number> {
  const counts: Record<string, number> = {};
  posts.forEach((post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
  });
  return counts;
}
