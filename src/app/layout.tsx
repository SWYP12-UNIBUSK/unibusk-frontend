import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import { Toaster } from '@/components/common/toast';
import { SITE_URL } from '@/constants';
import { QueryProvider } from '@/providers';
import { SHARED_OPEN_GRAPH } from '@/utils';
import '../styles/globals.css';

const pretendard = localFont({
  src: [
    { path: '../styles/fonts/Pretendard-Regular.subset.woff2', weight: '400' },
    { path: '../styles/fonts/Pretendard-Medium.subset.woff2', weight: '500' },
    { path: '../styles/fonts/Pretendard-SemiBold.subset.woff2', weight: '600' },
    { path: '../styles/fonts/Pretendard-Bold.subset.woff2', weight: '700' },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

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
    <html lang="ko" className={pretendard.variable}>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
