'use client';
import { Header } from '@/components/common/header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="mx-auto flex h-16 w-full max-w-[1440px] items-center px-6"
      >
        <Header />
      </div>

      <div
        className={`
          mx-auto mt-6 flex h-16 w-full max-w-[1440px] items-center px-6
        `}
      >
        <Header
          layout="SEARCH"
          onSearch={(searchKeyword) => {
            console.warn('search:', searchKeyword);
          }}
          initialSearchKeyword=""
          searchPlaceholder="검색어를 입력해 주세요"
        />
      </div>

      <main className="mx-auto w-full max-w-[1440px] px-6 py-10">
        <h1 className="typo-title-sb-2">메인 페이지</h1>
      </main>
    </div>
  );
}
