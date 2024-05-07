'use client';

import { CircleStackIcon, HomeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const STATIC_LINKS = [
  {
    name: 'Conversations',
    href: '/',
    icon: HomeIcon,
    isActive: (pathname: string) => {
      return pathname === '/';
    },
  },
  {
    name: 'Contact Management',
    href: '/contacts',
    icon: CircleStackIcon,
    isActive: (pathname: string) => {
      return pathname === '/contacts';
    },
    isDisabled: true,
  },
];

export default function StaticNavLinks() {
  const pathname = usePathname();

  const links = useMemo(() => {
    return STATIC_LINKS;
  }, []);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            data-name={link.name}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': link.isActive(pathname),
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
