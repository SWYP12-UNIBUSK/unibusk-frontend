import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Toaster } from '@/components/common/toast';
import { SITE_URL } from '@/constants';
import { QueryProvider } from '@/providers';
import { SHARED_OPEN_GRAPH } from '@/utils';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'UNIBUSK(유니버스크)',
  title: {
    template: '%s | UNIBUSK',
    default: 'UNIBUSK(유니버스크)',
  },
  description: '공연이 만들어지고, 보여지고, 시작되는 곳. 버스킹의 모든 순간을 잇다, UNIBUSK(유니버스크)',
  keywords: ['UNIBUSK', '유니버스크', '버스킹', '거리공연', '공연정보', '버스킹지도'],
  icons: {
    icon: '/logos/small-logo-unibusk-primary.png',
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
