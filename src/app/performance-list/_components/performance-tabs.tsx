'use client';

import type { PerformanceFilterTab } from '@/types/performance';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tags';
import { performanceListInfiniteQueryOptions } from '@/queries/performance';
import { isValidPerformanceTab } from '@/types/performance';
import { cn } from '@/utils';
import { PerformanceList } from './performance-list';
import { PerformanceSearch } from './performance-search';

interface PerformanceTabsProps {
  /** 기본 선택 탭 (기본값: 'upcoming') */
  defaultTab?: PerformanceFilterTab;
}

/**
 * 탭 트리거 스타일 상수
 *
 * 컴포넌트 외부에 정의하여 매 렌더링마다 재생성되지 않도록 최적화
 */
const TAB_TRIGGER_STYLES = `
    rounded-none border-b-2 border-transparent px-0 text-gray-300
    typo-title-b-3 py-[21px]
    hover:text-gray-400
    data-[state=active]:border-b-primary
    data-[state=active]:bg-transparent
    data-[state=active]:text-primary data-[state=active]:shadow-none
    dark:data-[state=active]:bg-transparent
    cursor-pointer
  `;

/**
 * 공연 탭 컴포넌트 (Client Component)
 *
 * '다가오는 공연'과 '지난 공연' 탭을 제공하며,
 * 탭 전환 시 URL 쿼리 파라미터를 업데이트하고 해당 데이터를 무한 스크롤로 불러옵니다.
 *
 * !todo: Tabs 공통 컴포넌트로 분리 및 개선 예정
 */
export function PerformanceTabs({
  defaultTab = 'upcoming',
}: PerformanceTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || defaultTab;
  const validTab = isValidPerformanceTab(currentTab) ? currentTab : defaultTab;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(performanceListInfiniteQueryOptions(validTab));

  const performances = data.pages.flatMap(page => page.content);

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);

    // { scroll: false } 옵션을 사용하여 탭 변경 시 스크롤 상단 이동 방지
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="min-h-300 pt-37.5">
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
      >
        <div className={`
          flex w-full items-center justify-between border-b-2 border-gray-300
        `}
        >
          <TabsList className={cn(`
            h-auto w-auto translate-y-0.5 gap-6 bg-transparent p-0 text-gray-300
          `)}
          >
            <TabsTrigger
              value="upcoming"
              className={TAB_TRIGGER_STYLES}
            >
              다가오는 공연
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className={TAB_TRIGGER_STYLES}
            >
              지난 공연
            </TabsTrigger>
          </TabsList>

          <PerformanceSearch />
        </div>

        <div className="w-full justify-between">
          <h1 className="py-20 text-center typo-body-sb-2 text-black">지금 준비중인 소규모 공연을 만나보세요</h1>

          <TabsContent value="upcoming">
            <PerformanceList
              performances={performances}
              onLoadMore={fetchNextPage}
              hasMore={hasNextPage}
              isLoading={isFetchingNextPage}
            />
          </TabsContent>
          <TabsContent value="past">
            <PerformanceList
              performances={performances}
              onLoadMore={fetchNextPage}
              hasMore={hasNextPage}
              isLoading={isFetchingNextPage}
            />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
