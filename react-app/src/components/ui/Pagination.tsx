/*
 * @Author: DiChen
 * @Date: 2025-12-03 00:53:27
 * @LastEditors: DiChen
 * @LastEditTime: 2025-12-03 02:56:32
 */
import React from "react";
import { useI18n } from "../../contexts/I18nContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useI18n();

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageInfo = t("pagination.pageInfo")
    .replace("{current}", currentPage.toString())
    .replace("{total}", totalPages.toString());

  return (
    <div className="flex items-center justify-between mt-12">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors ${
          currentPage === 1
            ? "opacity-40"
            : "cursor-pointer hover:text-accent-primary dark:hover:text-accent-primary"
        }`}
      >
        {t("pagination.previous")}
      </button>

      {/* Page Info */}
      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {pageInfo}
      </span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors ${
          currentPage === totalPages
            ? "opacity-40"
            : "cursor-pointer hover:text-accent-primary dark:hover:text-accent-primary"
        }`}
      >
        {t("pagination.next")}
      </button>
    </div>
  );
};
