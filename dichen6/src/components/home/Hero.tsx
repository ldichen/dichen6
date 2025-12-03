import React, { useState, useEffect, useRef } from "react";
import { useI18n } from "../../contexts/I18nContext";

export const Hero: React.FC = () => {
  const { t } = useI18n();
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });

  // Typewriter effect with loop
  useEffect(() => {
    const fullText = t("home.greeting");
    let index = 0;
    let isDeleting = false;

    const timer = setInterval(
      () => {
        if (!isDeleting && index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index));
          index++;
          if (index > fullText.length) {
            setIsTypingComplete(true);
            setTimeout(() => {
              isDeleting = true;
            }, 2000); // Wait 2 seconds before deleting
          }
        } else if (isDeleting && index > 0) {
          setIsTypingComplete(false);
          index--;
          setDisplayedText(fullText.slice(0, index));
          if (index === 0) {
            isDeleting = false;
          }
        } else if (isDeleting && index === 0) {
          isDeleting = false;
        }
      },
      isDeleting ? 50 : 100
    ); // Faster deletion

    return () => clearInterval(timer);
  }, [t]);

  // 3D tilt effect on mouse move with smooth animation
  useEffect(() => {
    let animationFrameId: number;
    let targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Reduced sensitivity for smoother movement
      targetRotation = {
        x: (y - centerY) / 20,
        y: (centerX - x) / 20,
      };
    };

    const handleMouseLeave = () => {
      targetRotation = { x: 0, y: 0 };
    };

    // Smooth animation using requestAnimationFrame
    const animate = () => {
      setCardRotation((current) => {
        const dx = targetRotation.x - current.x;
        const dy = targetRotation.y - current.y;

        // Lerp (linear interpolation) for smooth transition
        const newX = current.x + dx * 0.1;
        const newY = current.y + dy * 0.1;

        // Only update if there's meaningful change
        if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
          return { x: newX, y: newY };
        }
        return current;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 via-transparent to-gray-100/30 dark:from-gray-800/20 dark:via-transparent dark:to-gray-800/50" />

      {/* Animated Decorative Elements */}
      <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-accent-primary/10 to-transparent dark:from-accent-primary/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-gray-200/20 to-transparent dark:from-gray-700/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Floating Shapes - 15 decorative elements */}
      {/* Circles */}
      <div
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent-primary/30 dark:bg-accent-primary/20 rounded-full animate-bounce z-10"
        style={{ animationDuration: "2s", animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-1/3 right-2/3 w-4 h-4 bg-accent-primary/40 dark:bg-accent-primary/40 rounded-full animate-bounce z-10"
        style={{ animationDuration: "2s", animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-1/4 left-10 w-3 h-3 bg-accent-primary/30 dark:bg-accent-primary/30 rounded-full animate-bounce z-10"
        style={{ animationDuration: "2s", animationDelay: "0.5s" }}
      />
      <div
        className="absolute top-2/3 right-1/4 w-5 h-5  bg-accent-primary/30 dark:bg-accent-primary/30 rounded-full animate-bounce z-10"
        style={{ animationDuration: "3s", animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/2 right-1/2 w-4 h-4 bg-gradient-to-br from-accent-primary/20 to-transparent rounded-full animate-bounce z-10"
        style={{ animationDuration: "1.5s", animationDelay: "1.2s" }}
      />

      {/* Squares and Rectangles */}

      <div
        className="absolute top-1/5 right-10 w-4 h-4 border border-accent-primary/40 dark:border-accent-primary/40 rotate-12 animate-bounce z-10"
        style={{ animationDuration: "2.5s", animationDelay: "0.8s" }}
      />
      <div
        className="absolute bottom-1/4 right-20 w-5 h-5 bg-gray-300/30 dark:bg-gray-700/40 rounded-sm animate-bounce z-10"
        style={{ animationDuration: "2.5s", animationDelay: "0.8s" }}
      />
      <div
        className="absolute top-40 right-20 w-4 h-4 bg-accent-primary/15 dark:bg-accent-primary/8 rounded rotate-[30deg] animate-bounce z-10"
        style={{ animationDuration: "3.2s", animationDelay: "0.6s" }}
      />

      {/* Triangles */}

      <div
        className="absolute bottom-1/3 left-1/4 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[12px] border-b-gray-400/50 dark:border-b-gray-400/30 rotate-[-30deg] animate-bounce z-10"
        style={{ animationDuration: "2.7s", animationDelay: "1.9s" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 mb-8 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-4 animate-slide-up">
            {/* Main Heading with Typewriter Effect */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight min-h-[1.2em]">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent animate-gradient">
                  {displayedText}
                  {!isTypingComplete && (
                    <span className="inline-block w-1 h-[0.9em] bg-accent-primary ml-1 animate-pulse" />
                  )}
                </span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-[30em] h-1.5 bg-gradient-to-r from-accent-primary to-gray-900 dark:to-white rounded-full" />
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
              </div>
            </div>

            {/* What I Do Section - Inline Tag Style */}
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="icon-[tabler--sparkles] w-4 h-4 text-accent-primary"></span>
              {t("home.keywords")}
            </h2>
            {/* Description */}
            <div className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              <p className="font-serif italic">{t("home.focus")}</p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-16">
              <a
                href="https://x.com/liu_dichen"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-primary/80 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                <span className="icon-[tabler--brand-x] w-5 h-5 shrink-0 relative z-10"></span>
                <span className="whitespace-nowrap text-sm relative z-10">
                  {t("home.followButton")}
                </span>
                <span className="icon-[tabler--arrow-right] w-4 h-4 shrink-0 relative z-10 group-hover:translate-x-1 transition-transform"></span>
              </a>
              <a
                href="https://www.researchgate.net/profile/Dichen-Liu-2"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-800 hover:border-accent-primary dark:hover:border-accent-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <img
                  src="https://c5.rgstatic.net/m/42199702882742/images/favicon/favicon-32x32.png"
                  alt="ResearchGate"
                  className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform"
                />
                <span className="whitespace-nowrap text-sm">
                  在 RG 上关注我
                </span>
                <span className="icon-[tabler--arrow-right] w-4 h-4 shrink-0 relative z-10 group-hover:translate-x-1 transition-transform"></span>
              </a>
            </div>
          </div>

          {/* Right Card - Glassmorphism with 3D Tilt */}
          <div className="relative lg:block animate-scale-in max-w-m mx-auto lg:mx-0">
            <div
              ref={cardRef}
              className="relative group"
              style={{
                transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
              }}
            >
              {/* Animated Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/30 via-accent-primary/10 to-transparent dark:from-accent-primary/20 dark:via-accent-primary/5 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Glassmorphism Card */}
              <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-4 shadow-2xl">
                {/* Profile Area with Real Photo */}
                <div className="relative p-1 bg-gradient-to-br from-accent-primary/50 via-gray-200 to-accent-primary/30 dark:from-accent-primary/30 dark:via-gray-800 dark:to-accent-primary/20 rounded-2xl overflow-hidden">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                    {/* Real Photo */}
                    <img
                      src="/me.JPG"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />

                    {/* Floating Badge with Animation */}
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl border-4 border-white/80 dark:border-gray-950/80 shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                      <span className="text-2xl animate-wave">👋</span>
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
