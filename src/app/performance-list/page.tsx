import { mockPerformanceList } from '@/mocks/performance/performance-list';
import { Hero, PerformanceTabs } from './_components';

interface PerformanceListPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function PerformanceListPage({ searchParams }: PerformanceListPageProps) {
  const { tab } = await searchParams;

  return (
    <main className="min-h-screen bg-white px-60 pt-55">
      <Hero />
      <PerformanceTabs defaultTab={tab} performances={mockPerformanceList} />
    </main>
  );
}
