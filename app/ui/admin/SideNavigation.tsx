import { User } from '@/app/lib/users';
import { SignOutLink } from '@/app/ui/common/SignOutLink';
import NavLinks from '@/ui/admin/NavLinks';
import OFSLogo from '@/ui/logo';
import Link from 'next/link';
import {
  HomeIcon
} from '@heroicons/react/24/outline';
export default function SideNavigation({ user }: { user: User }) {
  const LinkIcon = HomeIcon;
  return (
    <>
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link className="flex items-center justify-center mb-2  rounded-md bg-primary p-4"
          href="/admin/">
          <OFSLogo />
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks user={user}
          />
          <div className="hidden h-auto w-full grow rounded-md bg-grey-50 md:block"></div>
          <div className="w-full  rounded-md bg-grey-50 md:block">
            <Link href="/"
              className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-medium  hover:bg-sky-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3'>
              <LinkIcon className="w-6" />
              <p className="hidden md:block">     Back to Main Page</p>
            </Link>

          </div>
          <div className="w-full rounded-md bg-grey-50 md:block p-3 bg-slate-50">
            <SignOutLink />
          </div>

        </div>
      </div >
    </>
  );
}
