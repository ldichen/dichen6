/*
 * @Author: DiChen
 * @Date: 2025-04-25 08:23:13
 * @LastEditors: DiChen
 * @LastEditTime: 2025-11-27 16:47:35
 */
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
});
