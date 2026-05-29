'use client';

import type { Performances } from '@/types/performance';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { PerformanceCard } from '@/components/performance';
import { routePaths } from '@/utils';

interface PerformanceListProps {
  performances: Performances;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function PerformanceList({
  performances,
  onLoadMore,
  hasMore,
  isLoading,
}: PerformanceListProps) {
  const observerTarget = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'upcoming';

  useEffect(() => {
    if (!observerTarget.current || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore?.();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  const performanceCards = useMemo(
    () =>
      performances.map(performance => (
        <PerformanceCard
          key={performance.performanceId}
          performance={performance}
          href={`${routePaths.performanceDetail(performance.performanceId)}?tab=${tab}`}
          className="w-full"
        />
      )),
    [performances, tab],
  );

  return (
    <div>
      <div className={`
        grid w-full grid-cols-1 gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      `}
      >
        {performanceCards}
      </div>
      {hasMore && (
        <div
          ref={observerTarget}
          className="flex h-20 items-center justify-center"
        >
          {isLoading && <div>로딩 중...</div>}
        </div>
      )}
    </div>
  );
}
