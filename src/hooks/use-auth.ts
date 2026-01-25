import { useQuery } from '@tanstack/react-query';
import { userQueryOptions } from '@/queries/user/user.query';

export function useAuth() {
  const { data: user, isLoading } = useQuery(userQueryOptions);

  return {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
  };
}
