import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR과 CSR 간 중복 요청 방지
        staleTime: 60 * 1000, // 60초
        gcTime: 5 * 60 * 1000, // 5분
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

// 서버/클라이언트 환경에 따른 인스턴스 관리
let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  // 서버 환경: 매 요청마다 새 인스턴스 생성 (사용자 간 데이터 공유 방지)
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }

  // 브라우저 환경: 싱글톤 패턴
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}
