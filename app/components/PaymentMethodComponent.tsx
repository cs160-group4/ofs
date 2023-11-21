"use client"
import React, { useState } from 'react';
import { PaymentMethod } from '../lib/payment_methods';
import { getAllPaymentMethods, addNewPaymentMethod } from '../actions/payment_methods';
/*
  Author: Fariha Ahmed
  Email: fariha.ahmed@sjsu.edu
  Copyright (c) 2023 Fariha Ahmed. All rights reserved.
*/

export function PaymentMethodComponent({id, paymentMethods, setPaymentMethod, className, txt}: {id: string, paymentMethods: PaymentMethod[], setPaymentMethod: Function, className: string, txt: string}) {
  const [selectedCard, setSelectedCard] = useState(0);
  const [addCardForm, setAddCardForm] = useState(false);

  const isValidDate = (date: string) => {
    const pattern = /^(0[1-9]|1[0-2])\/(2[2-9]|1[0-9])$/;
    const match = date.match(pattern);

    if (match) {
      const [month, year] = date.split('/').map(Number);

      console.log(month);
      console.log(year);

      // Get the current date
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get the last two digits of the current year
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1

      // Compare the extracted date with the current date
      const validation =  year > currentYear || (year === currentYear && month > currentMonth);
      console.log(validation);
      return validation;
    }

    return false;
  }

  const [validDate, setValidDate] = useState(true);

  return (
    <div>
      <button onClick={() => (document.getElementById("paymentMethods") as HTMLDialogElement)?.showModal()} 
        className={className}>{txt}</button>

      <dialog id="paymentMethods" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Payment Methods</h3>
          <div className="grid grid-cols-2">
            <div>
              <button onClick={(event) => {
                setAddCardForm(!addCardForm);
              }} className="text-center btn-link font-small">Add new card</button>
              
              {addCardForm && (
                <div>
                  <form action={async (formData: FormData) => {
                    const expirationDate = String(formData.get("expirationDate"));
                    console.log(expirationDate);
                    
                    
                    if(!isValidDate(expirationDate)) {
                      setValidDate(false);
                    } else {
                      setValidDate(true);
                      formData.set("userId", id);
                      await addNewPaymentMethod(formData);
                      setAddCardForm(false);
                    }
                  }}>
                    <p className="font-bold py-1">Card Number (16 digits)</p>
                    <input className="border border-gray-300 rounded-lg input-sm w-full"
                      name="cardNumber" type="text" placeholder="XXXXXXXXXXXXXXXX" pattern="[0-9]{16}" required></input>

                    <p className="font-bold py-1">Expiration Date (MM/YY)</p>
                    {!validDate &&<p className="text-red-600">Card is expired</p>}
                    <input className="border border-gray-300 rounded-lg input-sm w-full"
                      name="expirationDate" type="text" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/2[3-9]" required></input>

                    <p className="font-bold py-1">CVV/CVC (3/4 digits)</p>
                    <input className="border border-gray-300 rounded-lg input-sm w-full"
                      name="cvv" type="text" placeholder="XXX or XXXX" pattern="\d{3,4}" required></input>

                    <div className="py-2">
                      <button className="btn btn-primary rounded" type="submit"
                        >Add credit card</button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="ml-4">
              {paymentMethods[0] 
                ? (<span>
                  {paymentMethods.map((card) => (
                    <div key={card.id} className="py-2 form-control">
                      <p>
                      <input className="radio-xs mr-3" name="selectAddress" type="radio"
                        checked={selectedCard === card.id} onChange={(e) => {
                          setSelectedCard(card.id);
                          setPaymentMethod(card.id);
                        }}></input>
                      <b>Card</b> ending in <b>{card.cardNumber.slice(-4)}</b>
                      </p>
                      
                    </div>
                  ))}
                </span>)
                : ""
              }
            </div>
          </div>
          <div className="modal-action">
              <form method="dialog">
                <button className="font-bold text-lg absolute top-2 right-4">x</button>
                <button className="btn btn-accent rounded">Use this card</button>
              </form>
            </div>
        </div>
      </dialog>
    </div>
  );
}