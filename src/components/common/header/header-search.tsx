import type { FormEvent } from 'react';
import { SearchInput } from '@/components/common/search-input';

interface HeaderSearchProps {
  searchKeyword: string;
  onSearchKeywordChange: (searchKeyword: string) => void;
  onSearch: (searchKeyword: string) => void;
  placeholder?: string;
  compact?: boolean;
}

export function HeaderSearch({
  searchKeyword,
  onSearchKeywordChange,
  onSearch,
  placeholder = '지역명이나 장소를 검색해보세요',
  compact = false,
}: HeaderSearchProps) {
  return (
    <form
      className={compact ? 'w-full max-w-[335px]' : undefined}
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        onSearch(searchKeyword);
      }}
    >
      <SearchInput
        theme="black"
        value={searchKeyword}
        compact={compact}
        onChange={(event) => {
          onSearchKeywordChange(event.target.value);
        }}
        placeholder={placeholder}
      />
    </form>
  );
}
