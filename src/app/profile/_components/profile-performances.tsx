'use client';

import Image from 'next/image';
import { Button } from '@/components/common/button';

export function ProfilePerformances() {
  return (
    // 디자인 시안상 높이 정보가 없어 최소 높이를 지정하여 중앙 정렬 효과를 줍니다.
    <div className="flex w-full flex-1 flex-col">
      <EmptyPerformances />
    </div>
  );
}

function EmptyPerformances() {
  return (
    <section className={`
      flex w-full flex-1 flex-col items-center justify-center gap-2.5
    `}
    >
      <div className="flex flex-col items-center justify-center gap-2.5">
        <Image
          src="/icons/bangCircle-gray.svg"
          alt=""
          width={40}
          height={40}
          unoptimized={true}
          aria-hidden="true"
        />
        <p className={`
          flex flex-col items-center justify-center typo-body-m-3 text-gray-600
        `}
        >
          현재 지원하지 않는 페이지입니다.
        </p>
        <Button theme="lightGray">홈으로 돌아가기</Button>
      </div>

    </section>
  );
}
