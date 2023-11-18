"use client"
import { addNewAddress } from "../actions";

/*
  Author: Fariha Ahmed
  Email: fariha.ahmed@sjsu.edu
  Copyright (c) 2023 Fariha Ahmed. All rights reserved.
*/

export function AddAddressModal({ id }: { id: string }) {

  let stateAbbreviations: string[]
    = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
      "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
      "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
      "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
      "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  return (
    <>
      <button onClick={() => (document.getElementById("add-address") as HTMLDialogElement)?.showModal()}
        className="text-center btn-link font-small">Add another address</button>

      <dialog id="add-address" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a new address</h3>
          <form action={async (formData: FormData) => {
            formData.set("userId", id);
            await addNewAddress(formData);
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
            <button className="btn rounded-lg" type="submit">Add new address</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-lg">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>


    </>
  )
}