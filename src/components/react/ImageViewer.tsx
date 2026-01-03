'use client';

import { useState, useEffect, useCallback } from 'react';

interface ImageViewerProps {
  children: React.ReactNode;
}

export function ImageViewer({ children }: ImageViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked on an image inside prose
      if (target.tagName === 'IMG' && target.closest('.prose')) {
        const img = target as HTMLImageElement;
        setCurrentImage({ src: img.src, alt: img.alt });
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const closeViewer = useCallback(() => {
    setIsOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = '';
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeViewer();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeViewer();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, closeViewer]);

  if (!isOpen || !currentImage) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="图片预览"
      >
        <button
          onClick={closeViewer}
          className="absolute top-4 right-4 p-2 rounded-full bg-[var(--color-md-surface-variant)] hover:bg-[var(--color-md-on-surface-variant)] transition-colors"
          aria-label="关闭"
        >
          <span className="material-symbols-outlined text-white">close</span>
        </button>
        
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-zoom-out"
          onClick={closeViewer}
        />
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[var(--color-md-surface-variant)] text-[var(--color-md-on-surface-variant)] label-medium">
          点击关闭 · 按 ESC 退出
        </div>
      </div>
    </>
  );
}
