import { User } from '@/app/lib/users';
import { SignOutLink } from '@/app/ui/common/SignOutLink';
import NavLinks from '@/ui/admin/NavLinks';
import OFSLogo from '@/ui/logo';
import Link from 'next/link';

export default function SideNavigation({ user }: { user: User }) {
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
          <SignOutLink />
        </div>
      </div>
    </>
  );
}
