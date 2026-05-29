import Image from 'next/image';
import { cn } from '@/utils';

export function LoginHeader() {
  return (
    <>
      <h1
        className={cn('pb-10 text-center typo-title-b-5', `
          sm:pb-[80.5px] sm:typo-title-b-3
        `)}
      >
        UNIBUSK 로그인
      </h1>

      <div
        className={cn('flex w-full items-center justify-center pb-[45px]', `
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
    </>
  );
}
