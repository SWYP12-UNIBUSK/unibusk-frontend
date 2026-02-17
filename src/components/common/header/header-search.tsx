import type { FormEvent } from 'react';
import { useRef, useState } from 'react';
import { SearchInput } from '@/components/common/search-input';

interface HeaderSearchProps {
  onSearch: (searchKeyword: string) => void;
  onSearchClear?: () => void;
  initialSearchKeyword?: string;
  placeholder?: string;
}

export function HeaderSearch({
  onSearch,
  onSearchClear,
  initialSearchKeyword = '',
  placeholder = '지역명이나 장소를 검색해보세요',
}: HeaderSearchProps) {
  const [searchKeyword, setSearchKeyword] = useState(initialSearchKeyword);
  const lastKeywordRef = useRef(initialSearchKeyword);

  return (
    <form
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        onSearch(searchKeyword);
      }}
    >
      <SearchInput
        theme="black"
        value={searchKeyword}
        onChange={(event) => {
          const nextKeyword = event.target.value;

          setSearchKeyword(nextKeyword);

          const wasEmpty = lastKeywordRef.current.trim() === '';
          const isEmpty = nextKeyword.trim() === '';
          if (!wasEmpty && isEmpty) {
            onSearchClear?.();
          }

          lastKeywordRef.current = nextKeyword;
        }}
        placeholder={placeholder}
      />
    </form>
  );
}
