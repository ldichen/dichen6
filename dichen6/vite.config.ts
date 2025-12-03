/*
 * @Author: DiChen
 * @Date: 2025-12-02 03:34:25
 * @LastEditors: DiChen
 * @LastEditTime: 2025-12-03 16:09:40
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react(),
  ],
  // 开发环境用 /，生产环境用 /dichen6/
  base: command === "serve" ? "/" : "/dichen6/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
