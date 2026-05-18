import type { ReactNode } from 'react';
import { Header } from '@/components/common/header';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="container-1920 pt-6.25">
        <Header />
      </div>
      {children}
    </>
  );
}
