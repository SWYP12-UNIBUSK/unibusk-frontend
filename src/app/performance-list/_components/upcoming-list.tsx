'use client';

import type { PerformanceList } from '@/mocks/performance/performance-list';
import { useCallback } from 'react';
import { PerformanceCard } from './performance-card';

interface UpcomingListProps {
  performances: PerformanceList;
}

export function UpcomingList({ performances }: UpcomingListProps) {
  const handlePerformanceClick = useCallback((id: number) => {
    // eslint-disable-next-line no-console
    console.log(`Clicked performance ${id}`);
  }, []);

  return (
    <div className={`
      grid w-full grid-cols-1 gap-6
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
    `}
    >
      {performances.map(performance => (
        <PerformanceCard
          key={performance.id}
          performance={performance}
          onClick={handlePerformanceClick}
          className="w-full"
        />
      ))}
    </div>
  );
}
