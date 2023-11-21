import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import { AddAddressModal } from '@/app/components/AddAddressModal';
import { UpdateEmail } from '@/app/components/UpdateEmail';
import { UpdatePassword } from '@/app/components/UpdatePassword';
import { getAvatarURL } from '@/app/lib/utils';
import { getAddress, deleteAddress } from '@/lib/addresses';
import { getPaymentMethod, deletePaymentMethod } from '@/app/lib/payment_methods';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

/*
  Authors: Fariha Ahmed <fariha.ahmed@sjsu.edu>, Aaron Low <aaron.c.low@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export default async function ProfilePage() {
    var signedIn = false;
    var name = "";
    var id = "";
    var email = "";

    const session = await getAuthSession();
    if (session?.user) {
        signedIn = true;
        name = session.user.name as string;
        id = session.user.id as string;
        email = session.user.email as string;
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
    const paymentMethods = await getPaymentMethod(id);
    const avatar = getAvatarURL(session.user.image as string);
    
    return (
        <div className=' flex items-center md:flex justify-center'>
            <div className="w-screen overflow-scroll dark:bg-gray-700 bg-gray-200 pt-12">
                <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
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
                        <div className="grid grid-cols-[25%,75%] items-center text-gray-800 dark:text-gray-300 mb-4">
                            <strong className="text-black dark:text-white">Email</strong>
                            <p className="">{email}</p>

                            <strong className="text-black dark:text-white">Addresses</strong>

                            <div>
                                {addresses.map((address) => (
                                    <div key={address.id} className="grid grid-cols-[65%,35%] py-2">
                                        <p>{address.addressLine1}<br />{address.city}, {address.state} {address.postalCode}</p>
                                        <div className="flex">
                                            {/* <form>
                                                <button className="btn-link py-2">Edit</button>
                                            </form> */}
                                            <form action={async (formData: FormData) => {
                                                "use server"
                                                formData.set("id", String(address.id));
                                                await deleteAddress(Number(formData.get("id")));
                                                revalidatePath("/");
                                            }}>
                                                <button className="btn-link py-2 px-4">Delete</button>
                                            </form>
                                        </div>    
                                    </div>
                                    
                                ))}
                                <AddAddressModal id={id} />
                            </div>

                            <strong className="text-black dark:text-white">Cards</strong>
                            <div className="py-2">
                                {paymentMethods.map((card) => (
                                    <div key={card.id} className="grid grid-cols-[65%,35%] py-2">
                                        <p><b>Card</b> ending in <b>{card.cardNumber.slice(-4)}</b></p>
                                        <div className="flex">
                                            <form action={async (formData: FormData) => {
                                                "use server"
                                                formData.set("id", String(card.id));
                                                await deletePaymentMethod(Number(formData.get("id")));
                                                revalidatePath("/");
                                            }}>
                                                <button className="btn-link px-4">Delete</button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

