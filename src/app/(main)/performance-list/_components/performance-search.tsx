'use client';

import { useState } from 'react';
import { SearchInput } from '@/components/common/search-input';
import { cn } from '@/utils';

interface PerformanceSearchProps {
  /** 검색 실행 핸들러 */
  onSearch: (value: string) => void;
}

/**
 * 공연 검색 컴포넌트
 * - Enter 키로 검색 실행
 * - 검색어 지우면 자동 초기화
 */
export function PerformanceSearch({ onSearch }: PerformanceSearchProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter') {
      onSearch(inputValue.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === '') {
      onSearch('');
    }
  };

  return (
    <div className={cn('relative w-full', 'md:w-auto md:min-w-115.75')}>
      <SearchInput
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="지역명이나 장소를 검색해보세요"
        aria-label="공연 검색"
      />
    </div>
  );
}
