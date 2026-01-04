'use client';

import { useState, useEffect, useCallback } from 'react';

interface ReadingProgressProps {
  /** Color of the progress bar (default: primary) */
  color?: string;
  /** Height of the progress bar in pixels (default: 4) */
  height?: number;
  /** Whether to show percentage text (default: false) */
  showPercentage?: boolean;
}

export function ReadingProgress({
  color = 'var(--color-md-primary)',
  height = 4,
  showPercentage = false,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const calculateProgress = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight <= 0) {
      setProgress(0);
      return;
    }
    
    const progressPercent = Math.min(
      Math.max((scrollTop / docHeight) * 100, 0),
      100
    );
    setProgress(progressPercent);
  }, []);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    calculateProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [calculateProgress]);

  // Don't render on server or if no scrollable content
  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  if (document.documentElement.scrollHeight <= window.innerHeight) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] pointer-events-none safe-area-top"
      style={{ height: `${height}px` }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          borderRadius: `0 ${height / 2}px ${height / 2}px 0`,
        }}
      />
      {showPercentage && (
        <div
          className="fixed top-2 right-2 label-small bg-[var(--color-md-surface)] px-2 py-0.5 rounded-full shadow-sm"
          style={{ color: 'var(--color-md-on-surface)' }}
        >
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
}
