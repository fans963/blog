'use client';

import { useState, useEffect, useRef } from 'react';

interface ViewCountProps {
  slug: string;
  showLabel?: boolean;
  icon?: boolean;
}

interface ViewCountResponse {
  slug: string;
  views: number;
}

export function ViewCount({ slug, showLabel = true, icon = true }: ViewCountProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double fetch in React Strict Mode
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    async function fetchCount() {
      try {
        // Increment view
        const postResponse = await fetch(`/api/views/${slug}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!postResponse.ok) throw new Error('Failed to increment');

        // Get updated count
        const getResponse = await fetch(`/api/views/${slug}`);
        if (!getResponse.ok) throw new Error('Failed to fetch');
        const data: ViewCountResponse = await getResponse.json();
        setCount(data.views);
      } catch (e) {
        console.warn('Failed to fetch view count:', e);
        setCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchCount();
  }, [slug]);

  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 text-[var(--color-md-on-surface-variant)] label-medium">
        {icon && <span className="material-symbols-outlined text-xs animate-pulse">visibility</span>}
        <span className="w-8">...</span>
      </span>
    );
  }

  const displayCount = count !== null ? formatCount(count) : '0';

  return (
    <span className="inline-flex items-center gap-1 text-[var(--color-md-on-surface-variant)] label-medium">
      {icon && <span className="material-symbols-outlined text-xs">visibility</span>}
      {showLabel && <span>{displayCount} 次阅读</span>}
      {!showLabel && <span>{displayCount}</span>}
    </span>
  );
}

function formatCount(count: number): string {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
}
