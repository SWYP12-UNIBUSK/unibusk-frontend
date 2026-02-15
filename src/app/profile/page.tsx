import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { getUser } from '@/apis/user';
import { Header } from '@/components/common/header';
import { getQueryClient } from '@/queries';
import { userQueryOptions } from '@/queries/user/user.query';
import { Footer, ProfileTab } from './_components';

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
    <div className="relative mt-6.25 container-1920 flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProfileTab />
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
