import Link from 'next/link'

export default function Pages() {
    return <div className=' flex items-center justify-center'>
        <ul className="menu menu-horizontal px-1">
            <li><Link href="/blog">Blog</Link></li>  {/* Blog */}
            <li> <Link href="/pages/about">About us</Link></li>  {/* About us */}
            <li> <Link href="/pages/contact">Contact Us</Link></li>  {/* Contact */}
            <li><Link href="/pages/privacy">Privacy</Link></li> {/* Privacy */}
            <li><Link href="/pages/terms">Terms</Link></li>  {/* Terms */}
            <li><Link href="/pages/faq">FAQ</Link></li>   {/* FAQ */}
        </ul>
    </div>
}
