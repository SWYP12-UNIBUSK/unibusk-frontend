'use client';

import type { ComponentProps } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { useAuth } from '@/hooks';
import { routePaths } from '@/utils';

const RegisterModal = dynamic(
  () => import('./register-modal').then(m => m.RegisterModal),
  { ssr: false },
);

type PerformanceRegisterButtonProps = ComponentProps<typeof Button>;

export function PerformanceRegisterButton({
  children,
  onClick,
  disabled,
  ...buttonProps
}: PerformanceRegisterButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, isPending } = useAuth();
  const router = useRouter();

  const handleClick: ComponentProps<typeof Button>['onClick'] = (e) => {
    onClick?.(e);

    if (e.defaultPrevented || isPending) {
      return;
    }

    if (!isAuthenticated) {
      router.push(routePaths.login());
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <Button {...buttonProps} disabled={disabled || isPending} onClick={handleClick}>
        {children}
      </Button>
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
