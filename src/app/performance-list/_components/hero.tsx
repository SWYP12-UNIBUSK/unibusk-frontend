import Image from 'next/image';
import { Button } from '@/components/common/button';

export function Hero() {
  return (
    <section className={`
      relative flex h-122.75 w-full justify-start overflow-hidden rounded-lg
    `}
    >
      <Image
        src="/images/performance-list-Illustration.png"
        alt="공연 둘러보기 HERO 일러스트"
        fill
        className="object-cover"
        priority
      />

      <div className={`
        relative z-10 mt-auto flex flex-col space-y-14.75 pb-40.5 pl-27.25
      `}
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
