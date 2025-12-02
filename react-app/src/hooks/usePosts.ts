/*
 * @Author: DiChen
 * @Date: 2025-12-02 16:11:17
 * @LastEditors: DiChen
 * @LastEditTime: 2025-12-03 03:05:34
 */
import { useState, useEffect } from "react";
import type { Post } from "../utils/posts";

// 使用 Vite 的 import.meta.glob 动态导入所有 MDX 文件
const postModules = import.meta.glob("../content/posts/**/*.{md,mdx}", {
  eager: true,
});

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const loadedPosts: Post[] = [];

      for (const [path, module] of Object.entries(postModules)) {
        try {
          // 从路径中提取信息
          // 例如: ../content/posts/AI4Everything/2025-11-28-example.mdx
          const pathParts = path.split("/");
          const category = pathParts[pathParts.length - 2]; // AI4Everything

          const fileName = pathParts[pathParts.length - 1]
            .replace(".mdx", "")
            .replace(".md", "");

          // 提取日期和 slug
          const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
          const date = dateMatch
            ? dateMatch[1]
            : new Date().toISOString().split("T")[0];
          const slug = dateMatch ? dateMatch[2] : fileName;

          // 获取 frontmatter（从模块中）
          const mod = module as any;
          const frontmatter = mod.frontmatter || {};

          const post: Post = {
            slug: `${category}/${slug}`,
            title: frontmatter.title || fileName,
            date: frontmatter.date || date,
            description: frontmatter.description || "",
            category: frontmatter.category || category,
            tags: frontmatter.tags || [],
            author: frontmatter.author || "Dichen6",
            readTime: calculateReadTime(mod.content || ""),
          };

          loadedPosts.push(post);
        } catch (error) {
          console.error("Error loading post:", path, error);
        }
      }

      // 按日期排序（最新的在前）
      loadedPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setPosts(loadedPosts);
      setLoading(false);
    }

    loadPosts();
  }, []);

  return { posts, loading };
}

// 计算阅读时间
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
