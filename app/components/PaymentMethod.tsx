"use client"
import { useState } from 'react';

/*
  Author: Fariha Ahmed
  Email: fariha.ahmed@sjsu.edu
  Copyright (c) 2023 Fariha Ahmed. All rights reserved.
*/

export function PaymentMethod({ id }: { id: string }) {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    CVC: "",
    expirationDate: ""
  });

  const cardNumber = cardInfo.cardNumber.slice(-4);

  const addPayment = (formData: FormData) => {
    const newCard = {
      cardNumber: String(formData.get('cardNumber')),
      CVC: String(formData.get('cvc')),
      expirationDate: String(formData.get('expirationDate'))
    }

    setCardInfo(newCard);

    const editPaymentMethodDialog = document.getElementById("edit_payment_method") as HTMLDialogElement;
    if (editPaymentMethodDialog) {
      editPaymentMethodDialog.close();
    }
  }

  return (
    <>
      <div>
        {cardInfo.cardNumber ? (
          <p><b>Card</b> ending in {cardNumber}</p>
        ) : (
          <div>
            <button onClick={() => (document.getElementById("edit_payment_method") as HTMLDialogElement)?.showModal()} className="btn-link font-small">Add a credit card</button>
          </div>
        )
        }
        <p><b>Billing Address:</b> Same as shipping address.
          <button className="btn-link font-small">Change.</button></p>
      </div>

      <dialog id="edit_payment_method" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add a credit card</h3>
          <form action={addPayment}>
            <p className="font-bold py-1">Card Number</p>
            <input className="border border-gray-300 rounded-lg input-sm w-full"
              name="cardNumber" type="text"
              placeholder={cardInfo.cardNumber ? cardInfo.cardNumber : "XXXXXXXXXXXXXXXX"}
              pattern="[0-9]{16}" required></input>

            <div className="grid grid-cols-2">
              <div>
                <p className="font-bold py-1">Expiration Date</p>
                <input className="border border-gray-300 rounded-lg input-bordered w-5/6"
                  name="expirationDate" type="text"
                  placeholder={cardInfo.expirationDate ? cardInfo.expirationDate : "MM/YY"}
                  pattern="(0[1-9]|1[0-2])\/2[3-9]" required></input>
              </div>
              <div>
                <p className="font-bold py-1">Security Card (CVV/CVC)</p>
                <input className="border border-gray-300 rounded-lg input-bordered w-5/6"
                  name="cvc" type="text"
                  placeholder={cardInfo.CVC ? cardInfo.CVC : "XXX"}
                  pattern="[0-9]{3}" required></input>
              </div>
            </div>
            <button className="btn rounded absolute bottom-5" type="submit">Add credit card</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      <div>
        <button onClick={() => (document.getElementById("edit_payment_method") as HTMLDialogElement)?.showModal()} className="btn text-center btn-link font-small">Change</button>
      </div>
    </>
  )
}