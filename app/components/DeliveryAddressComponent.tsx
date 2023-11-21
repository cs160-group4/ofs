"use client"
import { useState } from 'react';
import { geocode } from '../lib/utils';
import { Addresses } from '@/lib/addresses';
import { addNewAddress, getLatestAddress } from "../actions";

export function DeliveryAddressComponent({id, addresses, setShippingAddress, className, txt}: {id: string, addresses: Addresses[], setShippingAddress: Function, className: string, txt: string}) {  
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [addAddressForm, setAddAddressForm] = useState(false);
  const [validAddress, setValidAddress] = useState(true);
  const [suggestedAddress, setSuggestedAddress] = useState("");

  let stateAbbreviations: string[]
    = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  return (
    <>
      <div>
        <button onClick={() => (document.getElementById("addresses") as HTMLDialogElement)?.showModal()} className={className}>{txt}</button>

        <dialog id = "addresses" className="modal">
          <div className="modal-box"> 
            <h3 className="font-bold text-lg">Addresses</h3>
            <div className="grid grid-cols-2">
              <div>
                <button onClick={(event) => {
                    setAddAddressForm(!addAddressForm);
                  }}
                  className="text-center btn-link font-small">Add new address</button>           
            
                {addAddressForm && (
                  <div>
                    <form action={async (formData: FormData) => {
                      const line1 = formData.get("addressLine1");
                      const city = formData.get("city");
                      const state = formData.get("state");
                      const postalCode = formData.get("postalCode");
                      const addressString = `${line1}, ${city}, ${state} ${postalCode}`

                      const geocodeRes = await geocode(addressString);
                      
                      console.log(geocodeRes.isValid);

                      if(!geocodeRes.isValid) {
                        setValidAddress(false);
                        console.log(geocodeRes.suggestedAddress);
                        setSuggestedAddress(geocodeRes.suggestedAddress);
                      } else {
                        setValidAddress(true);
                        formData.set("userId", id);

                        formData.set("latitude", geocodeRes.latitude);
                        formData.set("longitude", geocodeRes.longitude);

                        console.log(geocodeRes.data);
                        const res = await addNewAddress(formData);
                        console.log(res.message);

                        const newestAddress = await getLatestAddress(id);
                        setShippingAddress(newestAddress.data?.id);

                        setAddAddressForm(false);
                      }
                    }}>  
                      <p className="font-bold py-1">Address</p>
                      <input className="border border-gray-300 rounded-lg input-sm w-full" name="addressLine1" type="text" placeholder="Street" required></input>
                      <input className="border border-gray-300 rounded-lg input-sm w-full" name="addressLine2" type="text" placeholder="Apt, suit, unit, building, floor, etc"></input>
            
                      <div className="grid grid-cols-3 gap-1 auto-cols-max">
                        <p className="font-bold py-1">City</p>
                        <p className="font-bold py-1">State</p>
                        <p className="font-bold py-1">ZIP Code</p>

                        <input className="border border-gray-300 rounded-lg" name="city" type="text" placeholder="City" required></input>
                        <select className="select-bordered w-xs rounded-lg" name="state">{
                           stateAbbreviations.map(stateAbbreviation => 
                            <option key={stateAbbreviation}>{stateAbbreviation}</option>)
                        }</select>
                        <input className="border border-gray-300 rounded-lg" name="postalCode" type="text" placeholder="XXXXX" pattern="[0-9]{5}" required></input>
                      </div>
                      <div className="py-2">
                        {!validAddress &&
                          <span>
                            <p className="text-red-600">Address is invalid</p>
                            <p>Did you mean: <br/> {suggestedAddress}?</p>
                          </span>  
                        }  
                        <button className="btn btn-primary rounded" type="submit">Add new address</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <div className="ml-4">
                <form>
                  {addresses.map((address) => (
                    <div key={address.id} className="py-2 form-control">
                      <p className="flex items-start">
                        <input className="radio-xs mr-3 mt-4" type="radio" name="selectAddress" 
                          checked={selectedAddress === address.id} 
                          onChange={(e) => {
                            setSelectedAddress(address.id)
                            setShippingAddress(address.id);
                          }} ></input>
                        <span>
                          {address.addressLine1}<br />
                          {address.addressLine2 && address.addressLine2.trim() !== "" && (
                            <span>{address.addressLine2}<br /></span>
                          )}
                          {address.city}, {address.state} {address.postalCode}
                        </span> 
                      </p>
                    </div>
                  ))} 
                </form>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="font-bold text-lg absolute top-2 right-4">x</button>
                <button className="btn btn-accent rounded">Use this address</button>
              </form>
            </div>
          </div> 
        </dialog>
      </div>
    </>
  )
}