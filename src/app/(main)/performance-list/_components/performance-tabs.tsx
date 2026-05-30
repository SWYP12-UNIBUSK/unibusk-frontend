'use client';

import type { PerformanceFilterTab } from '@/types/performance';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tags';
import { isValidPerformanceTab } from '@/types/performance';
import { cn } from '@/utils';
import { PerformanceListMode } from './performance-list-mode';
import { PerformanceSearch } from './performance-search';
import { PerformanceSearchMode } from './performance-search-mode';

interface PerformanceTabsProps {
  /** 기본 선택 탭 */
  defaultTab?: PerformanceFilterTab;
}

const TAB_TRIGGER_STYLES = cn(
  'rounded-none border-b-2 border-transparent px-0 py-5.25',
  `
    cursor-pointer typo-body-sb-2 text-gray-300
    md:typo-title-b-3
  `,
  'hover:text-gray-400',
  'data-[state=active]:border-b-primary data-[state=active]:text-primary',
  'data-[state=active]:bg-transparent data-[state=active]:shadow-none',
  'dark:data-[state=active]:bg-transparent',
);

/** 공연 탭 (검색/일반 모드 전환) */
export function PerformanceTabs({
  defaultTab = 'upcoming',
}: PerformanceTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchKeyword, setSearchKeyword] = useState('');

  const currentTab = searchParams.get('tab') || defaultTab;
  const validTab = isValidPerformanceTab(currentTab) ? currentTab : defaultTab;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);

    setSearchKeyword('');

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const isSearchMode = searchKeyword.length > 0;

  return (
    <section className="min-h-300 pt-13.25">
      <Tabs
        value={validTab}
        onValueChange={handleTabChange}
      >
        <div className={cn('flex w-full flex-col gap-7.5', `
          md:flex-row md:items-center md:justify-between md:gap-0 md:border-b-2
          md:border-gray-300
        `)}
        >
          <TabsList className={cn(`
            h-auto w-auto translate-y-0.5 gap-6 rounded-none border-b-2
            border-gray-300 bg-transparent p-0 text-gray-300
            md:border-none
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

          <PerformanceSearch onSearch={handleSearch} key={validTab} />
        </div>

        <div className="w-full justify-between">
          <p className={cn(`
            pt-10 pb-7.5 text-center typo-caption-m-1 text-black
          `, `md:py-20 md:typo-body-sb-2`)}
          >
            지금 준비중인 소규모 공연을 만나보세요
          </p>

          <TabsContent value="upcoming">
            <Suspense fallback={<output className="flex justify-center py-20">로딩 중...</output>}>
              {isSearchMode
                ? <PerformanceSearchMode keyword={searchKeyword} validTab="upcoming" />
                : <PerformanceListMode validTab="upcoming" />}
            </Suspense>
          </TabsContent>
          <TabsContent value="past">
            <Suspense fallback={<output className="flex justify-center py-20">로딩 중...</output>}>
              {isSearchMode
                ? <PerformanceSearchMode keyword={searchKeyword} validTab="past" />
                : <PerformanceListMode validTab="past" />}
            </Suspense>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
