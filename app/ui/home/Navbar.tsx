import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import DarkModeToggleButton from '@/app/ui/common/DarkModeButton'
import { SignOutLink } from '@/app/ui/common/SignOutLink'
import LogoIcon from '@/ui/logo_icon'
import Image from 'next/image'
import Link from 'next/link'
import { SearchBarComponent } from '@/components/SearchBarComponent'
import IconAdmin from '@/app/ui/admin/IconAdmin'
import { getAvatarURL } from '@/lib/utils'
import { getCart } from '@/app/lib/cart'

export default async function NavbarComponent() {
    var signedIn = false;
    var name = "";
    var id = "";
    var numCartItems: number = 0;
    var cartItemsPrice: number = 0;
    const session = await getAuthSession();

    if (session?.user) {
        signedIn = true;
        name = session.user.name as string;
        id = session.user.id as string;
    }

    const cartItems = await getCart(id);

    cartItems.forEach((item) => {
        if (item.products) {
            cartItemsPrice += parseFloat(item.products.itemPrice) * item.cart.quantity;
            numCartItems++;
        }
    });

    let avatar = getAvatarURL(session?.user?.image);
    return (
        <div className="z-1">
            <div className="navbar bg-base-100 ">
                {/* Mobile Dropdown Menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link href="/">Home</Link></li>
                            <li>
                                <Link href="/shop">Shop</Link>
                            </li>
                            {/* Blog */}
                            <li><Link href="/blog">Blog</Link></li>
                            {/* Pages */}
                            <li><Link href="/pages/privacy">Pages</Link></li>
                            {/* About Us */}
                            <li><Link href="/pages/about">About Us</Link></li>
                            {/* Contact Us */}
                            <li><Link href="/pages/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <LogoIcon />
                </div>
                {/* Main Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/shop/all">Shop</Link></li>
                        {/* Blog */}
                        <li><Link href="/blog">Blog</Link></li>
                        {/* Pages */}
                        <li><Link href="/pages/privacy">Pages</Link></li>
                        {/* About Us */}
                        <li><Link href="/pages/about">About Us</Link></li>
                        {/* Contact Us */}
                        <li><Link href="/pages/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <SearchBarComponent />
                    {/* Cart Button */}
                    <button className="btn btn-ghost btn-circle mr-1 group">
                        <div className="indicator group-hover:animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                fill="currentColor" className="" viewBox="0 0 16 16">
                                <path
                                    d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item "></span>
                        </div>
                    </button>
                    {signedIn ?
                        <div className="dropdown dropdown-end mr-1 group">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator group-hover:animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{numCartItems}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg">{numCartItems} Items</span>
                                    <span className="text-info">Subtotal: ${Math.round(cartItemsPrice * 100)/ 100}</span>
                                    <div className="card-actions">
                                        <Link href="/cart">
                                            <button className="btn btn-primary btn-block">
                                                View Cart
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="dropdown dropdown-end mr-1 group">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator group-hover:animate-bounce">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{numCartItems}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg text-center">Log In</span>
                                    <div className="card-actions justify-center">
                                        <Link href="/auth/signin">
                                            <button className="btn btn-primary btn-block">
                                                Log In
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {/* Avatar */}
                    {signedIn ?
                        <div className="dropdown dropdown-end ">
                            <div tabIndex={0} className="flex flex-col btn btn-ghost z-0">
                                <button className="flex items-center hover:animate-pulse">
                                    <div className="hidden mr-3 text-right md:block">
                                        <p className="text-sm font-bold text-black dark:text-gray-400">
                                            <span className="text-sm text-primary">{name}</span>
                                        </p>
                                    </div>
                                    <div className="mr-2 ">
                                        <Image src={avatar} alt="avatar" width={32} height={32} className="w-8 h-8 rounded-full " />
                                    </div>
                                    <span>
                                        <svg className="text-gray-400" width="10" height="6" viewBox="0 0 10 6"
                                            fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.08335 0.666657C8.75002 0.333323 8.25002 0.333323 7.91669 0.666657L5.00002 3.58332L2.08335 0.666657C1.75002 0.333323 1.25002 0.333323 0.916687 0.666657C0.583354 0.99999 0.583354 1.49999 0.916687 1.83332L4.41669 5.33332C4.58335 5.49999 4.75002 5.58332 5.00002 5.58332C5.25002 5.58332 5.41669 5.49999 5.58335 5.33332L9.08335 1.83332C9.41669 1.49999 9.41669 0.99999 9.08335 0.666657Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </button>

                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {session?.user?.role === "admin" ?
                                    <li>
                                        <Link href="/admin" className="justify-between group">
                                            <div className="flex items-center text-sm font-semibold text-gray-600 transition-colors duration-200 hover:text-gray-800">
                                                <IconAdmin />
                                                Admin Dashboard
                                            </div>
                                        </Link>
                                        <div className="divider m-0"></div>
                                    </li> : null}
                                <li>
                                    <Link href="/profile" className="justify-between group">
                                        <div className="flex items-center text-sm font-semibold text-gray-600 transition-colors duration-200 hover:text-gray-800  hover:animate-pulse">
                                            <svg className="mr-2 group-hover:animate-spin" xmlns="http://www.w3.org/2000/svg" width="22"
                                                height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="3"></circle>
                                                <path
                                                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                                                </path>
                                            </svg>
                                            Profile
                                            {/* <span className="badge">New</span>*/}
                                        </div>
                                    </Link>
                                </li>

                                <li>
                                    <SignOutLink />
                                </li>
                            </ul>
                        </div>
                        : <Link href="/auth/signin" className="btn btn-ghost btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 1024 1024" className="fill-current">
                            <path
                                d="M819.2 729.088V757.76c0 33.792-27.648 61.44-61.44 61.44H266.24c-33.792 0-61.44-27.648-61.44-61.44v-28.672c0-74.752 87.04-119.808 168.96-155.648 3.072-1.024 5.12-2.048 8.192-4.096 6.144-3.072 13.312-3.072 19.456 1.024C434.176 591.872 472.064 604.16 512 604.16c39.936 0 77.824-12.288 110.592-32.768 6.144-4.096 13.312-4.096 19.456-1.024 3.072 1.024 5.12 2.048 8.192 4.096 81.92 34.816 168.96 79.872 168.96 154.624z" />
                            <path d="M359.424 373.76a168.96 152.576 90 1 0 305.152 0 168.96 152.576 90 1 0-305.152 0Z" />
                        </svg></Link>
                    }
                    {/* Toggle darkmode button */}
                    <DarkModeToggleButton />
                </div>

            </div>
        </div>

    )
}