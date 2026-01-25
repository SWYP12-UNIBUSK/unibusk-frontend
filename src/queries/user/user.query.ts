import { queryOptions } from '@tanstack/react-query';
import { getUser } from '@/apis/api.service';

/**
 * 현재 로그인한 사용자 정보를 조회하는 Query Options
 *
 * @description
 * - 인증된 사용자의 프로필 정보를 가져옵니다
 * - 401 에러는 api.instance.ts의 interceptor에서 처리됩니다
 * - 5분간 캐시를 유지하여 불필요한 네트워크 요청을 방지합니다
 * - TanStack Query가 자동으로 AbortSignal을 제공하여 쿼리 취소를 처리합니다
 * - 쿼리가 오래되거나 컴포넌트가 언마운트되면 자동으로 요청이 취소됩니다
 * - 401 에러는 api.instance.ts의 interceptor에서 처리됩니다
 *
 * @example
 * ```tsx
 * // useQuery와 함께 사용
 * const { data: user } = useQuery(userQueryOptions);
 *
 * // useSuspenseQuery와 함께 사용
 * const { data: user } = useSuspenseQuery(userQueryOptions);
 *
 * // prefetch에서 사용
 * await queryClient.prefetchQuery({
 *  ...userQueryOptions,
 *  queryFn: async () => await getUser({
 *    headers: {
 *      Cookie: cookieStore.toString(),
 *    },
 *    cache: 'no-store',
 *  }),
 * });
 *
 * // 캐시 무효화
 * queryClient.invalidateQueries({ queryKey: userQueryOptions.queryKey });
 * ```
 *
 * @see {@link getUser} - 실제 API 호출 함수
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
