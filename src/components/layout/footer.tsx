import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils';
import { MainLayout } from './main-layout';

const SITEMAP_LINKS = [
  { label: '홈', href: '/' },
  { label: 'ABOUT US', href: '/about-us' },
  { label: '버스킹 맵', href: '/busking-map' },
  { label: '공연 정보', href: '/performance-list' },
] as const;

const POLICY_LINKS = [
  { label: '이용약관', href: '/terms' },
  { label: '개인정보 처리방침', href: '/privacy' },
] as const;

export function Footer() {
  return (
    <footer
      className={cn(
        'relative left-1/2 w-screen -translate-x-1/2 border-t border-gray-100',
        'bg-gray-100 py-9',
        'md:py-12',
      )}
    >
      <MainLayout className={cn('px-5', 'md:px-6')}>
        <div
          className={cn(
            'grid gap-8',
            'md:grid-cols-[1fr_auto] md:items-start md:gap-14',
          )}
        >
          <div className="flex max-w-95 flex-col">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logos/logo-unibusk-stacked-vertical-small.webp"
                alt="UNIBUSK"
                width={148}
                height={76}
              />
            </Link>

            <div className="mt-1 pl-4 typo-caption-r-2 break-keep text-gray-400">
              <p>버스킹의 모든 순간을 잇다, UNIBUSK</p>
              <p>© UNIBUSK. All rights reserved.</p>
            </div>
          </div>

          <div className={cn('grid grid-cols-2 gap-8', 'md:min-w-90 md:gap-14')}>
            <FooterLinkGroup title="사이트맵" links={SITEMAP_LINKS} />
            <FooterLinkGroup title="정책" links={POLICY_LINKS} />
          </div>
        </div>
      </MainLayout>
    </footer>
  );
}

interface FooterLinkGroupProps {
  title: string;
  links: readonly {
    label: string;
    href: string;
  }[];
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <nav aria-label={`푸터 ${title}`}>
      <h2 className="typo-body-sb-3 text-black">{title}</h2>
      <ul className="mt-3 flex flex-col gap-2.5">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'typo-caption-r-1 text-gray-500 transition-colors',
                'hover:text-black',
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
