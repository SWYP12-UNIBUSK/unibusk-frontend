'use client';

import { SearchIcon } from '@/components/common/icon';
import { Input } from '@/components/common/input';

// !todo: Search 공통 컴포넌트로 분리 및 개선 예정
export function PerformanceSearch() {
  return (
    <div className="relative min-w-115.75">
      <Input
        placeholder="지역명이나 장소를 검색해보세요"
        className="h-12.5 rounded-full border-gray-700 pr-5.5"
      />
      <button
        className={`
          absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 cursor-pointer
          text-gray-800
        `}
      >
        <SearchIcon aria-hidden={true} />
      </button>
    </div>
  );
}
