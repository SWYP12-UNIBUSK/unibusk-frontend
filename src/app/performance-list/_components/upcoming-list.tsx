'use client';

import type { PerformanceList } from '@/mocks/performance/performance-list';
import { useCallback } from 'react';
import { PerformanceCard } from './performance-card';

interface UpcomingListProps {
  performances: PerformanceList;
}

export function UpcomingList({ performances }: UpcomingListProps) {
  const handlePerformanceClick = useCallback((id: string) => {
    // eslint-disable-next-line no-console
    console.log(`Clicked performance ${id}`);
  }, []);

  return (
    <div className="grid w-full grid-cols-4 gap-6">
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
