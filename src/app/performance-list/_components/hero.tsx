'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { RegisterModal } from '@/components/performance';
import { useAuth } from '@/hooks';
import { cn, routePaths } from '@/utils';

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleRegisterClick = () => {
    if (!isAuthenticated) {
      router.push(routePaths.login());
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <section
      className={cn(`
        relative flex h-85 w-full justify-start overflow-hidden rounded-lg
        md:h-115
        xl:h-122.75
      `)}
      aria-label="공연 등록 안내"
    >
      <Image
        src="/images/performance-list-illustration.webp"
        alt="공연 등록 가이드 HERO 일러스트"
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
        <Button
          theme="orange"
          size="lg"
          appearance="filled"
          onClick={handleRegisterClick}
        >
          공연 등록하기
        </Button>
      </div>
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
