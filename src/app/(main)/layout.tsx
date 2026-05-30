import type { ReactNode } from 'react';
import { Header } from '@/components/common/header';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="md:container-1920 md:pt-6.25">
        <Header />
      </div>
      {children}
    </>
  );
}
