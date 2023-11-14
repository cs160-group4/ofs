'use client';

import {
    UserGroupIcon,
    CubeIcon,
    DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { PowerIcon } from '@heroicons/react/24/outline';
import { User } from '@/app/lib/users';
const links = [
    { name: 'Dashboard', href: '/admin', icon: CubeIcon },
    { name: 'Users', href: '/admin/users', icon: UserGroupIcon, roles: ['admin'] },
    {
        name: 'Products',
        href: '/admin/products',
        icon: DocumentDuplicateIcon,
    },
];

export default function NavLinks({ user }: { user: User }) {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                if (link.roles && !link.roles.includes(user.role)) {
                    return null;
                }
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 hover:text-primary': pathname === link.href,
                            },
                        )}>
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>

                );
            }
            )}

        </>
    );
}
