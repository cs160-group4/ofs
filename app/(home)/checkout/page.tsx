"use client";
import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Checkout = () => {

  const [activeSession, setActiveSession] = useState({});

  useEffect( () => {
    const fetchSession = async () => {

      const response = await fetch("/api/sessionInformation", {
        method: 'GET'
      });
      const x = await response.json();
      setActiveSession(x)

      // if(session?.user) {
      //   setActiveSession(true)
      // }
    }
    fetchSession();
  }, [])

  let stateAbbreviations: string[]
    = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  let quantities: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+", "Delete"];


  return (
    <div>
      { !activeSession ?
        <main className="flex items-center justify-center h-screen">
          <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
            <div className="flex flex-col items-center">
              <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-black">Please Login Before You<br></br>Can See Your Cart</span> 
              </h6>
              <Link href="/auth/signin" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                  Sign In
                </Link>
              </div>
            </div>
        </main>
        :
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
              <div>
                <dialog id="edit_delivery_address" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit your delivery address</h3>
                    <p className="font-bold py-1">Full name (First and Last name)</p>
                      <input className="border border-gray-300 rounded-lg input-bordered input-sm w-full" type="text" placeholder="Full Name" required></input>

                      <p className="font-bold py-1">Address</p>
                      <input className="border border-gray-300 rounded-lg input_bordered input-sm w-full" type="text" placeholder="Street" required></input><br />
                      <input className="border border-gray-300 rounded-lg input-bordered input-sm w-full" type="text" placeholder="Apt, suite, unit, building, floor, etc"></input>

                      <div className="grid grid-cols-3 gap-1 auto-cols-max">
                        <p className="font-bold py-1">City</p>
                        <p className="font-bold py-1">State</p>
                        <p className="font-bold py-1">ZIP Code</p>


                        <input className="border border-gray-300 rounded-lg" type="text" placeholder="City" required></input>
                        <select className="select-bordered w-xs" placeholder="State" required>
                          {stateAbbreviations.map(stateAbbreviation =>
                            <option key={stateAbbreviation}>{stateAbbreviation}</option>
                          )}
                        </select>
                        <input className="border border-gray-300 rounded-lg" type="text" placeholder="XXXXX" pattern="[0-9]{5}" required></input>
                      </div>
                      <div className="grid grid-cols-2 py-7">
                        <form method="dialog">
                          <button className="btn rounded absolute bottom-5">Cancel</button>
                        </form>
                        <button className="btn btn-accent rounded absolute bottom-5 right-5" type="submit">Use this address</button>
                      </div>
                  </div>
                </dialog>


                <button onClick={() => (document.getElementById("edit_delivery_address") as HTMLDialogElement)?.showModal()}
                  className="btn text-center btn-link font-small">
                  Change
                </button>
              </div>

              <h2 className="font-bold text-xl">2. Payment Method</h2>
              <div>
                {/* Pull payment method from user profile*/}
                <b>Card</b> ending in ****<br />
                {/* Billing is same as shipping, use edit link to edit */}
                <p><b>Billing Address:</b> Same as shipping address.</p>


                <dialog id="edit_billing_address" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit your billing address</h3>
                    <p className="font-bold py-1">Full name (First and Last name)</p>
                      <input className="border border-gray-300 rounded-lg input-sm w-full" type="text" placeholder="Full Name" required></input>

                      <p className="font-bold py-1">Address</p>
                      <input className="border border-gray-300 rounded-lg input-sm w-full" type="text" placeholder="Street" required></input><br />
                      <input className="border border-gray-300 rounded-lg input-sm w-full" type="text" placeholder="Apt, suite, unit, building, floor, etc"></input>

                      <div className="grid grid-cols-3 gap-1 auto-cols-max">
                        <p className="font-bold py-1">City</p>
                        <p className="font-bold py-1">State</p>
                        <p className="font-bold py-1">ZIP Code</p>


                        <input className="border border-gray-300 rounded-lg" type="text" placeholder="City" required></input>
                        <select className="select-bordered w-xs" required>
                          {stateAbbreviations.map(stateAbbreviation =>
                            <option key={stateAbbreviation}>{stateAbbreviation}</option>
                          )}
                        </select>
                        <input className="border border-gray-300 rounded-lg" type="text" placeholder="XXXXX" pattern="[0-9]{5}" required></input>
                      </div>
                      <div className="grid grid-cols-2 py-7">
                        <form method="dialog">
                          <button className="btn rounded absolute bottom-5">Cancel</button>
                        </form>
                        <button className="btn btn-accent rounded absolute bottom-5 right-5" type="submit">Use this address</button>
                      </div>
                  </div>
                </dialog>


                <button onClick={() => (document.getElementById("edit_billing_address") as HTMLDialogElement)?.showModal()}
                  className="btn-link font-small">
                  Change.
                </button>
              </div>


              <div>
                <dialog id="edit_payment_method" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Use a different card</h3>
                    <p className="font-bold py-1">Card Number</p>
                      <input className="border border-gray-300 rounded-lg input-bordered input-sm w-full" type="text" placeholder="XXXXXXXXXXXXXXXX" pattern="[0-9]{16}" required></input>
                      <div className="grid grid-cols-2">
                        <div>
                          <p className="font-bold py-1">Expiration Date</p>
                          <input className="border border-gray-300 rounded-lg input-bordered" type="text" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/2[3-9]" required></input>
                        </div>
                        <div>
                          <p className="font-bold py-1">Security Code (CVV/CVC)</p>
                          <input className="border border-gray-300 rounded-lg input-bordered" placeholder="XXX" pattern="[0-9]{3}" required></input>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 py-7">
                        <form method="dialog">
                          <button className="btn rounded absolute bottom-5">Cancel</button>
                        </form>
                        <button className="btn btn-accent rounded absolute bottom-5 right-5" type="submit">Use this card</button>
                      </div>
                  </div>
                </dialog>


                <button onClick={() => (document.getElementById("edit_payment_method") as HTMLDialogElement)?.showModal()}
                  className="btn text-center btn-link font-small">
                  Change
                </button>
              </div>


              <h2 className="font-bold text-xl">3. Review Items</h2>
              {/* Get shopping cart items and map them */}
              <div className="col-span-2">
                <p>*Product Img / Product Name / Quantity / Price (Total)*</p>
                <div className="card my-1 h-24 grid grid-cols-4 gap-4 auto-cols-maxborder border-gray-300 bg-white rounded-lg place-items-center">
                  <p>*Img*</p>
                  <p className="text-center">Test Product Name</p>
                  <div>
                    <input className="h-10 text-center w-full bg-gray-300 rounded-lg" type="number" placeholder="1"></input>
                    <p className="text-center py-2"><b>Weight:</b><br />Delete</p>
                  </div>
                  <p className="text-center">$XX.XX</p>
                </div>
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
              <Link href="/order-summary" className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium">Place Your Order & Pay</Link>
            </div>
          </div>
        </div>
      }
    </div>)
}


export default Checkout