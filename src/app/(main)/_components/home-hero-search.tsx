'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchInput } from '@/components/common/search-input';

export function HomeHeroSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed)
      return;
    router.push(`/busking-map?keyword=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-115.75">
      <SearchInput
        theme="white"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="지역명이나 장소를 검색해보세요"
        aria-label="버스킹 장소 검색"
      />
    </form>
  );
}
