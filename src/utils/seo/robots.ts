import type { Metadata } from 'next';

export const NO_INDEX_FOLLOW_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};
