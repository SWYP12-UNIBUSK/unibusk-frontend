import type { Metadata } from 'next';
import { Suspense } from 'react';
import { NO_INDEX_FOLLOW_ROBOTS } from '@/utils/seo';
import { OAuthCallbackClient } from './_components/oauth-callback-client';

export const metadata: Metadata = {
  title: '로그인 처리',
  robots: NO_INDEX_FOLLOW_ROBOTS,
};

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<OAuthCallbackPending />}>
      <OAuthCallbackClient />
    </Suspense>
  );
}

function OAuthCallbackPending() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse">로그인 중...</div>
    </div>
  );
}
