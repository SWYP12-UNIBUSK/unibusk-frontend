'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn, ENV, routePaths } from '@/utils';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    const callbackURL = `${window.location.origin}${routePaths.oauthCallback('kakao')}`;
    const encodedCallbackUrl = encodeURIComponent(callbackURL);

    window.location.href = `${ENV.NEXT_PUBLIC_API_URL}${routePaths.kakaoLogin()}?state=${encodedCallbackUrl}`;
  };

  return (
    <main className={cn('flex min-h-dvh items-center justify-center', `
      sm:block sm:min-h-0
    `)}
    >
      <div className={cn('mx-auto w-full max-w-62.5', `
        sm:mt-[211.5px] sm:max-w-87.5
      `)}
      >
        <h1 className={cn('pb-10 text-center typo-title-b-5', `
          sm:pb-[80.5px] sm:typo-title-b-3
        `)}
        >
          UNIBUSK 로그인
        </h1>

        <div className={cn('flex w-full items-center justify-center pb-[45px]', `
          sm:pb-17.5
        `)}
        >
          <Image
            src="/images/logo_gray.webp"
            alt="login_logo"
            width={100}
            height={90}
            priority
            className={cn('h-20 w-22', 'md:h-22.5 md:w-25')}
          />
        </div>

        <div className={cn('flex flex-col space-y-5 text-center typo-body-m-3', `
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

          <div className={cn(`
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
      </div>
    </main>
  );
}
