'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tags/tabs';
import { userQueryOptions } from '@/queries/user/user.query';
import { cn } from '@/utils';
import { ProfileInfo } from './profile-info';
import { ProfilePerformances } from './profile-performances';

interface ProfileTabTriggerProps {
  filter: 'my-info' | 'my-performances';
  content: string;
}

export function ProfileTab() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <BaseProfileTab />
    </Suspense>
  );
}

function BaseProfileTab() {
  const { data: { email, name } }
    = useSuspenseQuery(userQueryOptions);

  return (
    <div className="flex w-full flex-1 flex-col pt-21.25">

      <Tabs
        defaultValue="my-info"
        className="flex min-h-[500px] flex-1 flex-row gap-6"
      >

        <TabsList className="mb-0 h-full w-55 flex-col bg-transparent p-0">
          <h1 className="mb-25 typo-title-sb-2 text-black">마이페이지</h1>
          <div className="m-auto flex h-30 w-full flex-col gap-5 px-5">
            <ProfileTabTrigger filter="my-info" content="내 정보" />
            <ProfileTabTrigger filter="my-performances" content="내가 등록한 공연" />
          </div>

        </TabsList>

        <div className="flex flex-1 flex-col">
          <TabsContent
            value="my-info"
            className="mt-0 flex flex-1 outline-none"
          >
            <ProfileInfo email={email} name={name} />
          </TabsContent>

          <TabsContent
            value="my-performances"
            className="mt-0 flex flex-1 outline-none"
          >
            <ProfilePerformances />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

function ProfileTabTrigger({ filter, content }: ProfileTabTriggerProps) {
  return (
    <TabsTrigger
      value={filter}
      className={cn(`
        h-12.5 w-full items-center justify-center rounded-2xl bg-transparent
        px-4 py-2 typo-body-m-3 text-black shadow-elevate-1
        data-[state=active]:bg-orange-400 data-[state=active]:text-white
      `)}
    >
      {content}
    </TabsTrigger>
  );
}
