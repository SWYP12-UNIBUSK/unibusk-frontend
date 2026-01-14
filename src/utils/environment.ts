export const ENV = {
  API_URL: process.env.API_URL || 'http://localhost:3000',

  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING || 'disabled',
} as const;
