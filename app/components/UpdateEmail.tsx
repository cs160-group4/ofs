"use client"
import { useState } from "react";
import { updateEmail } from "../actions";

export function UpdateEmail({ id }: { id: string }){
  const [errorMsg, setErrorMsg] = useState("")
  
  return (
    <>
      <button onClick={() => (document.getElementById("update-email") as HTMLDialogElement)?.showModal()}
              className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                Update Email</button>

      <dialog id="update-email" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Your Email</h3>
          <form action={async (formData: FormData) => {

            formData.set("userId", id)
            const res = await updateEmail(formData);
            
            if(!res.success) {
              setErrorMsg(res.message);
            } else {
              setErrorMsg(res.message);
            }
          }}>
            {/* <input type="hidden" name="userId" value={id}></input> */}
            
            <p className="font-bold py-1">New Email</p>
            <input className="border border-gray-300 rounded-lg input-sm w-full" name="newEmail" type="email" placeholder="New Email" required></input>
            <p className="font-bold py-1">Confirm Email</p>
            <input className="border border-gray-300 rounded-lg input-sm w-full" name="confirmEmail" type="email" placeholder="Confirm Email" required></input>
            <p className="font-bold py-1">{errorMsg}</p>
            <button className="btn m-2" type="submit">Update Email</button>
          </form>
          <div className="modal-action">
            <form method="dialog" className="gap-2 p-2">
                <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      
    </>
  )
}