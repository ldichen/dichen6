import React, { useEffect, useState, useRef } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get all headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headings = article.querySelectorAll("h2, h3, h4, h5, h6");
    if (headings.length === 0) return;

    // Generate IDs for headings if they don't have one
    const items: TocItem[] = [];
    headings.forEach((heading, index) => {
      if (!heading.id) {
        const text = heading.textContent || "";
        const id =
          text
            .toLowerCase()
            .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
            .replace(/^-|-$/g, "") || `heading-${index}`;
        heading.id = id;
      }

      const level = parseInt(heading.tagName.toLowerCase().replace("h", ""));
      items.push({
        id: heading.id,
        text: heading.textContent || "",
        level,
      });
    });

    setTocItems(items);

    // Highlight current section on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentId = "";

      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        const headingTop = element.offsetTop;
        if (scrollPosition >= headingTop) {
          currentId = heading.id;
        }
      });

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial update

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <aside
      ref={tocRef}
      className="hidden xl:block w-64 sticky top-32 self-start overflow-y-auto max-h-[calc(100vh-10rem)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
    >
      <nav>
        <h1 className="icon-[tabler--list] ml-2 text-lg font-medium text-gray-900 dark:text-white mb-2"></h1>
        <ul className="space-y-2 text-sm border-l-2 border-gray-200 dark:border-gray-800">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(item.id);
                }}
                className={`block py-1 border-l-2 -ml-[2px] transition-all duration-200 ${
                  item.level === 3
                    ? "pl-6"
                    : item.level === 4
                      ? "pl-8"
                      : item.level === 5
                        ? "pl-10"
                        : item.level === 6
                          ? "pl-12"
                          : "pl-4"
                } ${
                  activeId === item.id
                    ? "text-gray-900 dark:text-white border-gray-900 dark:border-white font-medium"
                    : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
