import Link from "next/link";
import logo from "@/public/images/h_logo_w.png";
import Image from "next/image";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function OFSLogo() {
    return (
        <Image src={logo} alt="ofs logo" width={192} height={56} priority className="w-48 h-14" />
    )

}