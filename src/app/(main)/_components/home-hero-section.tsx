'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchInput } from '@/components/common/search-input';
import { MainLayout } from '@/components/layout';

interface HomeHeroSectionProps {
  mapBgSrc: string;
  heroIllustSrc: string;
}

export function HomeHeroSection({ mapBgSrc, heroIllustSrc }: HomeHeroSectionProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = searchQuery.trim();
    if (!trimmed) {
      return;
    }

    router.push(`/busking-map?keyword=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <MainLayout className={`
        relative z-10 px-5.25 pt-8 pb-16
        md:px-6 md:pt-14 md:pb-20
        lg:flex lg:min-h-190 lg:items-start lg:pt-28 lg:pb-24
      `}
      >
        <div className={`
          grid grid-cols-1 gap-8
          lg:grid-cols-12 lg:items-start lg:gap-0
        `}
        >
          <div className={`
            order-2
            lg:order-1 lg:col-span-5 lg:pt-16
          `}
          >
            <h2 className={`
              typo-title-b-4 text-gray-900
              sm:typo-title-b-3
              md:typo-title-b-1
            `}
            >
              <span className={`
                block
                lg:whitespace-nowrap
              `}
              >
                누구나 거리 위에서
              </span>
              <span className={`
                block
                lg:whitespace-nowrap
              `}
              >
                공연을 시작할 수 있도록
              </span>
            </h2>

            <p className={`
              mt-3 typo-caption-r-1 text-black
              sm:typo-body-sb-3
              md:mt-6 md:typo-title-r-4 md:text-gray-700
              lg:whitespace-nowrap
            `}
            >
              버스킹이 가능한 장소와 현장을 지도에서 바로 찾아보세요
            </p>

            <form
              onSubmit={handleSubmit}
              className={`
                mt-5 w-full max-w-115.75
                md:mt-10
              `}
            >
              <SearchInput
                theme="white"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="지역명이나 장소를 검색해보세요"
                aria-label="버스킹 장소 검색"
              />
            </form>
          </div>

          <div className={`
            relative order-1
            lg:order-2 lg:col-span-7
          `}
          >
            <div className={`
              relative h-80 w-full overflow-visible
              sm:h-105
              md:h-125
              lg:h-185
            `}
            >
              <Image
                src={mapBgSrc}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 1200px"
                quality={45}
                className="object-contain opacity-50 blur-[2px]"
              />

              <div className={`
                absolute inset-0 flex items-center justify-center
                lg:justify-end
              `}
              >
                <div className={`
                  relative h-full w-full
                  lg:h-210 lg:w-320 lg:translate-x-12 lg:-translate-y-30
                `}
                >
                  <Image
                    src={heroIllustSrc}
                    alt="UNIBUSK 지도 일러스트"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1023px) 100vw, 1280px"
                    quality={70}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </section>
  );
}
