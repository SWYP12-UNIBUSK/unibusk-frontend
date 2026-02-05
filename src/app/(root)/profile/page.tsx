import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { getUser } from '@/apis/user';
import { ProfileContainer } from '@/components/profile';
import { getQueryClient } from '@/queries';
import { userQueryOptions } from '@/queries/user/user.query';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    ...userQueryOptions,
    queryFn: async () => await getUser({
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    }),
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">프로필</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileContainer />
      </HydrationBoundary>
    </div>
  );
}
