import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '@/apis/user';
import { userQueryOptions } from '@/queries/user/user.query';

function expireCookie(cookieName: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
  const base = `${cookieName}=; Path=/; Expires=${expires}; Max-Age=0; SameSite=Lax`;

  document.cookie = base;

  const hostname = window.location.hostname;

  if (hostname) {
    document.cookie = `${base}; Domain=${hostname}`;
    document.cookie = `${base}; Domain=.${hostname}`;
  }
}

function clearAuthCookies() {
  expireCookie('at');
  expireCookie('rt');
}

export function useAuth() {
  const queryClient = useQueryClient();
  const { data: user, isPending } = useQuery(userQueryOptions);

  const { mutateAsync: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: async () => {
      try {
        await logoutUser();
      }
      finally {
        clearAuthCookies();
      }
    },
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: userQueryOptions.queryKey });
      queryClient.removeQueries({ queryKey: userQueryOptions.queryKey });

      window.location.replace('/');
    },
  });

  return {
    user: user || null,
    isAuthenticated: !!user,
    isPending,
    logout,
    isLogoutPending,
  };
}
