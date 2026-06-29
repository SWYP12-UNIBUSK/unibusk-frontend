'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { exchangeToken } from '@/apis/token';

export function OAuthCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      exchangeToken({ code }).then(() => {
        router.push('/');
      }).catch(() => {
        router.push('/login');
      });
    }
  }, [router, searchParams]);

  // !todo: 로그인 중... jsx를 shadcn/ui Spinner 컴포넌트로 변경 예정
  // !todo: 현재 브랜치에서 변경하기 어려운 이유: 로그인 관련 작업 브랜치에서 shadcn/ui에서 제공하는 컴포넌트 설치 작업은 브랜치 규칙 위반.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">로그인 중...</div>
    </div>
  );
}
