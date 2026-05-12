import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/common/button';
import { HeaderLogo } from '@/components/common/header/header-logo';
import { XIcon } from '@/components/common/icon';
import { AvatarCircleIcon } from '@/components/common/icon/avatar-circle';
import { Input, Label } from '@/components/common/input';
import { SearchInput } from '@/components/common/search-input';
import { SEARCH_EXAMPLES, SEARCH_RESULT_EXAMPLE } from '@/constants/performance';
import { cn } from '@/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const meta: Meta<typeof Sheet> = {
  title: 'Component/Common/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

/** 모바일 — 프로필 수정 Bottom Sheet */
export const ProfileEditMobile: Story = {
  parameters: {
    viewport: { value: 'mobile' },
  },
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          theme="orange"
          appearance="filled"
          size="sm"
          className="w-full"
        >
          프로필 수정 열기
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" rounded className="px-5">
        <SheetHeader align="center">
          <SheetTitle className="typo-title-b-5">프로필 변경</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center gap-6 pb-5">
          <div className="relative">
            <div className={`
              flex size-20 items-center justify-center rounded-full bg-gray-200
            `}
            >
              <AvatarCircleIcon className="size-14 text-gray-400" />
            </div>
            <div className={`
              absolute right-0 bottom-0 flex size-6 items-center justify-center
              rounded-full border border-gray-200 bg-white
            `}
            >
              <span className="text-xs">📷</span>
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="nickname-mobile">닉네임</Label>
            <div className="relative">
              <Input
                id="nickname-mobile"
                placeholder="닉네임을 입력해 주세요"
                maxLength={15}
                className="pr-12"
              />
            </div>
          </div>

          <SheetClose asChild>
            <Button
              theme="orange"
              appearance="filled"
              size="md"
              className="w-50"
            >
              변경
            </Button>
          </SheetClose>

        </div>
      </SheetContent>
    </Sheet>
  ),
};

