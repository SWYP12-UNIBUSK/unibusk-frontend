import type { MetadataRoute } from 'next';
import { ENV } from '@/utils';

const SITE_URL = ENV.NEXT_PUBLIC_API_URL || 'https://unibusk.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
