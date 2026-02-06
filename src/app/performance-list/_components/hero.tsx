import Image from 'next/image';
import { Button } from '@/components/common/button';

export function Hero() {
  return (
    <section className={`
      relative flex h-88.75 w-full flex-col justify-end overflow-hidden
      rounded-lg py-8
    `}
    >
      <Image
        src="/images/performance-list-Illustration.png"
        alt="공연 둘러보기 HERO 일러스트"
        fill
        className="w-full object-cover"
        priority
      />

      <div className="relative z-10 flex justify-center">
        <Button theme="orange" size="lg" appearance="filled">공연 등록하기</Button>
      </div>
    </section>
  );
}
