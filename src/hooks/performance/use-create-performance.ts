import type { PerformanceRegisterForm } from '@/apis/performance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPerformance, transformPerformanceFormToApiRequest } from '@/apis/performance';
import { performanceKeys } from '@/queries/performance';

export function useCreatePerformance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: PerformanceRegisterForm) => {
      const apiRequestData = transformPerformanceFormToApiRequest(formData);
      return createPerformance(apiRequestData);
    },
    onSuccess: () => {
      // 공연 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: performanceKeys.lists() });
      // 내 공연 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: performanceKeys.myPerformances() });
    },
  });
}
