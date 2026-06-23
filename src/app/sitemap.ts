import type { MetadataRoute } from 'next';
import { toAbsoluteUrl } from '@/utils/seo';

export const revalidate = 3600;

const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/busking-map', changeFrequency: 'daily', priority: 0.8 },
  { path: '/performance-list', changeFrequency: 'daily', priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_PAGES.map(({ path, ...metadata }) => ({
    url: toAbsoluteUrl(path),
    ...metadata,
  }));
}
