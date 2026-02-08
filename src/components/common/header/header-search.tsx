import type { FormEvent } from 'react';
import { useState } from 'react';
import { SearchInput } from '@/components/common/search-input';

interface HeaderSearchProps {
  onSearch: (searchKeyword: string) => void;
  initialSearchKeyword?: string;
  placeholder?: string;
}

export function HeaderSearch({
  onSearch,
  initialSearchKeyword = '',
  placeholder = '지역명이나 장소를 검색해보세요',
}: HeaderSearchProps) {
  const [searchKeyword, setSearchKeyword] = useState(initialSearchKeyword);

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
          setSearchKeyword(event.target.value);
        }}
        placeholder={placeholder}
      />
    </form>
  );
}
