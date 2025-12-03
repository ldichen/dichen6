/*
 * @Author: DiChen
 * @Date: 2025-12-02 11:06:45
 * @LastEditors: DiChen
 * @LastEditTime: 2025-12-02 14:59:18
 */
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      icon: "icon-[tabler--brand-x]",
      url: "https://x.com/liu_dichen",
    },
    {
      name: "GitHub",
      icon: "icon-[tabler--brand-github]",
      url: "https://github.com/ldichen",
    },
    {
      name: "Email",
      icon: "icon-[tabler--mail]",
      url: "mailto:ldicccccc@gmail.com",
    },
  ];

  return (
    <footer className="relative mt-32 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left: Logo */}
          <Link to="/" className="inline-flex items-center group">
            <div className="h-8 flex justify-center items-center transition-all group-hover:scale-105">
              {theme === "dark" ? (
                <img src="/dark2.svg" alt="Logo" className="h-5 w-auto" />
              ) : (
                <img src="/light2.svg" alt="Logo" className="h-5 w-auto" />
              )}
            </div>
          </Link>

          {/* Center: Copyright */}
          <p className="mt-4 text-sm text-neutral-700 sm:ml-4 sm:mt-0 sm:border-l sm:border-neutral-300 sm:pl-4 dark:text-neutral-100 dark:sm:border-neutral-700">
            © {currentYear} Dichen6
          </p>

          {/* Right: Social Links */}
          <div className="mt-4 inline-flex justify-center space-x-2 sm:ml-auto sm:mt-0 sm:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-accent-primary text-gray-700 dark:text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                aria-label={link.name}
              >
                <span className={`${link.icon} w-5 h-5`}></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
