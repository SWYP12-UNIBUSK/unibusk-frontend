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
    <section className={`
      w-full bg-[radial-gradient(circle_at_center,#FAFAFA_0%,#FFF7F2CC_100%)]
    `}
    >
      <MainLayout className={`
        relative z-10 px-5.25 pt-8 pb-16
        md:px-6 md:pt-14 md:pb-20
        lg:flex lg:min-h-250 lg:items-center lg:py-0
      `}
      >
        <div className={`
          grid grid-cols-1 gap-8
          lg:grid-cols-12 lg:items-center lg:gap-6
        `}
        >
          <div className={`
            order-2
            lg:order-1 lg:col-span-6
          `}
          >
            <h2 className={`
              typo-title-b-1 leading-[1.15] font-bold tracking-[-0.02em]
              text-gray-900
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
              mt-6 typo-title-r-4 leading-[1.6] text-gray-700
              lg:whitespace-nowrap
            `}
            >
              버스킹이 가능한 장소와 현장을 지도에서 바로 찾아보세요
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 w-full max-w-115.75"
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
            lg:order-2 lg:col-span-6
          `}
          >
            <div className={`
              relative h-80 w-full overflow-visible
              sm:h-105
              md:h-125
              lg:h-180
            `}
            >
              <Image
                src={mapBgSrc}
                alt=""
                fill
                priority
                sizes="(max-width: 1280px) 60vw, 800px"
                className="object-contain opacity-50 blur-[2px]"
              />

              <div className={`
                absolute inset-0 flex items-center justify-center
                lg:justify-end
              `}
              >
                <div className={`
                  relative h-full w-full
                  lg:h-185 lg:w-265
                `}
                >
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
    </section>
  );
}
