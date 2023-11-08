import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import { getAddress } from '@/lib/addresses';
import { CartItem, getCart } from '@/lib/cart';
import { CartItemCard } from '@/app/components/CartItemCard';
import { PaymentMethod } from '@/app/components/PaymentMethod';
import Link from 'next/link';

export default async function Checkout() {
    var signedIn = false;
    var name = "";
    var id = "";

  const session = await getAuthSession();
  if (session?.user) {
      signedIn = true;
      name = session.user.name as string;
      id = session.user.id as string;
  }
  else {
      return <main className="flex items-center justify-center h-screen">
                  <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                      <div className="flex flex-col items-center">
                          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                              <span className="text-black">Please Login Before You<br></br>Can See Your Checkout</span> 
                          </h6>
                          <Link href="/auth/signin" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                              Sign In
                          </Link>
                      </div>
                  </div>
              </main>
  }

    const addresses = await getAddress(id);
    const mainAddress = addresses[0];

    const cartItems = await getCart(id);

    // Hung Pham 11/01/2023 - calculate subtotal, shipping, tax, and total
    let subtotal: number = 0;
    cartItems.forEach((item) => {
        if (item.products) {
            subtotal += parseFloat(item.products.itemPrice) * item.cart.quantity;
        }
    });
    const shipping = calculateShipping(cartItems);
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const subtotalString = subtotal.toFixed(2);
    const shippingString = shipping.toFixed(2);
    const taxString = tax.toFixed(2);
    const totalString = total.toFixed(2);
    // Hung Pham 11/01/2023 - end of calculations

 return (
  <div className="container mx-auto px-6 pt-7 bg-base-100 h-fill xl:px-0">
   <div className="flex pb-6 justify-center md:justify-start">
     <h1 className="text-3xl font-bold">Checkout</h1>
   </div>

            <div className="mx-auto justify-center md:flex md:space-x-6">
                <div className="grid grid-cols-3 gap-10 auto-cols-max md:w-4/5">
                    <h2 className="font-bold text-xl">1. Delivery Address</h2>
                    <div>
                        {name}<br />
                        {mainAddress.addressLine1}<br />
                        {mainAddress.addressLine2 !== null && (<p>{mainAddress.addressLine2} <br /></p>)}
                        {mainAddress.city}, {mainAddress.state} {mainAddress.postalCode}
                    </div>
                    <div>
                        <button className="btn text-center btn-link font-small">Change</button>
                    </div>


       <h2 className="font-bold text-xl">2. Payment Method</h2>
       <PaymentMethod id={id}/>
       {/* <div>
         <b>Card</b> ending in ****<br />
         <p><b>Billing Address:</b> Same as shipping address.
         <button className="btn-link font-small">Change.</button></p>
       </div>
       <div>
         <button className="btn text-center btn-link font-small">Change</button>
       </div> */}

                    <h2 className="font-bold text-xl">3. Review Items</h2>
                    <div className="col-span-2 rounded-lg overflow-y-auto max-h-[550px]">
                        <ul className="-my-2 pb-1 mt-auto mb-auto">
                            {cartItems.map((item) => (
                                <CartItemCard key={item.cart.id} id={id} item={item} revalidateUrl="/checkout" />
                            ))}
                        </ul>
                    </div>
                </div>


     <div className="container mt-6 h-full rounded-lg border bg-base-200 shadow-md md:mt-0 md:w-1/5 px-3 py-3">
       <div className="mb-2 flex justify-between">
         <p>Subtotal</p>
         <p>${subtotalString}</p>
       </div>
       <div className="mb-2 flex justify-between">
         <p>Shipping</p>
         <p>${shippingString}</p>
       </div>
       <div className="mb-2 flex justify-between">
         <p>Tax</p>
         <p>${taxString}</p>
       </div>
       <div className="divider border-black"></div>
        <div className="flex justify-between font=bold text-xl">
         <p className="text-red-600">Total</p>
         <p>${totalString}</p>
       </div>
       <Link href="/order-summary" className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium">Place Your Order & Pay</Link>
      </div>
   </div>
 </div>
 )
}

// calculates shipping cost based on weight of items in cart - Hung Pham 11/01/2023
function calculateShipping(cartItems: CartItem[]): number {
    let weight = 0;
    cartItems.forEach((item) => {
        weight += item.cart.quantity * item.products.itemWeight;
    });
    if (weight > 20) {
        return 0;
    }
    return 10;
}