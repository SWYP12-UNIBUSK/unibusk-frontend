'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { SearchInput } from '@/components/common/search-input';
import { MainLayout } from '@/components/layout';

interface HomeHeroSectionProps {
  mapBgSrc: string;
  heroIllustSrc: string;
}

export function HomeHeroSection({ mapBgSrc, heroIllustSrc }: HomeHeroSectionProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return;
    }

    router.push(`/busking-map?keyword=${encodeURIComponent(trimmed)}`);
  }, [router, searchQuery]);

  return (
    <section className="w-full bg-[#FFFDFB]">
      <div className="relative mx-auto min-h-250 w-full max-w-480">
        <MainLayout className="relative z-10 pt-20">
          <div className="grid grid-cols-12 items-center gap-6">
            <div className="col-span-5">
              <h1 className={`
                typo-title-b-1 leading-[1.15] font-bold tracking-[-0.02em]
                text-gray-900
              `}
              >
                누구나 거리 위에서
                <br />
                공연을 시작할 수 있도록
              </h1>

              <p className={`
                mt-6 typo-title-r-4 leading-[1.6] whitespace-nowrap
                text-gray-700
              `}
              >
                버스킹이 가능한 장소와 현장을 지도에서 바로 찾아보세요
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-115.75"
              >
                <SearchInput
                  theme="gray"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="지역명이나 장소를 검색해보세요"
                  aria-label="버스킹 장소 검색"
                />
              </form>
            </div>

            <div className="relative col-span-7">
              <div className="relative h-180 w-full overflow-visible">
                <Image
                  src={mapBgSrc}
                  alt=""
                  fill
                  priority
                  className="object-contain opacity-50 blur-[2px]"
                />

                <div className="absolute inset-0 flex items-center justify-end">
                  <div className="relative h-185 w-265">
                    <Image
                      src={heroIllustSrc}
                      alt="UNIBUSK 지도 일러스트"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      </div>
    </section>
  );
}
