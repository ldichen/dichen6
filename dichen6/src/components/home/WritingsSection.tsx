import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import { usePosts } from '../../hooks/usePosts';
import { formatDate } from '../../utils/posts';

export const WritingsSection: React.FC = () => {
  const { t, lang } = useI18n();
  const { posts, loading } = usePosts();

  // 只显示最新的 3 篇文章
  const recentPosts = posts.slice(0, 3);

  if (loading) {
    return (
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            Loading posts...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
            <span className="icon-[tabler--pencil] w-4 h-4 text-gray-600 dark:text-gray-400"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('home.writingsSeparator')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('writings.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('writings.description')}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          {recentPosts.map((post, index) => (
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
                  <h3 className="flex items-center mb-3">
                    <span className="text-base font-bold leading-tight tracking-tight sm:text-lg dark:text-gray-100">
                      {post.title}
                    </span>
                    <svg
                      className="group-hover:translate-x-0 flex-shrink-0 translate-y-0.5 -translate-x-1 w-2.5 h-2.5 stroke-current ml-1 transition-all ease-in-out duration-200 transform"
                      viewBox="0 0 13 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                        <g transform="translate(0.666667, 2.333333)" stroke="currentColor" strokeWidth="2.4">
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
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {post.description}
                  </p>

                  {/* Meta: Date, Category, Tags */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-gray-600 dark:text-gray-400">
                      {formatDate(post.date, lang)}
                    </span>
                    {post.category && (
                      <>
                        <span className="text-gray-400 dark:text-gray-600">·</span>
                        <span className="px-2 py-0.5 border border-gray-300 dark:border-gray-700 rounded text-gray-700 dark:text-gray-300">
                          {post.category}
                        </span>
                      </>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <>
                        {post.tags.slice(0, 2).map((tag) => (
                          <React.Fragment key={tag}>
                            <span className="text-gray-400 dark:text-gray-600">·</span>
                            <span className="text-gray-600 dark:text-gray-400">
                              #{tag}
                            </span>
                          </React.Fragment>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center animate-fade-in">
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold transition-all duration-200 hover:scale-105"
          >
            <span>{t('writings.viewAll')}</span>
            <span className="icon-[tabler--arrow-right] w-5 h-5"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};
