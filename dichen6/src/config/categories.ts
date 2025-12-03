export interface CategoryInfo {
  id: string;
  slug: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "ai-adventist",
    slug: "AI-Adventist",
    icon: "icon-[tabler--robot]",
  },
  {
    id: "snow-like",
    slug: "Snow-Like",
    icon: "icon-[tabler--mountain]",
  },
  {
    id: "idle-thoughts",
    slug: "Idle-Thoughts",
    icon: "icon-[tabler--bulb]",
  },
  {
    id: "shoulders-of-giants",
    slug: "Shoulders-of-Giants",
    icon: "icon-[tabler--book]",
  },
];

// 创建一个 id 到分类信息的映射
export const categoryMap = categories.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<string, CategoryInfo>,
);

// 创建一个 id 到 slug 的映射（用于目录名称）
export const categorySlugMap = categories.reduce(
  (acc, category) => {
    acc[category.id] = category.slug;
    return acc;
  },
  {} as Record<string, string>,
);
