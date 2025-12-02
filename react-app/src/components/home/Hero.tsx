import React from "react";
import { useI18n } from "../../contexts/I18nContext";

export const Hero: React.FC = () => {
  const { t } = useI18n();

  const skills = [
    { key: "home.skill1", icon: "icon-[tabler--brand-vue]" },
    { key: "home.skill2", icon: "icon-[tabler--brand-react]" },
    { key: "home.skill3", icon: "icon-[tabler--brand-nodejs]" },
    { key: "home.skill4", icon: "icon-[tabler--palette]" },
    { key: "home.skill5", icon: "icon-[tabler--dots]" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-transparent to-gray-100/30 dark:from-gray-800/30 dark:via-transparent dark:to-gray-800/20" />

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-gray-200/30 dark:bg-gray-700/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-5 animate-slide-up">
            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {t("home.greeting")}
              </h1>
              <div className="w-16 h-1 bg-gray-900 dark:bg-white rounded-full" />
            </div>

            {/* Description */}
            <div className="space-y-2 text-base md:text-lg text-gray-600 dark:text-gray-400">
              <p>{t("home.intro")}</p>
              <p className="font-serif italic">{t("home.focus")}</p>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {t("home.helpTitle")}
              </h2>
              <ul className="space-y-2">
                {skills.map((skill, index) => (
                  <li
                    key={skill.key}
                    className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span
                      className={`${skill.icon} w-4 h-4 text-gray-600 dark:text-gray-400`}
                    ></span>
                    <span>{t(skill.key)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="https://x.com/liu_dichen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:bg-accent-primary hover:text-white transition-all duration-200 hover:-translate-y-0.5"
              >
                <span className="icon-[tabler--brand-x] w-4 h-4 shrink-0"></span>
                <span className="whitespace-nowrap text-sm">
                  {t("home.followButton")}
                </span>
                <span className="icon-[tabler--arrow-right] w-3.5 h-3.5 shrink-0"></span>
              </a>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative lg:block animate-scale-in">
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200/40 to-gray-300/30 dark:from-gray-700/30 dark:to-gray-800/20 rounded-2xl blur-2xl" />

              {/* Main Card */}
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-xl">
                {/* Profile Area */}
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden relative">
                  {/* Placeholder for photo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="icon-[tabler--user] w-24 h-24 text-gray-400 dark:text-gray-600"></span>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-white dark:bg-gray-900 rounded-xl border-4 border-white dark:border-gray-950 shadow-lg flex items-center justify-center">
                    <span className="text-2xl">👋</span>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        Available for work
                      </span>
                    </div>
                    <span className="icon-[tabler--check] w-3.5 h-3.5 text-green-500"></span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="icon-[tabler--map-pin] w-3.5 h-3.5 text-gray-600 dark:text-gray-400"></span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        Nanjing, China
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
