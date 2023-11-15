import Link from "next/link";

export default function FAQs() {
    return (
        <div className='flex flex-col items-center justify-center py-2'>
            <div className=' flex items-center justify-center'>
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/pages/privacy">Privacy</Link></li> {/* Privacy */}
                    <li><Link href="/pages/terms">Terms</Link></li>  {/* Terms */}
                    <li><Link href="/pages/faq">FAQ</Link></li>   {/* FAQ */}
                </ul>
            </div>
            <h1 className="text-3xl text-center font-bold mt-8">Frequently Asked Questions</h1>
            <div className="container mx-auto py-2 max-w-xl">
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">1. What is OFS?</h2>
                <p className="mt-3 text-1xl">
                    OFS is a local food retailer chain in the San Jose Downtown area that offers organic fruits, vegetables, and other grocery items online. Customers can order these products through the OFS website and have them delivered to their homes.
                </p>
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">2. How can I place an order?</h2>
                <p className="mt-3 text-1xl">
                    You can place an order by visiting the shop page and adding items to your cart. Then you can proceed to checkout and enter your payment information.
                </p>
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">3. Is there a minimum order value?</h2>
                <p className="mt-3 text-1xl">
                    There is no minimum order, however, there is a delivery fee of $10 if the weight of the total order is less than 20 pounds.
                </p>
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">4. How is the delivery fee calculated?</h2>
                <p className="mt-3 text-1xl">
                    The delivery fee is calculated from the total weight of the order. If the total order weight is less than 20 pounds, a $10 charge will be added for delivery fees.
                </p>
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">4. How can I pay for my order?</h2>
                <p className="mt-3 text-1xl">
                    You can pay for the order in the checkout page by entering your payment information, then clicking the Place Your Order & Pay Button to continue.
                </p>
                <h2 className="text-2xl font-bold mb-5 mt-5 text-center">5. How can I track my order?</h2>
                <p className="mt-3 text-1xl">
                    You can track your order by staying on the order page to see what the route from the delivery is.
                </p>
            </div>
        </div>
    )
}