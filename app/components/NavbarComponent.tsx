import Link from 'next/link'
import Image from 'next/image'
import logo from "@/public/images/h_logo.png"
import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import { SignOutLink } from '@/components/SignOutLink'
import { SignInButton } from '@/components/SignInButton'

export default async function NavbarComponent() {
    var signedIn = false;
    var name = "";
    const session = await getAuthSession();
    if (session?.user) {
        signedIn = true;
        name = session.user.name as string;
    }
    return (
        <div>

            <div className="navbar bg-base-100">
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
                                <ul className="p-2">
                                    <li><a >Category 1</a></li>
                                    <li><a>Category 2</a></li>
                                </ul>
                            </li>
                            {/* Blog */}
                            <li><Link href="/blog">Blog</Link></li>
                            {/* Pages */}
                            <li><Link href="/pages">Pages</Link></li>
                            {/* About Us */}
                            <li><Link href="/pages/about">About Us</Link></li>
                            {/* Contact Us */}
                            <li><Link href="/pages/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    {/* Logo */}
                    <Link href="/" className='lg:ml-36 ml-4'>
                        <Image src={logo} alt="avatar" width={640} height={256} className="w-48 h-14 logo-image" />
                    </Link>
                </div>
                {/* Main Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/shop/all">Shop</Link></li>
                        {/* <li tabIndex={0}>
                            <details>
                                <summary><Link href="/shop">Shop</Link></summary>
                                <ul className="p-2">
                                    <li><a >Category 1</a></li>
                                    <li><a>Category 2</a></li>
                                </ul>
                            </details>
                        </li> */}
                        {/* Blog */}
                        <li><Link href="/blog">Blog</Link></li>
                        {/* Pages */}
                        <li><Link href="/pages">Pages</Link></li>
                        {/* About Us */}
                        <li><Link href="/pages/about">About Us</Link></li>
                        {/* Contact Us */}
                        <li><Link href="/pages/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* Search Button*/}
                    <button className="btn btn-ghost btn-circle mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    {/* Cart Button */}
                    <button className="btn btn-ghost btn-circle mr-1">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end mr-1">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">8 Items</span>
                                <span className="text-info">Subtotal: $36.62</span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">
                                        <Link href="/cart">View Cart</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Avatar */}
                    {signedIn ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} className="flex flex-col btn btn-ghost">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 1024 1024" className="fill-current">
                                    <path
                                        d="M819.2 729.088V757.76c0 33.792-27.648 61.44-61.44 61.44H266.24c-33.792 0-61.44-27.648-61.44-61.44v-28.672c0-74.752 87.04-119.808 168.96-155.648 3.072-1.024 5.12-2.048 8.192-4.096 6.144-3.072 13.312-3.072 19.456 1.024C434.176 591.872 472.064 604.16 512 604.16c39.936 0 77.824-12.288 110.592-32.768 6.144-4.096 13.312-4.096 19.456-1.024 3.072 1.024 5.12 2.048 8.192 4.096 81.92 34.816 168.96 79.872 168.96 154.624z" />
                                    <path d="M359.424 373.76a168.96 152.576 90 1 0 305.152 0 168.96 152.576 90 1 0-305.152 0Z" />
                                </svg> */}
                                <button className="flex items-center">
                                    <div className="hidden mr-3 text-right md:block">
                                        <p className="text-sm font-bold text-black dark:text-gray-400">
                                            <span className="text-sm text-primary">{name}</span>
                                        </p>
                                    </div>
                                    <div className="mr-2">
                                        <Image src={session?.user?.image as string} alt="avatar" width={640} height={256} className="w-8 h-8 rounded-full" />
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
                                <li>
                                    <Link href="/profile" className="justify-between">Profile
                                        {/* <span className="badge">New</span>*/}
                                    </Link>
                                </li>
                                {/* <li><Link href="/settings">Settings</Link></li> */}
                                <li><SignOutLink /></li>
                            </ul>
                        </div>
                        : <Link href="/auth/sign-in" className="btn btn-ghost btn-circle"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 1024 1024" className="fill-current">
                            <path
                                d="M819.2 729.088V757.76c0 33.792-27.648 61.44-61.44 61.44H266.24c-33.792 0-61.44-27.648-61.44-61.44v-28.672c0-74.752 87.04-119.808 168.96-155.648 3.072-1.024 5.12-2.048 8.192-4.096 6.144-3.072 13.312-3.072 19.456 1.024C434.176 591.872 472.064 604.16 512 604.16c39.936 0 77.824-12.288 110.592-32.768 6.144-4.096 13.312-4.096 19.456-1.024 3.072 1.024 5.12 2.048 8.192 4.096 81.92 34.816 168.96 79.872 168.96 154.624z" />
                            <path d="M359.424 373.76a168.96 152.576 90 1 0 305.152 0 168.96 152.576 90 1 0-305.152 0Z" />
                        </svg></Link>
                    }
                    {/* Toggle darkmode button */}
                    <label className="btn btn-ghost btn-circle swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" data-toggle-theme="dark,cupcake" />
                        {/* sun icon */}
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        {/* moon icon */}
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>
                </div>

            </div>
        </div>

    )
}