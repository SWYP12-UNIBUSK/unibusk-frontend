'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { userQueryOptions } from '@/queries/user/user.query';

export function ProfileContainer() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <BaseProfile />
    </Suspense>
  );
}

function BaseProfile() {
  const { data: user, isPending } = useSuspenseQuery(userQueryOptions);

  if (!user) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  if (isPending) {
    return <div>...로딩 중</div>;
  }

  return (
    <div className="max-w-2xl text-gray-700">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">사용자 정보</h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">회원 ID:</span>

            {user.memberId}
          </p>
          <p>
            <span className="font-medium">이메일:</span>

            {user.email}
          </p>
          <p>
            <span className="font-medium">이름:</span>

            {user.name}
          </p>
        </div>
      </div>
    </div>
  );
}
