'use client';

import { useState, useCallback } from 'react';
import { Button } from './Button';

interface ShareButtonProps {
  title: string;
  url?: string;
  description?: string;
}

export function ShareButton({ title, url, description }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url ?? window.location.href;
  const shareData = {
    title,
    text: description,
    url: shareUrl,
  };

  const handleShare = useCallback(async () => {
    // Try native Web Share API first
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        // User cancelled or share failed, fall back to copy
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error);
        }
      }
    }

    // Fallback: Copy URL to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  }, [title, description, shareUrl, shareData]);

  return (
    <Button
      variant="tonal"
      icon={copied ? 'check' : 'share'}
      onPress={handleShare}
    >
      {copied ? '已复制' : '分享'}
    </Button>
  );
}
