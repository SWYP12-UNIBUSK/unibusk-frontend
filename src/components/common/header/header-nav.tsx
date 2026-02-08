import Link from 'next/link';
import { cn } from '@/utils';

const NAV_ITEMS = [
  // { label: 'ABOUT US', href: '/about-us' },
  { label: '공연 정보', href: '/performance-list' },
  { label: '버스킹 맵', href: '/busking-map' },
] as const;

interface HeaderNavProps {
  align: 'center' | 'right';
  className?: string;
}

export function HeaderNav({ align, className }: HeaderNavProps) {
  const wrapper = align === 'center' ? 'justify-center' : 'justify-end';

  return (
    <nav aria-label="헤더 내비게이션" className={cn('flex w-full', wrapper, className)}>
      <ul className="flex flex-nowrap items-center gap-8 whitespace-nowrap">
        {NAV_ITEMS.map(item => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              className={`
                shrink-0 typo-body-m-3 font-semibold whitespace-nowrap
                text-black transition-colors
                hover:text-gray-700
              `}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
