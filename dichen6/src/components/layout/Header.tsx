/*
 * @Author: DiChen
 * @Date: 2025-12-02 10:42:26
 * @LastEditors: DiChen
 * @LastEditTime: 2025-12-03 05:05:09
 */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useI18n } from "../../contexts/I18nContext";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useI18n();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [postTitle, setPostTitle] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  // Check if we're on a post detail page
  const isPostPage = location.pathname.startsWith("/post/");

  const navigation = [
    { name: t("nav.posts"), path: "/blogs" },
    { name: t("category.idle-thoughts.name"), path: "/category/idle-thoughts" },
    { name: t("category.ai-adventist.name"), path: "/category/ai-adventist" },
    {
      name: t("category.shoulders-of-giants.name"),
      path: "/category/shoulders-of-giants",
    },
    { name: t("category.snow-like.name"), path: "/category/snow-like" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.about"), path: "/about" },
  ];

  // Handle scroll detection for post title display
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Only detect scroll direction on post pages
      if (isPostPage) {
        const scrollDelta = currentScrollY - lastScrollY.current;

        // Show title when scrolling down past threshold
        if (currentScrollY > 100) {
          // Scrolling down - show post title
          if (scrollDelta > 5) {
            setIsScrollingDown(true);
          }
          // Scrolling up more than 50px - hide post title and show navigation
          else if (scrollDelta < -5) {
            setIsScrollingDown(false);
          }
        } else {
          // Near top of page - always show navigation
          setIsScrollingDown(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPostPage]);

  // Get post title from the page when on a post page
  useEffect(() => {
    if (isPostPage) {
      // Wait a bit for the post to render, then get the title
      const timer = setTimeout(() => {
        const titleElement = document.querySelector("article h1");
        if (titleElement) {
          setPostTitle(titleElement.textContent);
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setPostTitle(null);
      setIsScrollingDown(false);
    }
  }, [isPostPage, location.pathname]);

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    // 如果是 /category 路径，只有完全匹配时才激活，避免子路径也激活
    if (path === "/category") return location.pathname === "/category";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group flex-shrink-0"
          >
            <div className="flex justify-center items-center h-10 transition-all group-hover:scale-105">
              {theme === "dark" ? (
                <img src="/dark2.svg" alt="Logo" className="h-5 w-auto" />
              ) : (
                <img src="/light2.svg" alt="Logo" className="h-5 w-auto" />
              )}
            </div>
          </Link>

          {/* Site name or Post title */}
          <div className="relative h-6 flex items-center overflow-hidden flex-1 min-w-0">
            {/* Dichen6 - default state */}
            <p
              className={`text-accent-primary text-lg ml-4 border-l-2 border-neutral-300 pl-2 dark:text-neutral-100 dark:border-neutral-700 transition-all duration-300 ease-out whitespace-nowrap ${
                isPostPage && isScrollingDown && postTitle
                  ? "opacity-0 -translate-y-6 absolute"
                  : "opacity-100 translate-y-0"
              }`}
            >
              Dichen6
            </p>
            {/* Post title - shown when scrolling on post page */}
            <p
              className={`text-gray-900 dark:text-white text-m font-medium ml-4 border-l-2 border-neutral-300 pl-2 dark:border-neutral-700 transition-all duration-300 ease-out truncate ${
                isPostPage && isScrollingDown && postTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6 absolute"
              }`}
            >
              {postTitle}
            </p>
          </div>

          {/* Desktop Navigation - Hidden when showing post title */}
          <div
            className={`hidden md:flex items-center space-x-1 flex-shrink-0 transition-all duration-300 ease-out ${
              isPostPage && isScrollingDown && postTitle
                ? "opacity-0 pointer-events-none max-w-0 overflow-hidden"
                : "opacity-100 max-w-none"
            }`}
          >
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isActivePath(item.path)
                    ? "text-accent-primary"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex ml-2 items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className=" hidden sm:flex items-center justify-center w-10 h-10 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Toggle language"
            >
              <span className="text-sm font-medium">
                {lang === "en" ? "EN" : "中文"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-10 h-10 text-neutral-800 dark:text-white group"
              aria-label={
                theme === "dark" ? t("nav.dayMode") : t("nav.nightMode")
              }
            >
              <div className="absolute flex items-center justify-center w-6 h-6 overflow-hidden border-b border-transparent group-hover:border-neutral-600">
                <svg
                  className={`absolute w-6 h-6 transition-all duration-700 ease-in-out ${
                    theme === "dark"
                      ? "opacity-0 rotate-90 scale-0"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg
                  className={`absolute w-6 h-6 transition-all duration-700 ease-in-out ${
                    theme === "dark"
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-0"
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <span className="icon-[tabler--x] w-6 h-6"></span>
              ) : (
                <span className="icon-[tabler--menu-2] w-6 h-6"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? "text-accent-primary bg-gray-100 dark:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-accent-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setLang(lang === "en" ? "zh" : "en");
                  setIsMobileMenuOpen(false);
                }}
                className="sm:hidden px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-left transition-colors"
              >
                {lang === "en" ? "切换到中文" : "Switch to English"}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
