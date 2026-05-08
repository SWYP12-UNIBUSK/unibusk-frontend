'use client';

import Link from 'next/link';
import { AvatarButton, Button } from '@/components/common/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/utils';

interface HeaderAuthProps {
  slotWidthClassName?: string;
}

interface ProfileDropdownMenuProps {
  logout: () => Promise<void>;
  isLogoutPending: boolean;
}

function ProfileDropdownMenu({ logout, isLogoutPending }: ProfileDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AvatarButton
          size={50}
          aria-label="사용자 메뉴"
          className={`
            outline-0
            focus-visible:ring-0 focus-visible:ring-offset-0
          `}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`
          w-37.5 border-gray-300 typo-caption-r-1 text-black
          shadow-[0_0_10px_rgba(0,0,0,0.15)]
        `}
      >
        <DropdownMenuItem asChild className="cursor-pointer px-2.5 py-5">
          <Link href="/profile">마이페이지</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black/10" />
        <DropdownMenuItem
          variant="destructive"
          disabled={isLogoutPending}
          className="cursor-pointer px-2.5 py-5"
          onSelect={() => logout()}
        >
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function HeaderAuth({ slotWidthClassName = 'w-24' }: HeaderAuthProps) {
  const { isAuthenticated, isPending, logout, isLogoutPending } = useAuth();

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
    <div className={cn('flex items-center justify-end', slotWidthClassName)}>
      <ProfileDropdownMenu logout={logout} isLogoutPending={isLogoutPending} />
    </div>
  );
}
