import Image from 'next/image';
import Link from 'next/link';

export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logos/logo-unibusk-stacked-horizontal.webp"
        alt="UNIBUSK logo"
        width={154}
        height={34}
        priority
      />
    </Link>
  );
}
