'use client';
import {
    CubeIcon,
    UserGroupIcon,
    TagIcon,
    Square3Stack3DIcon,
    ChatBubbleBottomCenterTextIcon,
    RocketLaunchIcon,
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
        name: 'Categories',
        href: '/admin/categories',
        icon: TagIcon,
    },
    {
        name: 'Products',
        href: '/admin/products',
        icon: Square3Stack3DIcon,
    },
    {
        name: 'Comments',
        href: '/admin/comments',
        icon: ChatBubbleBottomCenterTextIcon,
    },
    {
        name: 'Delivery Robots',
        href: '/admin/robots',
        icon: RocketLaunchIcon,
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
            <div className="w-full rounded-md bg-grey-50 md:block p-3 ">
                {/* User's Role */}
                <p className="text-sm font-medium text-gray-600">Role: <span className="text-gray-900">{user.role.toUpperCase()}</span></p>
            </div>

        </>
    );
}
