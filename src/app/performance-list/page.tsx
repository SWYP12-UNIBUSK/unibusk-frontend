import type { PerformanceFilterTab } from '@/types/performance';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Header } from '@/components/common/header';
import { getQueryClient } from '@/queries';
import { performanceListInfiniteQueryOptions } from '@/queries/performance';
import { isValidPerformanceTab } from '@/types/performance';
import { createPageMetadata } from '@/utils/creat-page-metadata';
import { Hero, PerformanceTabs } from './_components';

export const metadata = createPageMetadata({
  title: '공연 정보',
  description: '버스킹 공연 일정과 상세 정보를 확인해보세요.',
  path: '/performance-list',
});

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
  const { tab: rawTab } = await searchParams;
  const tab = isValidPerformanceTab(rawTab ?? null) ? rawTab! : 'upcoming';

  // 첫 페이지 데이터를 서버에서 미리 가져오기 (SSR 최적화)
  await queryClient.prefetchInfiniteQuery(performanceListInfiniteQueryOptions(tab));

  return (
    <div className="relative mt-6.25 container-1920 flex min-h-screen flex-col">
      <Header />
      <main className="min-h-screen bg-white pt-[57px]">

        <Hero />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>로딩 중...</div>}>
            <PerformanceTabs
              defaultTab={tab}
            />
          </Suspense>
        </HydrationBoundary>
      </main>
    </div>
  );
}
