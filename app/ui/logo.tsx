import Link from "next/link";
import logo from "@/public/images/h_logo_w.png";
import Image from "next/image";
export default async function OFSLogo() {
    return (
        <Image src={logo} alt="ofs logo" width={192} height={56} priority className="w-48 h-14" />
    )

}