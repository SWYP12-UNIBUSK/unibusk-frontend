import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import localFont from 'next/font/local';
import { Toaster } from '@/components/common/toast';
import { SITE_URL } from '@/constants';
import { QueryProvider } from '@/providers';
import { SHARED_OPEN_GRAPH } from '@/utils';
import '../styles/globals.css';

const pretendard = localFont({
  src: '../styles/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | UNIBUSK',
    default: 'UNIBUSK',
  },
  description: '공연이 만들어지고, 보여지고, 시작되는 곳. 버스킹의 모든 순간을 잇다, UNIBUSK',
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
      <body className={`
        ${pretendard.className}
        antialiased
      `}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
