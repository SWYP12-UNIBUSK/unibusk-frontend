'use client';

import type { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { useAuth } from '@/hooks';
import { routePaths } from '@/utils';
import { RegisterModal } from './register-modal';

type PerformanceRegisterButtonProps = ComponentProps<typeof Button>;

export function PerformanceRegisterButton({
  children,
  onClick,
  ...buttonProps
}: PerformanceRegisterButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick: ComponentProps<typeof Button>['onClick'] = (e) => {
    onClick?.(e);
    if (!isAuthenticated) {
      router.push(routePaths.login());
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <Button {...buttonProps} onClick={handleClick}>
        {children}
      </Button>
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
