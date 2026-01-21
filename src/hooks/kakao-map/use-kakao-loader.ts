'use client';

import { useEffect, useState } from 'react';
import { ENV } from '@/utils';
import { loadKakaoSdk } from '@/utils/kakao-map';

export function useKakaoLoader() {
  const appKey = ENV.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? '';

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (appKey.trim().length === 0) {
      return;
    }

    loadKakaoSdk(appKey)
      .then(() => setIsLoaded(true))
      .catch(e => setError(e instanceof Error ? e : new Error(String(e))));
  }, [appKey]);

  return { isLoaded, error };
}
