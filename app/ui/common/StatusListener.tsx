'use client'
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function StatusListener({ name = 'record' }: { name?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const resetParams = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("status");
        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams]);

    const [dialog, setDialog] = useState({ status: "", message: "" });
    useEffect(() => {
        const my_modal_2 = document.getElementById('my_modal_2') as HTMLDialogElement;
        const status = searchParams.get("status");
        const showDialog = (status: string, message: string) => {
            setDialog({ status, message });
            my_modal_2?.showModal();
            setTimeout(() => {
                my_modal_2?.close();
            }, 2500);
        };

        if (status) {
            if (["added", "updated", "deleted"].includes(status)) {
                showDialog(status, `A product has been ${status} successfully!`);
            } else if (status === "error") {
                showDialog(status, "An error occurred, please try again.");
            }
            resetParams();
        }
    }, [searchParams, resetParams]);

    return (
        <>
            <dialog id="my_modal_2" className="modal duration-0 ">
                <div className="modal-box p-0 m-0 duration-0">
                    <div className={`alert ${dialog?.status === "added" ? "alert-success" : dialog?.status === "updated" ? "alert-success" : dialog?.status === "deleted" ? "alert-warning" : "alert-error"
                        }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-white shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className=" text-white">{dialog?.message}</span>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost text-white">✕</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}