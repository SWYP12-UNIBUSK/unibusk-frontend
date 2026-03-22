import type { Metadata } from 'next';

interface CreatePageMetadataParams {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}
export function createPageMetadata({
  title,
  description = '버스킹의 모든 순간을 잇다, UNIBUSK',
  path = '/',
  image = '/logos/logo-unibusk-stacked-vertical.png',
}: CreatePageMetadataParams): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
