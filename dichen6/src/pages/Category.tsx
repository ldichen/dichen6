import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";
import { usePosts } from "../hooks/usePosts";
import { getCategoryCounts } from "../utils/posts";
import { categories } from "../config/categories";

export const Category: React.FC = () => {
  const { t } = useI18n();
  const { posts, loading } = usePosts();

  const categoryCounts = getCategoryCounts(posts);

  if (loading) {
    return (
      <div className="relative py-12 md:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading categories...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
            <span className="icon-[tabler--folder] w-4 h-4 text-gray-600 dark:text-gray-400"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Organized by topic
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("nav.category")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("nav.category.desc")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => {
            const count = categoryCounts[category.slug] || 0;
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 transition-all duration-300 hover:shadow-2xl hover:border-accent-primary/50 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-6">
                    {/* <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-accent-primary/10 group-hover:scale-110 transition-all">
                      <span
                        className={`${category.icon} w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:text-accent-primary transition-colors`}
                      ></span>
                    </div> */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent-primary transition-colors">
                      {t(`category.${category.id}.name`)}
                    </h2>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                      {count} posts
                    </span>
                  </div>

                  {/* <div className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 prose prose-sm dark:prose-invert max-w-none prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold prose-em:text-gray-700 dark:prose-em:text-gray-300">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {t(`category.${category.id}.desc`)}
                    </ReactMarkdown>
                  </div> */}

                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 group-hover:text-accent-primary font-medium transition-colors">
                    <span>Explore category</span>
                    <span className="icon-[tabler--arrow-right] w-5 h-5 group-hover:translate-x-1 transition-transform"></span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
