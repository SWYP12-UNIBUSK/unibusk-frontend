import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/common/button';
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
