import Link from 'next/link';

export default function HomePage() {
  return (
    <main className={`
      flex h-screen w-screen items-center justify-center bg-background
      text-foreground
    `}
    >
      <Link
        href="/color-test"
        className={`
          flex h-[180px] w-[320px] flex-col items-center justify-center gap-2
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
    </main>
  );
}
