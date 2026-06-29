import type { Metadata } from 'next';
import { cn } from '@/utils';
import { NO_INDEX_FOLLOW_ROBOTS } from '@/utils/seo';

import { LoginHeader, LoginKakaoSection } from './_components';

export const metadata: Metadata = {
  title: '로그인',
  robots: NO_INDEX_FOLLOW_ROBOTS,
};

export default function LoginPage() {
  return (
    <main
      className={cn('flex min-h-dvh items-center justify-center', `
        sm:block sm:min-h-0
      `)}
    >
      <div
        className={cn('mx-auto w-full max-w-62.5', `
          sm:mt-[211.5px] sm:max-w-87.5
        `)}
      >
        <LoginHeader />
        <LoginKakaoSection />
      </div>
    </main>
  );
}
