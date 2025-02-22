import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import { RegisterForm } from '@/app/ui/auth/RegisterForm';
import { redirect } from 'next/navigation';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function RegisterPage() {
    const session = await getAuthSession();
    if (session?.user) {
        redirect("/");
    }
    return (
        <section className="flex flex-wrap items-center justify-center font-poppins">
            <div className="max-w-  xl">
                <div className="lg:py-7">
                    <div
                        className="lg:p-12 shadow-md rounded-md p-6 mx-auto text-center bg-[#dbeafe6e] ">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

