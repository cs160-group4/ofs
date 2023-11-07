import Link from 'next/link'

export default function Terms() {
    return (
        <div className='flex flex-col items-center justify-center py-2'>
            <div className=' flex items-center justify-center'>
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/pages/privacy">Privacy</Link></li> {/* Privacy */}
                    <li><Link href="/pages/terms">Terms</Link></li>  {/* Terms */}
                    <li><Link href="/pages/faq">FAQ</Link></li>   {/* FAQ */}
                </ul>
            </div>
            <h1 className="text-3xl text-center font-bold mt-8">Terms of Service</h1>
            <div className="container mx-auto py-2 max-w-xl">
                <p className="mt-3 text-2xl">Last updated: 2023-10-12</p>
                <p className="mt-3 text-1xl">Please read this Terms of Service agreement carefully before accessing or using our website.</p>
                These Terms and Conditions govern your use of the OFS website and services. By accessing or using our website, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use our services.

                <p className="mt-5 text-1xl">The terms “us”, “we”, and “our” refer to OFS.</p>
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">1. Use of the Service</h2>
                You must be at least 18 years old to use our services.
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">2. Orders and Payments</h2>


                By placing an order through our website, you are ...
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">3. Delivery</h2>
                Our orders are delivered within 1-2 business days. We will contact you to confirm the delivery date and time.
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">4. Refund</h2>
                You may request a refund for any order within 30 days of purchase.
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">5. Intellectual Property</h2>
                The content on our website is owned by us and our licensors and is protected by intellectual property laws.
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">6. Privacy</h2>
                We respect your privacy and are committed to protecting your personal information. Please refer to our <Link href="/pages/privacy">Privacy Policy</Link> for more details.
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">7. Limitation of Liability</h2>
                We are not liable for any damages that may arise from using our services.
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">8. Governing Law</h2>
                These Terms are governed by the laws of the United States.
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">9. Changes to Terms</h2>
                We may update these Terms from time to time. You are advised to review this page periodically for any changes.
            </div>
        </div>




    )
}