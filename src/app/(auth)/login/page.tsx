import { cn } from '@/utils';

import { LoginHeader, LoginKakaoSection } from './_components';

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
