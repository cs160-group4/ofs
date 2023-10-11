import Link from 'next/link'

const Checkout = async() => {
 return (
   <div className="container mx-auto px-6 pt-7 bg-base-100 h-screen xl:px-0">
     <div className="flex pb-6 justify-center md:justify-start">
       <h1 className="text-4xl">Checkout</h1>
     </div>


     <div className="mx-auto justify-center md:flex md:space-x-6">
       <div className="grid grid-cols-3 gap-10 auto-cols-max md:w-4/5">
         <h2 className="font-bold text-xl">1. Delivery Address</h2>
         <div>
           {/* Pull customer info from user profile */}
           Jane Doe<br />
           Street<br />
           City, State, Zipcode
         </div>
         {/* All change buttons should bring up a popup */}
         <p className="text-center btn btn-link font-small">Change</p>


         <h2 className="font-bold text-xl">2. Payment Method</h2>
         <div>
           {/* Pull payment method from user profile*/}
           <b>Visa</b> ending in ****<br />
           {/* Billing is same as shipping, use edit link to edit */}
           <b>Billing address:</b> Same as shipping address. Change.
         </div>
         <p className="text-center btn btn-link font-small">Change</p>


         <h2 className="font-bold text-xl">3. Review Items</h2>
         {/* Get shopping cart items and map them */}
         <div className="flow-root">
           <table className='table table-bordered'>
             <thead>
               <th>*Product Img*</th>
               <th>*Product Name (Price of 1)*</th>
               <th>*Quantity</th>
               <th>*Price*</th>
             </thead>
           </table>
         </div>
       </div>


       <div className="container mt-6 h-full rounded-lg border bg-base-200 shadow-md md:mt-0 md:w-1/5 px-3 py-3">
         <div className="mb-2 flex justify-between">
           <p>Subtotal</p>
           <p>$XX.XX</p>
         </div>
         <div className="mb-2 flex justify-between">
           <p>Shipping</p>
           <p>$XX.XX</p>
         </div>
         <div className="divider border-black"></div>
         <div className="flex justify-between font=bold text-xl">
           <p className="text-red-600">Total</p>
           <p>$XX.XX</p>
         </div>
         <Link href="/checkout" className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium">Place Your Order & Pay</Link>
         </div>
     </div>
   </div> 
 )
}


export default Checkout