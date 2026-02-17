'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AvatarButton, Button } from '@/components/common/button';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/utils';
import { LineDivider } from '../line-divider';

interface HeaderAuthProps {
  slotWidthClassName?: string;
}

export function HeaderAuth({ slotWidthClassName = 'w-24' }: HeaderAuthProps) {
  const { isAuthenticated, isPending, logout, isLogoutPending } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isPending) {
    return (
      <div className={cn('flex items-center justify-end', slotWidthClassName)} aria-hidden={true}>
        <div className="h-12.5 w-12.5 animate-pulse rounded-full bg-gray-200" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={cn('flex items-center justify-end', slotWidthClassName)}>
        <Button theme="orange" appearance="outline" size="md" className="w-full" asChild>
          <Link href="/login" className="whitespace-nowrap">로그인</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn('relative flex items-center justify-end', slotWidthClassName)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node)) {
          setIsMenuOpen(false);
          return;
        }
        if (!event.currentTarget.contains(nextTarget)) {
          setIsMenuOpen(false);
        }
      }}
    >
      <AvatarButton
        size={50}
        aria-label="사용자 메뉴"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        onClick={() => {
          setIsMenuOpen(prev => !prev);
        }}
      />

      {isMenuOpen
        ? (
            <div
              role="menu"
              aria-label="사용자 메뉴"
              className={cn(`
                absolute top-[calc(100%+10px)] right-0 z-dropdown w-37.5
                overflow-hidden rounded-sm border border-gray-200 bg-white
                shadow-[0_0_10px_rgba(0,0,0,0.15)]
              `)}
            >
              <Link
                href="/profile"
                role="menuitem"
                className={`
                  block cursor-pointer px-4 py-3 typo-caption-m-1 text-black
                  transition-colors
                  hover:bg-gray-100
                `}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                마이페이지
              </Link>

              <LineDivider colorClassName="bg-gray-200" />

              <button
                type="button"
                role="menuitem"
                disabled={isLogoutPending}
                className={cn(`
                  block w-full cursor-pointer px-4 py-3 text-left
                  typo-caption-m-1 text-error transition-colors
                  hover:bg-gray-100
                `, isLogoutPending && 'opacity-50')}
                onClick={async () => {
                  setIsMenuOpen(false);
                  await logout();
                }}
              >
                로그아웃
              </button>
            </div>
          )
        : null}
    </div>
  );
}
