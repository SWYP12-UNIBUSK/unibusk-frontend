import type { UpdateMemberNameRequestDto } from '@/apis/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchUser } from '@/apis/user';
import { userQueryOptions } from '@/queries/user/user.query';

export function useUpdateMemberName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMemberNameRequestDto) => patchUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryOptions.queryKey });
    },
    onError: () => {
      // TODO: 서버 에러에 대응하는 toast 알림 추가 예정
    },
  });
}
