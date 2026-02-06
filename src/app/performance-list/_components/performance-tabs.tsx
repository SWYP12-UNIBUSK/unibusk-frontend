'use client';

import type { PerformanceFilterTab } from '@/types/performance';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
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
  const renderContent = () => (
    isSearchMode
      ? (
          <PerformanceSearchMode keyword={searchKeyword} validTab={validTab} />
        )
      : (
          <PerformanceListMode validTab={validTab} />
        )
  );

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

          <PerformanceSearch onSearch={handleSearch} />
        </div>

        <div className="w-full justify-between">
          <h1 className="py-20 text-center typo-body-sb-2 text-black">지금 준비중인 소규모 공연을 만나보세요</h1>

          <TabsContent value="upcoming">
            {renderContent()}
          </TabsContent>
          <TabsContent value="past">
            {renderContent()}
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
