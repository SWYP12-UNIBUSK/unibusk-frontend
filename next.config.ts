import type { NextConfig } from 'next';
import { ENV } from '@/utils';

const nextConfig: NextConfig = {
  trailingSlash: false,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${ENV.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },

  images: {
    // 최신 형식 우선 (AVIF > WebP > JPEG)
    formats: ['image/avif', 'image/webp'],

    // 캐싱 1년 (Cloudflare 활용)
    minimumCacheTTL: 31536000,

    // 모바일/데스크톱 모든 크기
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],

    // 외부 이미지 허용 (BE URL용)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'zustand'],
  },
};

export default nextConfig;