function LocationSearchDefault() {
  const [keyword, setKeyword] = useState('');
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          theme="orange"
          appearance="outline"
          size="xs"
          className="rounded-full px-4 text-xs"
        >
          장소 찾기
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        rounded
        className="min-h-165 gap-0 px-5 pt-[65px] pb-5"
      >
        <SheetHeader align="start" className="p-0 pb-5">
          <SheetTitle className="typo-body-b-1 text-black">장소를 검색해주세요</SheetTitle>
        </SheetHeader>
        <SearchInput
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="예) 걷고싶은거리 버스킹존"
          className="pb-7.5"
        />
        <div className="space-y-5">
          <p className="typo-caption-r-1 text-primary">아래와 같은 방법으로 검색해보세요!</p>
          <ul className="space-y-3">
            {SEARCH_EXAMPLES.map(item => (
              <li key={item.title} className="typo-caption-m-1 text-black">
                <span className="block">{item.title}</span>
                <span className="block pl-1 text-gray-550">{item.example}</span>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function LocationSearchWithResults() {
  const [keyword, setKeyword] = useState('홍대');
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          theme="orange"
          appearance="outline"
          size="xs"
          className="rounded-full px-4 text-xs"
        >
          장소 찾기
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        rounded
        className="max-h-165 gap-0 px-5 pt-[65px] pb-5"
      >
        <SheetHeader align="start" className="pb-5">
          <SheetTitle className="typo-body-b-1">장소를 선택해주세요</SheetTitle>
        </SheetHeader>
        <SearchInput
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="예) 걷고싶은거리 버스킹존"
          className="pb-2.5"
        />
        <div className="flex-1 overflow-y-auto">
          <p className="pb-1.5 typo-caption-sb-1">
            검색결과 총
            {' '}
            <span className="text-primary">38건</span>
          </p>
          <div className="divide-y divide-gray-200 border-b border-gray-200">
            {SEARCH_RESULT_EXAMPLE.slice(0, 4).map(loc => (
              <div
                key={loc.id}
                className={`
                  cursor-pointer space-y-2.5 py-5 transition-colors
                  hover:bg-orange-50
                `}
              >
                <p className="typo-caption-sb-1 text-gray-800">{loc.name}</p>
                <p className="typo-caption-m-1 text-gray-550">{loc.address}</p>
              </div>
            ))}
          </div>
          <div className={`
            flex items-center justify-center gap-1 py-4 typo-caption-m-1
            text-gray-550
          `}
          >
            <button type="button" className="p-1">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3, 4].map(page => (
              <button
                key={page}
                type="button"
                className={cn('px-2 py-1', page === 1 && 'font-bold text-black')}
              >
                {page}
              </button>
            ))}
            <button type="button" className="p-1">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** 모바일 — 장소 검색 Bottom Sheet (초기 상태) */
export const LocationSearchMobileDefault: Story = {
  parameters: {
    viewport: { value: 'mobile' },
  },
  render: () => <LocationSearchDefault />,
};

/** 모바일 — 장소 검색 Bottom Sheet (검색 결과 상태) */
export const LocationSearchMobileWithResults: Story = {
  parameters: {
    viewport: { value: 'mobile' },
  },
  render: () => <LocationSearchWithResults />,
};

function MobileNavLoggedIn() {
  return (
    <Sheet>
      <header className="flex items-center justify-between px-5 py-4">
        <HeaderLogo />
        <SheetTrigger asChild>
          <button type="button" aria-label="메뉴 열기" className="cursor-pointer">
            <Menu size={24} />
          </button>
        </SheetTrigger>
      </header>

      <SheetContent side="right" className="w-full gap-0 pt-0" showCloseButton={false}>
        {/* 헤더 복제 행 — 햄버거가 X로 변한 것처럼 보이게 함 */}
        <div className="flex items-center justify-between px-5 py-4">
          <HeaderLogo />
          <SheetClose asChild>
            <button type="button" aria-label="메뉴 닫기" className="cursor-pointer">
              <XIcon />
            </button>
          </SheetClose>
        </div>

        {/* 유저 섹션 */}
        <div className="flex flex-col items-center gap-4 px-5 py-6">
          <div className={`
            flex size-20 items-center justify-center rounded-full bg-gray-200
          `}
          >
            <AvatarCircleIcon className="size-20 text-gray-400" />
          </div>
          <p className="pb-5 typo-body-m-3">날아다니는 우주 4606</p>
          <div className="flex w-full gap-3">
            <Button
              appearance="outline"
              theme="lightGray"
              size="md"
              className="flex-1"
            >
              마이페이지
            </Button>
            <Button
              appearance="outline"
              theme="lightGray"
              size="md"
              className="flex-1"
            >
              내가 등록한 공연
            </Button>
          </div>
        </div>

        {/* 내비게이션 */}
        <nav className="flex flex-col px-5">
          <p className="py-3 typo-caption-sb-1 text-gray-550">ABOUT US</p>
          <Link href="/busking-map" className="py-4 typo-body-m-3 text-black">버스킹 맵</Link>
          <Link
            href="/performance-list"
            className="py-4 typo-body-m-3 text-black"
          >
            공연 정보
          </Link>
          <Link href="/community" className="py-4 typo-body-m-3 text-black">커뮤니티</Link>
          <hr className="my-2 border-gray-200" />
          <Link
            href="/performance/register"
            className="py-4 typo-body-m-3 text-black"
          >
            공연 등록하기
          </Link>
          <button
            type="button"
            className="py-4 text-left typo-body-m-3 text-black"
          >
            로그아웃
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MobileNavLoggedOut() {
  return (
    <Sheet>
      <header className="flex items-center justify-between px-5 py-4">
        <HeaderLogo />
        <SheetTrigger asChild>
          <button type="button" aria-label="메뉴 열기" className="cursor-pointer">
            <Menu size={24} />
          </button>
        </SheetTrigger>
      </header>

      <SheetContent side="right" className="w-full gap-0 pt-0" showCloseButton={false}>
        {/* 헤더 복제 행 */}
        <div className="flex items-center justify-between px-5 py-4">
          <HeaderLogo />
          <SheetClose asChild>
            <button type="button" aria-label="메뉴 닫기" className="cursor-pointer">
              <XIcon />
            </button>
          </SheetClose>
        </div>

        {/* 비로그인 유저 섹션 */}
        <div className="flex flex-col items-center gap-4 px-5 py-6">
          <div className={`
            flex size-20 items-center justify-center rounded-full bg-gray-200
          `}
          >
            <AvatarCircleIcon className="size-20 text-gray-400" />
          </div>
          <p className="pb-5 typo-body-m-3">로그인 해 주세요</p>
          <Button
            appearance="filled"
            theme="orange"
            size="md"
            asChild
            className="w-50"
          >
            <Link href="/login">로그인</Link>
          </Button>
        </div>

        {/* 내비게이션 */}
        <nav className="flex flex-col px-5">
          <p className="py-3 typo-caption-sb-1 text-gray-550">ABOUT US</p>
          <Link href="/busking-map" className="py-4 typo-body-m-3 text-black">버스킹 맵</Link>
          <Link
            href="/performance-list"
            className="py-4 typo-body-m-3 text-black"
          >
            공연 정보
          </Link>
          <Link href="/community" className="py-4 typo-body-m-3 text-black">커뮤니티</Link>
          <hr className="my-2 border-gray-200" />
          <Link
            href="/performance/register"
            className="py-4 typo-body-m-3 text-black"
          >
            공연 등록하기
          </Link>
          <button
            type="button"
            className="py-4 text-left typo-body-m-3 text-black"
          >
            로그아웃
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

/** 모바일 — 헤더 네비게이션 Right Sheet (로그인 상태) */
export const MobileNavMenuLoggedIn: Story = {
  parameters: {
    viewport: { value: 'mobile' },
    layout: 'fullscreen',
  },
  render: () => <MobileNavLoggedIn />,
};

/** 모바일 — 헤더 네비게이션 Right Sheet (비로그인 상태) */
export const MobileNavMenuLoggedOut: Story = {
  parameters: {
    viewport: { value: 'mobile' },
    layout: 'fullscreen',
  },
  render: () => <MobileNavLoggedOut />,
};
