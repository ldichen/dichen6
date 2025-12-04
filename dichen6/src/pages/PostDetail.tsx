import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";
import { formatDate } from "../utils/posts";
import { TableOfContents } from "../components/TableOfContents";
import { Comments } from "../components/Comments";
import { usePosts } from "../hooks/usePosts";

interface PostContent {
  default: React.ComponentType;
  frontmatter?: {
    title: string;
    date: string;
    description?: string;
    category: string;
    tags?: string[];
    author?: string;
  };
}

// Load all MDX modules eagerly
const postModules = import.meta.glob("../content/posts/**/*.{md,mdx}", {
  eager: true,
}) as Record<string, PostContent>;

export const PostDetail: React.FC = () => {
  const { "*": postPath } = useParams<{ "*": string }>();
  const { t, lang } = useI18n();
  const { posts } = usePosts();
  const [postContent, setPostContent] = useState<PostContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postPath) {
      setError("Post not found");
      setLoading(false);
      return;
    }

    // Load the MDX file dynamically
    const loadPost = () => {
      try {
        // Parse the post path to get category and slug
        // postPath format: "AI4Everything/example-ai-post" or "AI4Everything/2025-11-28-example-ai-post"
        const parts = postPath.split("/");
        const category = parts[0]; // e.g., "AI4Everything"
        const slug = parts.slice(1).join("/"); // e.g., "example-ai-post"

        console.log("Looking for post:", { postPath, category, slug });

        // Search through all loaded modules to find matching post
        let foundModule: PostContent | null = null;

        for (const [path, module] of Object.entries(postModules)) {
          // path format: "../content/posts/AI4Everything/example-ai-post.mdx"
          // or "../content/posts/AI4Everything/2025-11-28-example-ai-post.mdx"

          console.log("Checking path:", path);

          // Check if this path matches our category and slug
          if (
            path.includes(`/${category}/`) &&
            (path.endsWith(`/${slug}.mdx`) ||
              path.includes(`-${slug}.mdx`) ||
              path.endsWith(`/${slug}.md`) ||
              path.includes(`-${slug}.md`))
          ) {
            foundModule = module;
            console.log("Found matching module:", path);
            break;
          }
        }

        if (!foundModule) {
          console.error(
            "Post not found. Available modules:",
            Object.keys(postModules)
          );
          throw new Error("Post not found");
        }

        // Check if frontmatter exists
        if (!foundModule.frontmatter) {
          console.error("Module found but has no frontmatter:", foundModule);
          throw new Error("Post has no metadata");
        }

        setPostContent(foundModule);
        setLoading(false);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("Post not found");
        setLoading(false);
      }
    };

    loadPost();
  }, [postPath]);

  if (loading) {
    return (
      <div className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-900 dark:border-white border-t-transparent rounded-full"></div>
            <p className="mt-4">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !postContent || !postContent.frontmatter) {
    return (
      <div className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="icon-[tabler--mood-sad] w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4"></span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The post you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-accent-primary hover:text-white transition-colors"
          >
            <span className="icon-[tabler--arrow-left] w-5 h-5"></span>
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  const { frontmatter } = postContent;
  const PostComponent = postContent.default;

  // Find current post index and get prev/next posts
  const currentPostIndex = posts.findIndex((post) => post.slug === postPath);
  const prevPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost =
    currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  return (
    <div className="relative py-16 md:py-24">
      {/* Outer container: centered and includes Post + ToC */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Flex container: Post and ToC side by side */}
        <div className="flex justify-between gap-8">
          <div>
            {/* Post content */}
            <article className="max-w-5xl flex-shrink-0 w-full">
              {/* Breadcrumb */}
              <nav className="mb-8 animate-slide-up">
                <ol className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      to="/blogs"
                      className="text-gray-600 dark:text-gray-400 hover:text-accent-primary transition-colors"
                    >
                      Blogs
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="icon-[tabler--chevron-right] w-4 h-4"></span>
                  </li>
                  <li>
                    <Link
                      to={`/category/${frontmatter.category.toLowerCase()}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-accent-primary transition-colors"
                    >
                      {t(`category.${frontmatter.category.toLowerCase()}.name`)}
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <span className="icon-[tabler--chevron-right] w-4 h-4"></span>
                  </li>
                  <li className="text-gray-900 dark:text-white font-medium truncate">
                    {frontmatter.title}
                  </li>
                </ol>
              </nav>

              {/* Post Header */}
              <header className="mb-12 animate-slide-up">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {frontmatter.title}
                </h1>

                {/* Description */}
                {frontmatter.description && (
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {frontmatter.description}
                  </p>
                )}

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <span className="icon-[tabler--user] w-5 h-5"></span>
                    <span>{frontmatter.author || "Dichen6"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="icon-[tabler--calendar] w-5 h-5"></span>
                    <time dateTime={frontmatter.date}>
                      {formatDate(frontmatter.date, lang)}
                    </time>
                  </div>
                </div>
              </header>

              {/* Post Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none animate-fade-in
              prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-a:text-accent-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-accent-primary prose-code:before:content-[''] prose-code:after:content-['']
              prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 dark:prose-pre:border-gray-700 prose-pre:text-gray-100
              prose-blockquote:border-l-accent-primary prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
              prose-img:rounded-xl prose-img:shadow-lg
              prose-hr:border-gray-200 dark:prose-hr:border-gray-800
              prose-li:text-gray-700 dark:prose-li:text-gray-300
              prose-table:text-gray-700 dark:prose-table:text-gray-300
              prose-th:text-gray-900 dark:prose-th:text-white
              prose-td:border-gray-200 dark:prose-td:border-gray-800"
              >
                <PostComponent />
              </div>

              {/* Tags Section */}
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="mt-16 border-gray-200 dark:border-gray-800 animate-fade-in">
                  <div className="flex flex-wrap gap-3">
                    {frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="icon-[tabler--tag] w-4 h-4"></span>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous/Next Post Navigation */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
                <div className="flex justify-between items-center gap-4">
                  {/* Previous Post */}
                  {prevPost ? (
                    <Link
                      to={`/post/${prevPost.slug}`}
                      className="flex-1 group"
                    >
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-accent-primary dark:hover:border-accent-primary transition-colors">
                        <span className="icon-[tabler--arrow-left] w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-accent-primary transition-colors flex-shrink-0 mt-0.5"></span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {t("post.previousPost")}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent-primary transition-colors truncate">
                            {prevPost.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex-1"></div>
                  )}

                  {/* Next Post */}
                  {nextPost ? (
                    <Link
                      to={`/post/${nextPost.slug}`}
                      className="flex-1 group"
                    >
                      <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-accent-primary dark:hover:border-accent-primary transition-colors">
                        <div className="flex-1 min-w-0 text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {t("post.nextPost")}
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-accent-primary transition-colors truncate">
                            {nextPost.title}
                          </div>
                        </div>
                        <span className="icon-[tabler--arrow-right] w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-accent-primary transition-colors flex-shrink-0 mt-0.5"></span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex-1"></div>
                  )}
                </div>
              </div>

              {/* Back to Blog Link */}
              <div className="mt-6 animate-fade-in">
                <Link
                  to="/blogs"
                  className="inline-flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-accent-primary font-medium transition-colors"
                >
                  <span className="icon-[tabler--arrow-left] w-5 h-5"></span>
                  <span>{t("post.backToBlogs")}</span>
                </Link>
              </div>
            </article>
            {/* Comments Section */}

            {postPath && <Comments postSlug={postPath} />}
          </div>
          {/* ToC sidebar */}
          <TableOfContents />
        </div>
      </div>
    </div>
  );
};
