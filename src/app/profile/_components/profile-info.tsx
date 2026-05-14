'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button } from '@/components/common/button';
import { AvatarCircleIcon } from '@/components/common/icon';
import { useAuth } from '@/hooks';
import { userQueryOptions } from '@/queries/user/user.query';
import { cn } from '@/utils';

const ProfileEditModal = dynamic(
  () => import('./profile-edit-modal').then(m => m.ProfileEditModal),
  { ssr: false },
);

interface DisplayInputProps {
  label: string;
  value?: string | number;
}

export function ProfileInfo() {
  const { data: { email, name } } = useSuspenseQuery(userQueryOptions);
  const { logout, isLogoutPending } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex w-full flex-col items-center gap-16.75">
      {/* 아바타 아이콘 */}
      <div className="flex items-center justify-center">
        <div className={`
          flex size-[85.85px] items-center justify-center rounded-full
          bg-gray-200
        `}
        >
          <AvatarCircleIcon
            aria-hidden={true}
            width={80}
            height={80}
          />
        </div>
      </div>

      {/* 프로필 정보 */}
      <div className="relative flex w-full flex-col gap-7.5 px-91.5">
        <Button
          theme="orange"
          appearance="outline"
          size="xs"
          className="absolute right-0 mr-91.5"
          onClick={() => setIsModalOpen(true)}
        >
          수정하기
        </Button>
        <DisplayInput label="닉네임" value={name} />
        <DisplayInput label="이메일" value={email} />
      </div>

      {/* 이탈 버튼 */}
      <div className="flex gap-2.5">
        <Button theme="lightOrange" size="md">회원탈퇴</Button>
        <Button
          theme="gray"
          size="md"
          disabled={isLogoutPending}
          onClick={() => void logout()}
        >
          로그아웃
        </Button>
      </div>

      {/* 프로필 수정 모달 */}
      <ProfileEditModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        currentName={name}
      />
    </section>
  );
}

export function DisplayInput({
  label,
  value,
}: DisplayInputProps) {
  return (
    <div className="flex flex-col gap-2.5 text-black">
      <span className="pl-2.5 typo-body-sb-2">{label}</span>
      <div
        className={cn(
          `
            flex h-15 w-full items-center rounded-full border border-gray-300
            bg-gray-100 p-5
          `,
          'typo-body-m-3',
          'cursor-default outline-none',
        )}
      >
        {value}
      </div>
    </div>
  );
}
