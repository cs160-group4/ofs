import Link from 'next/link'
export default function FooterComponent() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        {/* About us */}
        <Link href="/about">About us</Link>
        {/* Contact */}
        <Link href="/contact">Contact Us</Link>
        {/* Privacy */}
        <Link href="/privacy">Privacy</Link>
        {/* Terms */}
        <Link href="/terms">Terms</Link>
        {/* FAQ */}
        <Link href="/faq">FAQ</Link>

      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 462.799" className="fill-current" >
              <path fillRule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z" /></svg>
          </Link>
          <Link href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"> </path> </svg>
          </Link>
          <Link href="">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
          </Link>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2023 - All right reserved by Team 4 - Fall 2023 - CS 160 - SJSU</p>
      </aside>
    </footer>
  )
}

