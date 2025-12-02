import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { useI18n } from "../contexts/I18nContext";
import { usePosts } from "../hooks/usePosts";
import { formatDate } from "../utils/posts";
import { categoryMap, categorySlugMap } from "../config/categories";
import { Pagination } from "../components/ui/Pagination";

const POSTS_PER_PAGE = 5;

export const CategoryDetail: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t, lang } = useI18n();
  const { posts, loading } = usePosts();
  const [currentPage, setCurrentPage] = useState(1);

  if (!categoryId || !categoryMap[categoryId]) {
    return (
      <div className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Category not found
          </h1>
          <Link
            to="/category"
            className="text-gray-700 dark:text-gray-300 hover:text-accent-primary transition-colors"
          >
            Back to categories
          </Link>
        </div>
      </div>
    );
  }

  const categoryDirName = categorySlugMap[categoryId];
  const categoryPosts = posts.filter(
    (post) => post.category === categoryDirName,
  );

  const totalPages = Math.ceil(categoryPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = categoryPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  if (loading) {
    return (
      <div className="relative py-12 md:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-900 dark:border-white border-t-transparent rounded-full"></div>
            <p className="mt-4">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-12 md:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-slide-up">
          <ol className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link
                to="/category"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-primary transition-colors"
              >
                {t("nav.category")}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="icon-[tabler--chevron-right] w-4 h-4"></span>
            </li>
            <li className="text-gray-900 dark:text-white font-medium">
              {t(`category.${categoryId}.name`)}
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="max-w-4xl mb-16 animate-slide-up">
          <div className="flex items-center space-x-4 mb-6">
            {/* <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span
                className={`${category.icon} w-8 h-8 text-gray-600 dark:text-gray-400`}
              ></span>
            </div> */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                {t(`category.${categoryId}.name`)}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {categoryPosts.length}{" "}
                {categoryPosts.length === 1 ? "post" : "posts"}
              </p>
            </div>
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-400 prose prose-lg dark:prose-invert max-w-none prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold prose-em:text-gray-700 dark:prose-em:text-gray-300">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
            >
              {t(`category.${categoryId}.desc`)}
            </ReactMarkdown>
          </div>
        </div>

        {/* Posts Grid */}
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {paginatedPosts.map((post, index) => (
              <article
                key={post.slug}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to={`/post/${post.slug}`}
                  className="relative block border border-transparent border-dashed cursor-pointer p-7 rounded-2xl"
                >
                  {/* Front Layer */}
                  <div className="absolute inset-0 z-20 w-full h-full duration-300 ease-out bg-white border border-dashed dark:bg-gray-950 rounded-2xl border-gray-300 dark:border-gray-600 group-hover:-translate-x-1 group-hover:-translate-y-1" />

                  {/* Shadow Layer */}
                  <div className="absolute inset-0 z-10 w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-gray-300 dark:border-gray-600 group-hover:translate-x-1 group-hover:translate-y-1" />

                  {/* Content */}
                  <div className="relative z-30 duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
                    {/* Title with Arrow */}
                    <h2 className="flex items-center mb-3">
                      <span className="text-base font-bold leading-tight tracking-tight sm:text-lg dark:text-gray-100">
                        {post.title}
                      </span>
                      <svg
                        className="group-hover:translate-x-0 flex-shrink-0 translate-y-0.5 -translate-x-1 w-2.5 h-2.5 stroke-current ml-1 transition-all ease-in-out duration-200 transform"
                        viewBox="0 0 13 15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <g
                            transform="translate(0.666667, 2.333333)"
                            stroke="currentColor"
                            strokeWidth="2.4"
                          >
                            <polyline
                              className="transition-all duration-200 ease-out opacity-0 delay-0 group-hover:opacity-100"
                              points="5.33333333 0 10.8333333 5.5 5.33333333 11"
                            />
                            <line
                              className="transition-all duration-200 ease-out transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                              x1="10.8333333"
                              y1="5.5"
                              x2="0.833333333"
                              y2="5.16666667"
                            />
                          </g>
                        </g>
                      </svg>
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Meta: Date and Tags */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-gray-600 dark:text-gray-400">
                        {formatDate(post.date, lang)}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <>
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="icon-[tabler--mood-empty] w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"></span>
            <p className="text-gray-600 dark:text-gray-400">
              No posts in this category yet.
            </p>
          </div>
        )}

        {categoryPosts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
