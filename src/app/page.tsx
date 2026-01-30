import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      className={`
        flex h-screen w-screen items-center justify-center bg-background
        text-foreground
      `}
    >
      <div className={`
        flex flex-col gap-4
        sm:flex-row
      `}
      >
        <Link
          href="/color-test"
          className={`
            flex h-45 w-[320px] flex-col items-center justify-center gap-2
            rounded-2xl border border-border bg-card text-card-foreground
            shadow-sm transition
            hover:-translate-y-0.5 hover:shadow-md
            focus:ring-2 focus:ring-ring focus:ring-offset-2
            focus:ring-offset-background focus:outline-none
          `}
        >
          <span className="text-lg font-semibold">컬러 테스트 페이지 이동</span>
          <span className="text-sm text-gray-600">토큰 적용 여부 확인</span>
        </Link>

        <Link
          href="/typography-test"
          className={`
            flex h-45 w-[320px] flex-col items-center justify-center gap-2
            rounded-2xl border border-border bg-card text-card-foreground
            shadow-sm transition
            hover:-translate-y-0.5 hover:shadow-md
            focus:ring-2 focus:ring-ring focus:ring-offset-2
            focus:ring-offset-background focus:outline-none
          `}
        >
          <span className="text-lg font-semibold">타이포그라피 테스트 페이지 이동</span>
          <span className="text-sm text-gray-600">토큰 적용 여부 확인</span>
        </Link>

        <Link
          href="/z-index-test"
          className={`
            flex h-45 w-[320px] flex-col items-center justify-center gap-2
            rounded-2xl border border-border bg-card text-card-foreground
            shadow-sm transition
            hover:-translate-y-0.5 hover:shadow-md
            focus:ring-2 focus:ring-ring focus:ring-offset-2
            focus:ring-offset-background focus:outline-none
          `}
        >
          <span className="text-lg font-semibold">z-index 테스트 페이지 이동</span>
          <span className="text-sm text-gray-600">레이어 우선순위 확인</span>
        </Link>

        <Link
          href="/border-radius"
          className={`
            flex h-45 w-[320px] flex-col items-center justify-center gap-2
            rounded-2xl border border-border bg-card text-card-foreground
            shadow-sm transition
            hover:-translate-y-0.5 hover:shadow-md
            focus:ring-2 focus:ring-ring focus:ring-offset-2
            focus:ring-offset-background focus:outline-none
          `}
        >
          <span className="text-lg font-semibold">border-radius 테스트 페이지 이동</span>
          <span className="text-sm text-gray-600">토큰 적용 여부 확인</span>
        </Link>
      </div>
    </main>
  );
}
