'use client';

import type { PerformanceLocationSearchDto } from '@/apis/performance-locations/performance-location.schema';
import { useInfiniteQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/common/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/common/dialog';
import { SearchInput } from '@/components/common/search-input';
import { SEARCH_EXAMPLES } from '@/constants/performance';
import { performanceLocationSearchInfiniteQueryOptions } from '@/queries/performance-locations';
import { cn } from '@/utils';

interface LocationSearchModalProps {
  onSelect: (location: PerformanceLocationSearchDto) => void;
  trigger?: React.ReactNode;
}

export function SearchModal({ onSelect, trigger }: LocationSearchModalProps) {
  const [keyword, setKeyword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(performanceLocationSearchInfiniteQueryOptions(searchQuery));

  const handleSearch = () => {
    if (keyword.trim()) {
      setSearchQuery(keyword);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    // 입력값이 비어있으면 초기 상태(검색 전)로 돌아감
    if (!value.trim()) {
      setSearchQuery('');
    }
  };

  // 무한 스크롤 Observer
  const observerRef = useRef<HTMLDivElement>(null);

  const locations = data?.pages.flatMap(page => page.performanceLocations) || [];
  const totalElements = data?.pages[0]?.totalElements || 0;
  const showResults = !!searchQuery;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    if (observerRef.current)
      observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, locations.length]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            appearance="outline"
            theme="orange"
            size="sm"
            className="rounded-full px-4 text-xs"
          >
            장소 찾기
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={`
          z-popup flex h-170 w-125 flex-col gap-0 rounded-lg border-none px-10
          pt-12
        `}
        showCloseButton={false}
        nested
      >

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={`
            absolute top-8 right-8 cursor-pointer text-gray-400
            hover:text-black
          `}
        >
          <X size={28} />
        </button>

        <DialogHeader>
          <DialogTitle className={cn(`pb-5 typo-body-b-1 text-black`)}>장소를 검색해주세요</DialogTitle>
        </DialogHeader>

        {/* 검색창 */}
        <SearchInput
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="예) 걷고싶은거리 버스킹존"
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className={cn(`pb-2.5`)}
        />

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto">
          {!showResults
            ? (
                <div className="mt-4 space-y-5">
                  <p className="typo-body-m-3 text-primary">아래와 같은 방법으로 검색해보세요!</p>
                  <ul className="space-y-3 typo-caption-m-1">
                    {SEARCH_EXAMPLES.map(item => (
                      <li
                        key={item.title}
                        className="typo-caption-m-1 text-black"
                      >
                        <span className="block">
                          {`${item.title}`}
                        </span>
                        <span className="block pl-1 text-gray-550">{item.example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            : (
                <div className="">
                  {locations.length > 0
                    ? (
                        <>
                          <p className="pb-1.25 typo-caption-sb-1 text-black">
                            검색결과 총
                            <span className="text-primary">
                              {` ${totalElements}건`}
                            </span>
                          </p>
                          <div className="">
                            <div className={`
                              space-y-1.25 divide-y divide-gray-200 border-b
                              border-gray-200
                            `}
                            >
                              {locations.map(loc => (
                                <div
                                  key={loc.id}
                                  role="button"
                                  tabIndex={0}
                                  className={`
                                    cursor-pointer space-y-2.5 py-5
                                    transition-colors
                                    hover:bg-orange-50
                                  `}
                                  onClick={() => {
                                    onSelect(loc);
                                    setIsOpen(false);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      onSelect(loc);
                                      setIsOpen(false);
                                    }
                                  }}
                                >
                                  <p className="typo-caption-sb-1 text-gray-800">{loc.name}</p>
                                  <p className="typo-caption-m-1 text-gray-550">{loc.address}</p>
                                </div>
                              ))}
                            </div>
                            {/* 무한 스크롤 트리거 */}
                            <div ref={observerRef} className="h-4 w-full" />
                            {isFetchingNextPage && (
                              <div className={`
                                py-2 text-center text-xs text-gray-400
                              `}
                              >
                                로딩중...
                              </div>
                            )}
                          </div>
                        </>
                      )
                    : (
                        <div className={`
                          flex h-full items-center justify-center py-20
                        `}
                        >
                          <p className="typo-body-m-3 text-gray-550">
                            {isLoading ? '검색 중...' : '검색 결과가 없습니다.'}
                          </p>
                        </div>
                      )}
                </div>
              )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
