'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/button';

export function LegalConfirmButton() {
  const router = useRouter();
  return (
    <Button appearance="filled" theme="gray" size="md" onClick={() => router.back()}>
      확인
    </Button>
  );
}
