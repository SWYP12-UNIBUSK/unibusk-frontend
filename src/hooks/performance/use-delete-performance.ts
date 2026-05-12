import type { InfiniteData } from '@tanstack/react-query';
import type {
  MyPerformanceCursorResponse,
  PerformanceListResponseDto,
  PerformanceUpcomingPreviewResponseDto,
} from '@/apis/performance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePerformance } from '@/apis/performance';
import { performanceKeys } from '@/queries/performance';

export function useDeletePerformance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (performanceId: number) => deletePerformance(performanceId),
    onSuccess: (_, performanceId) => {
      queryClient.setQueryData<InfiniteData<MyPerformanceCursorResponse>>(
        performanceKeys.myPerformances(),
        (old) => {
          if (!old)
            return old;
          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              content: page.content.filter(p => p.performanceId !== performanceId),
            })),
          };
        },
      );

      queryClient.setQueriesData<InfiniteData<PerformanceListResponseDto>>(
        { queryKey: performanceKeys.lists() },
        (old) => {
          if (!old)
            return old;
          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              content: page.content.filter(p => p.performanceId !== performanceId),
            })),
          };
        },
      );

      queryClient.setQueryData<PerformanceUpcomingPreviewResponseDto>(
        performanceKeys.upcomingPreview(),
        old => old?.filter(p => p.performanceId !== performanceId),
      );
    },
  });
}
