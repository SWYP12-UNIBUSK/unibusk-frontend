'use client';

import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/common/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/common/dialog';
import { SearchInput } from '@/components/common/search-input';
import { SEARCH_EXAMPLES, SEARCH_RESULT_EXAMPLE } from '@/constants/performance';
import { cn } from '@/utils';

interface LocationItem {
  id: number;
  name: string;
  address: string;
}

interface LocationSearchModalProps {
  onSelect: (location: LocationItem) => void;
  trigger?: React.ReactNode;
}

export function SearchModal({ onSelect, trigger }: LocationSearchModalProps) {
  const [keyword, setKeyword] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    if (keyword.trim()) {
      setHasSearched(true);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);

    // 입력값이 비어있으면 초기 상태로 돌아감
    if (!value.trim()) {
      setHasSearched(false);
    }
  };

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
          flex h-170 w-125 flex-col gap-0 rounded-lg border-none px-10 pt-12
        `}
        showCloseButton={false}
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
          placeholder="예) 신촌 스타광장"
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className={cn(`pb-2.5`)}
        />

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-y-auto">
          {!hasSearched
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
                          {`·${item.title}`}
                        </span>
                        <span className="block pl-1 text-gray-550">{item.example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            : (
                <div className="">
                  {SEARCH_RESULT_EXAMPLE.length > 0
                    ? (
                        <>
                          <p className="pb-1.25 typo-caption-sb-1 text-black">
                            검색결과 총
                            <span className="text-primary">
                              {` ${SEARCH_RESULT_EXAMPLE.length}건`}
                            </span>
                          </p>
                          <div className={`
                            space-y-1.25 divide-y divide-gray-200 border-b
                            border-gray-200
                          `}
                          >
                            {SEARCH_RESULT_EXAMPLE.map(loc => (
                              <div
                                key={loc.id}
                                className={`
                                  cursor-pointer space-y-2.5 py-5
                                  transition-colors
                                  hover:bg-orange-50
                                `}
                                onClick={() => {
                                  onSelect(loc);
                                  setIsOpen(false);
                                }}
                              >
                                <p className="typo-caption-sb-1 text-gray-800">{loc.name}</p>
                                <p className="typo-caption-m-1 text-gray-550">{loc.address}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )
                    : (
                        <div className={`
                          flex h-full items-center justify-center py-20
                        `}
                        >
                          <p className="typo-body-m-3 text-gray-550">
                            검색 결과가 없습니다.
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
