import type { ReactNode } from 'react';
import type { useAuth } from '@/hooks/use-auth';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/common/button';
import { AvatarCircleIcon, XIcon } from '@/components/common/icon';
import { LineDivider } from '@/components/common/line-divider';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/common/sheet';
import { Skeleton } from '@/components/common/skeleton';
import { cn } from '@/utils';
import { HeaderLogo } from './header-logo';
import { NAV_ITEMS } from './header-nav';

interface MobileHeaderProps {
  auth: ReturnType<typeof useAuth>;
  search?: ReactNode;
}

interface MobileHeaderSheetProps {
  auth: ReturnType<typeof useAuth>;
}

export function MobileHeader({ auth, search }: MobileHeaderProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(min-width: 768px)');
    const closeSheetOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsSheetOpen(false);
      }
    };

    desktopMediaQuery.addEventListener('change', closeSheetOnDesktop);

    return () => desktopMediaQuery.removeEventListener('change', closeSheetOnDesktop);
  }, []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <header
        className={cn('z-header w-full bg-white', search && `
          fixed inset-x-0 top-0
        `)}
      >
        <div className={cn('flex flex-col px-5 py-4', search && 'gap-2.5')}>
          <div className="flex items-center justify-between">
            <HeaderLogo />
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="메뉴 열기"
                className={`
                  cursor-pointer rounded-sm outline-none
                  focus-visible:ring-2 focus-visible:ring-primary
                  focus-visible:ring-offset-2
                `}
              >
                <Menu size={24} aria-hidden={true} />
              </button>
            </SheetTrigger>
          </div>
          {search}
        </div>
      </header>
      <MobileHeaderSheet auth={auth} />
    </Sheet>
  );
}

export function MobileHeaderSheet({ auth }: MobileHeaderSheetProps) {
  return (
    <SheetContent
      side="right"
      className={`
        w-full max-w-none gap-0 border-none pt-0
        md:hidden
      `}
      overlayClassName="md:hidden"
      showCloseButton={false}
    >
      <SheetTitle className="sr-only">모바일 내비게이션 메뉴</SheetTitle>
      <div className="flex items-center justify-between px-5 py-4">
        <HeaderLogo />
        <SheetClose asChild>
          <button
            type="button"
            aria-label="메뉴 닫기"
            className={`
              cursor-pointer rounded-sm outline-none
              focus-visible:ring-2 focus-visible:ring-primary
              focus-visible:ring-offset-2
            `}
          >
            <XIcon className="w-5.5" />
          </button>
        </SheetClose>
      </div>

      <MobileUserSection auth={auth} />

      <nav aria-label="모바일 헤더 내비게이션" className="flex flex-col px-5">
        {NAV_ITEMS.map(item => (
          <SheetClose key={item.href} asChild>
            <Link href={item.href} className="py-4 typo-body-m-3 text-black">
              {item.label}
            </Link>
          </SheetClose>
        ))}
        {auth.isAuthenticated && (
          <>
            <LineDivider colorClassName="bg-gray-400" className="my-2" width="100%" />
            <SheetClose asChild>
              <button
                type="button"
                disabled={auth.isLogoutPending}
                onClick={() => void auth.logout()}
                className={`
                  cursor-pointer py-4 text-left typo-body-m-3 text-black
                  disabled:pointer-events-none disabled:opacity-50
                `}
              >
                로그아웃
              </button>
            </SheetClose>
          </>
        )}
      </nav>
    </SheetContent>
  );
}

const userSectionClass = 'flex flex-col items-center px-5 pt-5 gap-2.5';
const userNameClass = 'typo-body-m-3 text-black';

function MobileUserSection({ auth }: MobileHeaderSheetProps) {
  if (auth.isPending) {
    return (
      <div className={userSectionClass} aria-hidden={true}>
        <Skeleton className="size-20 rounded-full bg-gray-200" />
        <Skeleton className="h-6 w-32 rounded-full bg-gray-200" />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <div className={userSectionClass}>
        <MobileAvatar />
        <p className={userNameClass}>로그인 해 주세요</p>
        <SheetClose asChild>
          <Button
            appearance="filled"
            theme="orange"
            size="md"
            asChild
            className="w-50"
          >
            <Link href="/login">로그인</Link>
          </Button>
        </SheetClose>
      </div>
    );
  }

  return (
    <div className={userSectionClass}>
      <MobileAvatar />
      <p className={userNameClass}>{auth.user?.name}</p>
      <div className="flex w-full justify-center gap-3">
        <ProfileTabLink href="/profile?tab=my-info">마이페이지</ProfileTabLink>
        <ProfileTabLink href="/profile?tab=my-performances">내가 등록한 공연</ProfileTabLink>
      </div>
    </div>
  );
}

function ProfileTabLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={`
          my-7.5 flex h-[45px] w-40 cursor-pointer items-center justify-center
          rounded-2xl bg-transparent px-4 typo-body-m-3 text-black
          shadow-elevate-2
          hover:bg-primary hover:text-white
          active:bg-primary active:text-white
        `}
      >
        {children}
      </Link>
    </SheetClose>
  );
}

function MobileAvatar() {
  return (
    <div className={`
      flex size-20 items-center justify-center rounded-full bg-gray-200
    `}
    >
      <AvatarCircleIcon
        aria-hidden={true}
        width={80}
        height={80}
      />
    </div>
  );
}
