'use client';

import Image from 'next/image';
import { PerformanceRegisterButton } from '@/components/performance';
import { cn } from '@/utils';

export function Hero() {
  return (
    <section
      className={cn(`
        relative flex h-28.5 w-full justify-start overflow-hidden rounded-lg
        sm:h-60
        md:h-115
      `)}
      aria-label="공연 등록 안내"
    >
      <Image
        src="/images/performance-list-illustration.webp"
        alt="공연 등록 가이드 HERO 일러스트"
        fill
        className={cn(`
          rounded-none object-cover object-right
          sm:rounded-lg sm:object-contain sm:object-center
        `)}
        priority
      />

      <div className={cn(`
        relative z-10 mt-auto flex flex-col space-y-2 pb-4 pl-5
        sm:space-y-4 sm:pb-15 sm:pl-12.5
        md:space-y-8 md:pb-40.5 md:pl-27.5
      `)}
      >
        <h2 className={`
          typo-caption-sb-1 text-black
          md:typo-title-sb-2
        `}
        >
          <span className="block">나의 공연 정보를</span>
          <span className="block">등록하고 홍보해 보세요</span>
        </h2>
        <PerformanceRegisterButton
          theme="orange"
          size="lg"
          mobileSize="xs"
          appearance="filled"
          className={`
            sm:h-9 sm:min-w-30 sm:typo-caption-r-2
            md:h-15 md:min-w-87.5 md:typo-body-sb-1
          `}
        >
          공연 등록하기
        </PerformanceRegisterButton>
      </div>
    </section>
  );
}
