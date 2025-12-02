import React, { useState } from "react";
import { useI18n } from "../contexts/I18nContext";
import { Pagination } from "../components/ui/Pagination";

const PROJECTS_PER_PAGE = 6;

const sampleProjects = [
  {
    id: 1,
    title: "Personal Portfolio",
    description:
      "A modern, responsive portfolio website built with React and TailwindCSS.",
    technologies: ["React", "TypeScript", "TailwindCSS"],
    link: "https://github.com",
    status: "Active",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration.",
    technologies: ["Vue.js", "Node.js", "MongoDB"],
    link: "https://github.com",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Design System",
    description: "A comprehensive design system for building consistent UIs.",
    technologies: ["React", "Storybook", "CSS-in-JS"],
    link: "https://github.com",
    status: "Active",
  },
];

export const Projects: React.FC = () => {
  const { t } = useI18n();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sampleProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const paginatedProjects = sampleProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  return (
    <div className="relative py-12 md:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
            <span className="icon-[tabler--code] w-4 h-4 text-gray-600 dark:text-gray-400"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              What I've built
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("projects.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t("projects.description")}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {paginatedProjects.map((project, index) => (
            <div
              key={project.id}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-full bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-accent-primary/50">
                {/* Project Header */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="icon-[tabler--rocket] w-20 h-20 text-gray-400 dark:text-gray-600"></span>
                    </div>
                  </div>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                        project.status === "Active"
                          ? "bg-green-500/90 text-white border-green-600"
                          : "bg-yellow-500/90 text-white border-yellow-600"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-accent-primary transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-4 pt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-accent-primary hover:text-white hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <span className="icon-[tabler--external-link] w-5 h-5"></span>
                      <span>View Project</span>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105"
                      aria-label="GitHub"
                    >
                      <span className="icon-[tabler--brand-github] w-5 h-5"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sampleProjects.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* CTA Section */}
        <div className="mt-20 animate-fade-in">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12 text-center">
            <span className="icon-[tabler--bulb] w-12 h-12 text-gray-600 dark:text-gray-400 mx-auto mb-4"></span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Have a project in mind?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm always interested in hearing about new projects and
              opportunities.
            </p>
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:bg-accent-primary hover:text-white hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <span className="icon-[tabler--send] w-5 h-5"></span>
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
