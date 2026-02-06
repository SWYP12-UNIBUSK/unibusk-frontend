'use client';

import type { PerformanceFilterTab } from '@/types/performance';
import { useInfiniteQuery } from '@tanstack/react-query';
import { performanceSearchInfiniteQueryOptions } from '@/queries/performance';
import { PerformanceList } from './performance-list';

interface PerformanceSearchModeProps {
  /** 검색 키워드 */
  keyword: string;
  /** 공연 필터 타입 */
  validTab: PerformanceFilterTab;
}

/**
 * 검색 모드 컴포넌트
 * - useInfiniteQuery로 검색 결과 무한 스크롤
 */
export function PerformanceSearchMode({ keyword, validTab }: PerformanceSearchModeProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, refetch }
    = useInfiniteQuery(performanceSearchInfiniteQueryOptions(validTab, keyword));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className={`
          size-8 animate-spin rounded-full border-4 border-gray-200
          border-t-primary
        `}
        />
        <div className="typo-body-m-3 text-gray-500">검색 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="typo-body-m-3 text-red-500">
          검색 중 오류가 발생했습니다.
        </div>
        <div className="typo-body-m-3 text-gray-400">
          {error instanceof Error ? error.message : '알 수 없는 오류'}
        </div>
        <button
          onClick={() => refetch()}
          className={`
            rounded-lg bg-primary px-6 py-2 typo-body-m-3 text-white
            hover:bg-primary/90
          `}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const performances = data.pages.flatMap(page => page.content);

  if (performances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-20">
        <div className="typo-body-m-3 text-gray-500">검색 결과가 없습니다.</div>
        <div className="typo-body-m-3 text-gray-400">
          다른 검색어로 시도해보세요.
        </div>
      </div>
    );
  }

  return (
    <PerformanceList
      performances={performances}
      onLoadMore={fetchNextPage}
      hasMore={hasNextPage}
      isLoading={isFetchingNextPage}
    />
  );
}
