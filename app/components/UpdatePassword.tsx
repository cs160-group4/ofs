"use client"
import { useState } from "react";
import { updatePassword } from "../actions";

export function UpdatePassword({ id }: { id: string }){
    const [errorMsg, setErrorMsg] = useState("")

  return (
    <>
      <button onClick={() => (document.getElementById("update-password") as HTMLDialogElement)?.showModal()}
              className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                Update Password</button>
      
      <dialog id="update-password" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Password</h3>
          <form action={async (formData: FormData) => {

            formData.set("userId", id)
            const res = await updatePassword(formData);
            
            if(!res.success) {
              console.log(res.message);
              setErrorMsg(res.message);
            } else {
              setErrorMsg(res.message);
              console.log(res.success);
              console.log(res.message);
            }
          }}>
            {/* <input type="hidden" name="userId" value={id}></input> */}
            
            <p className="font-bold py-1">New Password</p>
            <input className="border border-gray-300 rounded-lg input-sm w-full" name="newPassword" type="password" placeholder="New Password" minLength={8} required></input>
            <p className="font-bold py-1">Confirm Password</p>
            <input className="border border-gray-300 rounded-lg input-sm w-full" name="confirmPassword" type="password" placeholder="Confirm Password"  minLength={8} required></input>
            <p className="font-bold py-1">{errorMsg}</p>
            <button className="btn m-2" type="submit">Update Password</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>

      
    </>
  )
}