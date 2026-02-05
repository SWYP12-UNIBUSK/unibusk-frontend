import React from 'react';
import { mockPerformanceList } from '@/mocks/performance/performance-list';
import { Hero, PerformanceTabs } from './_components';

interface PerformanceListPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function PerformanceListPage({ searchParams }: PerformanceListPageProps) {
  const { tab } = await searchParams;

  return (
    <main className="min-h-screen bg-white px-[240px] pt-[220px]">
      <Hero />
      <PerformanceTabs defaultTab={tab} performances={mockPerformanceList} />
    </main>
  );
}
