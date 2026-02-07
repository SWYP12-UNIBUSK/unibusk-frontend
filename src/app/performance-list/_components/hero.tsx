import Image from 'next/image';
import { Button } from '@/components/common/button';
import { cn } from '@/utils';

export function Hero() {
  return (
    <section className={cn(`
      relative flex h-[340px] w-full justify-start overflow-hidden rounded-lg
      md:h-[460px]
      xl:h-122.75
    `)}
    >
      <Image
        src="/images/performance-list-illustration.webp"
        alt="공연 둘러보기 HERO 일러스트"
        fill
        className={cn(`
          rounded-lg object-contain object-right
          md:object-center
        `)}
        priority
      />

      <div className={cn(`
        relative z-10 mt-auto flex flex-col space-y-6 pb-8 pl-5
        md:space-y-8 md:pb-16 md:pl-10
        xl:space-y-14.75 xl:pb-40.5 xl:pl-27.25
      `)}
      >
        <h2 className="typo-title-sb-2 text-black">
          <span className="block">나의 공연 정보를</span>
          <span className="block">등록하고 홍보해 보세요</span>
        </h2>
        <Button theme="orange" size="lg" appearance="filled">공연 등록하기</Button>
      </div>
    </section>
  );
}
