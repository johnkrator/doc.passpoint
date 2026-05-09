import React, { useState, useEffect } from "react";

interface ScrollProgressProps {
  containerRef?: React.RefObject<HTMLElement | null>;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ containerRef }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const getTarget = (): HTMLElement | null => containerRef?.current ?? null;

    const updateScrollProgress = () => {
      const el = getTarget();
      if (el) {
        const progress =
          el.scrollHeight - el.clientHeight > 0
            ? (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
            : 0;
        setScrollProgress(progress);
      } else {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(
          docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0,
        );
      }
    };

    updateScrollProgress();

    const el = getTarget();
    if (el) {
      el.addEventListener("scroll", updateScrollProgress, { passive: true });
      return () => el.removeEventListener("scroll", updateScrollProgress);
    } else {
      window.addEventListener("scroll", updateScrollProgress, {
        passive: true,
      });
      return () => window.removeEventListener("scroll", updateScrollProgress);
    }
  }, [containerRef]);

  return (
    <div className="fixed top-0 left-0 right-0 z-60 h-1 bg-muted dark:bg-card">
      <div
        className="h-full bg-brand-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
