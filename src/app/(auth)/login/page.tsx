import Link from 'next/link';
import { Button } from '@/components/common/button';

export default function LoginPage() {
  return (

    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center">
      <div className="w-full max-w-md space-y-20">
        <h1 className="text-center text-4xl font-bold">로그인</h1>

        <div className="text-center">
          <Button
            className={`
              h-15 w-full cursor-pointer rounded-full bg-[#FEE500] p-0 text-base
              font-medium text-[#000000]
              hover:bg-[#FEE500]/90
            `}
          >
            카카오로 로그인 하기
          </Button>

          {/* TODO: 약관 페이지 구현 후 href 연결 */}
          <Link
            href="/"
            className={`
              flex h-15 items-center justify-center text-sm
              text-muted-foreground transition-colors
              hover:text-foreground
            `}
          >
            UNIBUSK 서비스 약관
          </Link>

          {/* TODO: 개인정보 처리방침 페이지 구현 후 href 연결 */}
          <Link
            href="/"
            className={`
              flex h-15 items-center justify-center text-sm
              text-muted-foreground transition-colors
              hover:text-foreground
            `}
          >
            UNIBUSK 개인정보 처리방침
          </Link>

        </div>
      </div>
    </div>

  );
}
