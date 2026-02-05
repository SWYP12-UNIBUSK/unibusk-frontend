'use client';

import type { PerformanceList } from '@/mocks/performance/performance-list';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tags';
import { cn } from '@/utils';
import { PastList } from './past-list';
import { PerformanceSearch } from './performance-search';
import { UpcomingList } from './upcoming-list';

interface PerformanceTabsProps {
  defaultTab?: string;
  performances?: PerformanceList;
}

// !todo: Tabs 공통 컴포넌트로 분리 및 개선 예정
export function PerformanceTabs({ defaultTab = 'upcoming', performances = [] }: PerformanceTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || defaultTab;
  const tabTriggerStyle = `
    rounded-none border-b-2 border-transparent px-0 text-gray-300
    typo-title-b-3 py-[21px]
    hover:text-gray-400
    data-[state=active]:border-b-primary
    data-[state=active]:bg-transparent
    data-[state=active]:text-primary data-[state=active]:shadow-none
    dark:data-[state=active]:bg-transparent
    cursor-pointer
  `;

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);

    // { scroll: false } 옵션을 사용하여 탭 변경 시 스크롤 상단 이동 방지
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="min-h-300 pt-37.5">
      <Tabs
        defaultValue={defaultTab}
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
              className={tabTriggerStyle}
            >
              다가오는 공연
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className={tabTriggerStyle}
            >
              지난 공연
            </TabsTrigger>
          </TabsList>

          <PerformanceSearch />
        </div>

        <div className="w-full justify-between">
          <h1 className="py-20 text-center typo-body-sb-2 text-black">지금 준비중인 소규모 공연을 만나보세요</h1>

          <TabsContent value="upcoming">
            <UpcomingList performances={performances} />
          </TabsContent>
          <TabsContent value="past">
            <PastList />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
