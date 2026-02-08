export const ENV = {
  API_URL: process.env.API_URL || 'http://localhost:8080',

  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  NEXT_PUBLIC_KAKAO_MAP_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY ?? '',
} as const;
