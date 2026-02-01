import { queryOptions } from '@tanstack/react-query';
import { getUser } from '@/apis/user';

/**
 * 현재 로그인한 사용자 정보를 조회하는 Query Options
 *
 * @description
 * - 인증된 사용자의 프로필 정보를 가져옵니다
 * - TanStack Query가 자동으로 AbortSignal을 제공하여 쿼리 취소를 처리합니다
 *
 * @see {@link https://tanstack.com/query/latest/docs/framework/react/guides/query-options Query Options 공식 문서}
 * @see {@link https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation Query Cancellation 공식 문서}
 */
export const userQueryOptions = queryOptions({
  queryKey: ['auth', 'user'],

  queryFn: async ({ signal }) => {
    return await getUser({ signal });
  },
  staleTime: 5 * 60 * 1000,
});
