'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ENV, routePaths } from '@/utils';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    const callbackURL = `${window.location.origin}${routePaths.oauthCallback('kakao')}`;
    const encodedCallbackUrl = encodeURIComponent(callbackURL);

    window.location.href = `${ENV.NEXT_PUBLIC_API_URL}${routePaths.kakaoLogin()}?state=${encodedCallbackUrl}`;
  };

  return (

    <div className="mt-[211.5px] flex items-center justify-center">
      <div className="w-87.5 items-center">
        <h1 className="pb-[80.5px] text-center typo-title-b-3">UNIBUSK 로그인</h1>

        <div className="flex w-full items-center justify-center pb-17.5">
          <Image src="/image/logo_gray.webp" alt="login_logo" width={100} height={90} priority />
        </div>

        <div className="flex flex-col space-y-1.25 text-center typo-body-m-1">
          <button
            onClick={handleKakaoLogin}
            className={`
              flex h-15 w-full cursor-pointer items-center justify-center
              rounded-full bg-kakao p-0 text-black
            `}
          >
            카카오로 로그인 하기
          </button>

          {/* TODO: 약관 페이지 구현 후 href 연결 */}
          <Link
            href="/"
            className={`
              inline-flex h-15 items-center justify-center text-gray-400
              transition-colors
            `}
          >
            UNIBUSK 서비스 약관
          </Link>

          {/* TODO: 개인정보 처리방침 페이지 구현 후 href 연결 */}
          <Link
            href="/"
            className={`
              inline-flex h-15 items-center justify-center text-gray-400
              transition-colors
            `}
          >
            UNIBUSK 개인정보 처리방침
          </Link>

        </div>
      </div>
    </div>
  );
}
