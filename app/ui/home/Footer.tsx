import Link from 'next/link'
export default function FooterComponent() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        {/* About us */}
        <Link href="/pages/about">About us</Link>
        {/* Contact */}
        <Link href="/pages/contact">Contact Us</Link>
        {/* Privacy */}
        <Link href="/pages/privacy">Privacy</Link>
        {/* Terms */}
        <Link href="/pages/terms">Terms</Link>
        {/* FAQ */}
        <Link href="/pages/faq">FAQ</Link>

      </nav>
      <aside>
        <p>Copyright © 2023 - All right reserved by Team 4 - Fall 2023 - CS 160 - SJSU</p>
      </aside>
    </footer>
  )
}

