import React from 'react';
import { useI18n } from '../contexts/I18nContext';

export const About: React.FC = () => {
  const { t } = useI18n();

  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading frontend development team, building modern web applications.',
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Developed responsive web applications using React and Vue.js.',
    },
  ];

  return (
    <div className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
            <span className="icon-[tabler--user] w-4 h-4 text-gray-600 dark:text-gray-400"></span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Get to know me</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('about.description')}
          </p>
        </div>

        {/* Profile Section */}
        <div className="mb-16 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 text-4xl font-bold">
                  D6
                </div>
              </div>

              {/* Bio */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('about.shortBio')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t('about.bioContent')}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {['Vue.js', 'React', 'Node.js', 'TypeScript', 'TailwindCSS', 'Design'].map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <span className="icon-[tabler--check] w-4 h-4 text-gray-600 dark:text-gray-400"></span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {t('about.experience')}
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 hover:border-accent-primary/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-500 mt-1 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">{exp.company}</p>
                <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="animate-fade-in">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('about.connect')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Feel free to reach out if you want to collaborate or just have a chat.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://x.com/liu_dichen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-accent-primary text-gray-900 dark:text-white font-semibold transition-all duration-200 hover:scale-105"
              >
                <span className="icon-[tabler--brand-x] w-5 h-5"></span>
                <span>Twitter</span>
              </a>
              <a
                href="mailto:your@email.com"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-accent-primary text-gray-900 dark:text-white font-semibold transition-all duration-200 hover:scale-105"
              >
                <span className="icon-[tabler--mail] w-5 h-5"></span>
                <span>Email</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-accent-primary text-gray-900 dark:text-white font-semibold transition-all duration-200 hover:scale-105"
              >
                <span className="icon-[tabler--brand-github] w-5 h-5"></span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
