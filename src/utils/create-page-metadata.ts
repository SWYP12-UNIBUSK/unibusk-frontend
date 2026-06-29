import type { Metadata } from 'next';

interface CreatePageMetadataParams {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  robots?: Metadata['robots'];
}

const DEFAULT_DESCRIPTION
  = '공연이 만들어지고, 보여지고, 시작되는 곳. 버스킹의 모든 순간을 잇다, UNIBUSK';

const DEFAULT_IMAGE = '/logos/logo-unibusk-stacked-vertical.png';

export const SHARED_OPEN_GRAPH = {
  siteName: 'UNIBUSK',
  locale: 'ko_KR',
  type: 'website' as const,
};

const SHARED_TWITTER = {
  card: 'summary_large_image' as const,
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  robots,
}: CreatePageMetadataParams): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      ...SHARED_OPEN_GRAPH,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      ...SHARED_TWITTER,
      title,
      description,
      images: [image],
    },
    robots,
  };
}
