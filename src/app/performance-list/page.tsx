import type { PerformanceFilterTab } from '@/types/performance';
import { Suspense } from 'react';
import { getQueryClient } from '@/queries';
import { performanceListInfiniteQueryOptions } from '@/queries/performance';
import { Hero, PerformanceTabs } from './_components';

interface PageProps {
  /** URL 쿼리 파라미터 (tab: 'upcoming' | 'past') */
  searchParams: Promise<{ tab?: PerformanceFilterTab }>;
}

/**
 * 공연 목록 페이지 (Server Component)
 *
 * URL 쿼리 파라미터의 tab 값에 따라 다가오는 공연 또는 지난 공연 목록을 표시합니다.
 * 첫 페이지 데이터를 서버에서 미리 가져와(prefetch) 초기 로딩 속도를 개선합니다.
 */
export default async function PerformanceListPage({ searchParams }: PageProps) {
  const queryClient = getQueryClient();
  const { tab = 'upcoming' } = await searchParams;

  // 첫 페이지 데이터를 서버에서 미리 가져오기 (SSR 최적화)
  await queryClient.prefetchInfiniteQuery(performanceListInfiniteQueryOptions(tab));

  return (
    <main className="min-h-screen bg-white px-60 pt-55">
      <Hero />
      <Suspense fallback={<div>로딩중...</div>}>
        <PerformanceTabs
          defaultTab={tab}
        />
      </Suspense>
    </main>
  );
}
