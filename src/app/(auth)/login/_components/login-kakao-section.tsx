'use client';

import Link from 'next/link';
import { cn, ENV, routePaths } from '@/utils';

export function LoginKakaoSection() {
  const handleKakaoLogin = () => {
    const callbackURL = `${window.location.origin}${routePaths.oauthCallback('kakao')}`;
    const encodedCallbackUrl = encodeURIComponent(callbackURL);

    window.location.href = `${ENV.NEXT_PUBLIC_API_URL}${routePaths.kakaoLogin()}?state=${encodedCallbackUrl}`;
  };

  return (
    <div
      className={cn('flex flex-col space-y-5 text-center typo-body-m-3', `
        sm:typo-body-m-1
      `)}
    >
      <button
        type="button"
        onClick={handleKakaoLogin}
        className={cn(
          `
            flex h-12.5 w-full cursor-pointer items-center justify-center
            rounded-full bg-kakao p-0 text-black
          `,
          'sm:h-15',
        )}
      >
        카카오로 로그인 하기
      </button>

      <div
        className={cn(`
          flex h-15 flex-col justify-center space-y-2.5 typo-caption-m-1
          text-gray-600
        `)}
      >
        <Link
          href={routePaths.terms()}
          className={`
            hover:text-gray-800
            focus-visible:underline focus-visible:outline-none
          `}
        >
          UNIBUSK 서비스 약관
        </Link>

        <Link
          href={routePaths.privacy()}
          className={`
            hover:text-gray-800
            focus-visible:underline focus-visible:outline-none
          `}
        >
          UNIBUSK 개인정보 처리방침
        </Link>
      </div>
    </div>
  );
}
