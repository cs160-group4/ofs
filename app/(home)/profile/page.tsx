import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import { AddAddressModal } from '@/app/components/AddAddressModal';
import { UpdateEmail } from '@/app/components/UpdateEmail';
import { UpdatePassword } from '@/app/components/UpdatePassword';
import { getAvatarURL } from '@/app/lib/utils';
import { getAddress } from '@/lib/addresses';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProfilePage() {
    var signedIn = false;
    var name = "";
    var id = "";

    const session = await getAuthSession();
    if (session?.user) {
        signedIn = true;
        name = session.user.name as string;
        id = session.user.id as string;
    }
    else {
        return <main className="flex items-center justify-center h-screen">
            <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                <div className="flex flex-col items-center">
                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-black">Please Login Before You<br></br>Can See Your Profile</span>
                    </h6>
                    <Link href="/auth/signin" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                        Sign In
                    </Link>
                </div>
            </div>
        </main>
    }

    const addresses = await getAddress(id);
    const avatar = getAvatarURL(session.user.image as string);
    return (
        <div className=' flex items-center justify-center'>
            <div className="w-screen h-screen dark:bg-gray-700 bg-gray-200 pt-12">
                <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                    <div className="border-b px-4 pb-6">
                        <div className="text-center my-4">
                            <Image src={avatar} alt="avatar" width={640} height={256} className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4" />
                            <div className="py-2">
                                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">  <span className="text-primary">{name}</span></h3>
                                <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                                    <svg className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path className=""
                                            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                    </svg>
                                    San Jose, CA
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 px-2">
                            <UpdateEmail id={id} />
                            <UpdatePassword id={id} />
                        </div>
                    </div>
                    <div className="px-4 py-4">
                        <div className="grid grid-cols-[35%,65%] items-center text-gray-800 dark:text-gray-300 mb-4">
                            {/*
              <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path className=""
                  d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" />
              </svg>
              <span><strong className="text-black dark:text-white">12</strong> Followers you know</span>
              */}


                            <strong className="text-black dark:text-white">Addresses</strong>

                            <div>
                                {/* <p>{mainAddress.addressLine1} <br />
                   {mainAddress.addressLine2 !== null && (<div>{mainAddress.addressLine2}<br /></div>)}
                   {mainAddress.city}, {mainAddress.state} {mainAddress.postalCode}</p> */}
                                {addresses.map((address) => (
                                    <p key={address.id}>{address.addressLine1}<br />{address.city}, {address.state} {address.postalCode}</p>
                                ))}
                                <AddAddressModal id={id} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

