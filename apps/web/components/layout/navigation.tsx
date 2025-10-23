'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@devlaunch/ui';
import { ThemeToggleWrapper } from '../theme-toggle-wrapper';

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  // Hide navigation on dashboard routes since dashboard has its own sidebar
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  const links = [
    { label: 'Home', href: '/', active: pathname === '/' },
    { label: 'Dashboard', href: '/dashboard', active: pathname === '/dashboard' },
    { label: 'Blog', href: '/blog', active: pathname.startsWith('/blog') },
  ];

  return (
    <Navbar
      brand={
        <Link href="/" className="text-xl font-bold">
          DevLaunch
        </Link>
      }
      links={links}
      onLinkClick={(href) => {
        router.push(href);
      }}
      actions={<ThemeToggleWrapper />}
      sticky
    />
  );
}
