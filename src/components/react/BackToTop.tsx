'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from './Button';

interface BackToTopProps {
  /** Threshold in pixels to show the button (default: 300) */
  threshold?: number;
  /** Smooth scroll duration in ms (default: 500) */
  duration?: number;
  /** Button position (default: bottom-right) */
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
}

const positionStyles = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  'bottom-left': 'bottom-6 left-6',
};

export function BackToTop({
  threshold = 300,
  duration = 500,
  position = 'bottom-right',
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  return (
    <div
      id="back-to-top"
      className={`fixed z-40 transition-all duration-300 ease-out ${
        positionStyles[position]
      } ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      } back-to-top-floating`}
    >
      <Button
        variant="filled"
        onPress={scrollToTop}
        className="!rounded-full !p-0 !w-12 !h-12 md:!w-14 md:!h-14 shadow-md hover:shadow-lg active:shadow-sm transition-shadow"
        aria-label="返回顶部"
      >
        <span className="material-symbols-outlined text-lg md:text-xl">
          keyboard_arrow_up
        </span>
      </Button>
    </div>
  );
}
