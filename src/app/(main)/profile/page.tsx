import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { getUser } from '@/apis/user';
import { getQueryClient } from '@/queries';
import { userQueryOptions } from '@/queries/user/user.query';
import { createPageMetadata } from '@/utils';
import { Footer, ProfileTab } from './_components';

export const metadata = createPageMetadata({
  title: '마이페이지',
  description: '내가 등록한 공연과 계정 정보를 한곳에서 확인해보세요.',
  path: '/profile',
});

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
    <div className="relative container-1920 flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProfileTab />
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
