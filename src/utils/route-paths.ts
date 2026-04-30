import { ROUTES } from '@/constants';

/**
 * 라우트 경로 생성 함수
 *
 * @description
 * 동적 경로를 안전한 타입으로 생성하기 위한 헬퍼 함수
 * - 타입 안전성: TypeScript가 파라미터 체크
 * - 중앙 관리: URL 변경 시 한 곳만 수정
 * - IDE 자동완성 지원
 * - 동적 경로 파라미터 대응
 *
 * @example
 * // 정적 경로
 * routePaths.home // "/"
 * // 동적 경로
 * routePaths.post.detail(123) // "/posts/123"
 */
export const routePaths = {
  home: () => ROUTES.HOME,
  login: () => ROUTES.LOGIN,
  kakaoLogin: () => ROUTES.KAKAO_LOGIN,
  oauthCallback: (provider: string) => `${ROUTES.OAUTH_CALLBACK}/${provider}`,
  performanceDetail: (performanceId: number) => `${ROUTES.PERFORMANCE_DETAIL}/${performanceId}`,
  terms: () => ROUTES.TERMS,
  privacy: () => ROUTES.PRIVACY,
} as const;
