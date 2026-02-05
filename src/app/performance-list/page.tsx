import { Suspense } from 'react';
import { mockPerformanceList } from '@/mocks/performance/performance-list';
import { Hero, PerformanceTabs } from './_components';

export default function PerformanceListPage() {
  return (
    <main className="min-h-screen bg-white px-60 pt-55">
      <Hero />
      <Suspense fallback={<div>로딩중...</div>}>
        <PerformanceTabs performances={mockPerformanceList} />
      </Suspense>
    </main>
  );
}
