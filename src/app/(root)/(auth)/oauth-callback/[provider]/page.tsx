'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // !todo: 약간의 지연을 주어 쿠키가 완전히 설정되도록 보장, 개발 단계에서 대부분 기능이 구현되면 삭제 예정
    const timeoutId = setTimeout(() => {
      router.push('/');
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [router]);

  // !todo: 로그인 중... jsx를 shadcn/ui Spinner 컴포넌트로 변경 예정
  // !todo: 현재 브랜치에서 변경하기 어려운 이유: 로그인 관련 작업 브랜치에서 shadcn/ui에서 제공하는 컴포넌트 설치 작업은 브랜치 규칙 위반.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">로그인 중...</div>
    </div>
  );
}
