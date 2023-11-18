import Link from "next/link";
import logo from "@/public/images/h_logo.png";
import Image from "next/image";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function LogoIcon() {

    return (
        <Link href="/" className='lg:ml-12 ml-4'>
            <Image src={logo} alt="ofs logo" width={640} height={256} priority className="w-48 h-14 logo-image" />
        </Link>
    )

}