import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePerformance } from '@/apis/performance';
import { performanceKeys } from '@/queries/performance';

export function useDeletePerformance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (performanceId: number) => deletePerformance(performanceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: performanceKeys.myPerformances() });
    },
  });
}
