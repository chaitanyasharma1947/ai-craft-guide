import { useState, useMemo } from 'react';
import { Prompt } from '@/data/prompts';

interface UseProgressiveLoadingProps {
  items: Prompt[];
  initialCount?: number;
  loadMoreCount?: number;
}

export function useProgressiveLoading({
  items,
  initialCount = 12,
  loadMoreCount = 6,
}: UseProgressiveLoadingProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  const hasMore = visibleCount < items.length;
  const remainingCount = items.length - visibleCount;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + loadMoreCount, items.length));
  };

  const reset = () => {
    setVisibleCount(initialCount);
  };

  return {
    visibleItems,
    hasMore,
    remainingCount,
    loadMore,
    reset,
    totalCount: items.length,
    visibleCount,
  };
}