import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Image from 'next/image';
import Link from 'next/link';
import { AvatarButton } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Component/Common/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/** 1. 디자인 시안: 프로필 더보기 메뉴 — 마이페이지 + 로그아웃(destructive) */
export const ProfileMenu: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <AvatarButton
          size={50}
          aria-label="사용자 메뉴"
          aria-haspopup="menu"
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
        <DropdownMenuItem asChild className="px-2.5 py-5">
          <Link href="/profile">마이페이지</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black/10" />
        <DropdownMenuItem variant="destructive" className="px-2.5 py-5">
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** 2. 디자인 시안: 공연 더보기 메뉴 — 수정하기 + 삭제하기 (아이콘 포함) */
export const PerformanceMenu: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="더보기"
          className={`
            cursor-pointer rounded-full p-1.5 outline-0
            hover:bg-gray-100
            focus-visible:ring-0 focus-visible:ring-offset-0
          `}
        >
          <Image
            src="/icons/ellipsisVertical.svg"
            alt=""
            width={30}
            height={30}
            aria-hidden="true"
            unoptimized
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`
          w-30 typo-caption-r-1 text-black shadow-[0_0_4px_rgba(0,0,0,0.25)]
          outline-0
        `}
      >
        <DropdownMenuItem asChild className="cursor-pointer px-2.5 py-[14.5px]">
          <Link href="/performance/edit">
            <Image
              src="/icons/pencilSquare.svg"
              alt=""
              width={19}
              height={19}
              aria-hidden="true"
              unoptimized
            />
            수정하기
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black/10" />
        <DropdownMenuItem className="cursor-pointer px-2.5 py-[14.5px]">
          <Image
            src="/icons/trashCan.svg"
            alt=""
            width={19}
            height={19}
            aria-hidden="true"
            unoptimized
          />
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
