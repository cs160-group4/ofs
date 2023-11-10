"use client"
import { useState } from "react";
import { updateName } from "../actions";

export function UpdateName({ id }: { id: string }){
  const [errorMsg, setErrorMsg] = useState("")
  
  return (
    <>
      <button onClick={() => (document.getElementById("update-name") as HTMLDialogElement)?.showModal()}
              className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                Update Name</button>

      <dialog id="update-name" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Your Name</h3>
          <form action={async (formData: FormData) => {

            formData.set("userId", id)
            const res = await updateName(formData);
            
            if(!res.success) {
              setErrorMsg(res.message);
            } else {
              setErrorMsg(res.message);
            }
          }}>
            {/* <input type="hidden" name="userId" value={id}></input> */}
            
            <p className="font-bold py-1">New Name</p>
            <input type="text" minLength={3} maxLength={20} pattern="[A-Za-z0-9]+" title="Only letters and numbers are allowed"
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 "
                        id="newName" name="newName" placeholder="Enter your name" required />
            <p className="font-bold py-1">Confirm Name</p>
            <input type="text" minLength={3} maxLength={20} pattern="[A-Za-z0-9]+" title="Only letters and numbers are allowed"
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 "
                        id="confirmName" name="confirmName" placeholder="Confirm your new name" required />

            <p className="font-bold py-1">{errorMsg}</p>
            <button className="btn m-2" type="submit">Update Name</button>
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