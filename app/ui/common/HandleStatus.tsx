'use client'
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFormState } from "react-dom";

export default function HandleStatus() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const { replace } = useRouter();
    // Reset Params Handler
    const resetParams = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("status");
        replace(`${pathname}?${params.toString()}`);
    }, [pathname, replace, searchParams]);

    const [dialog, setDialog] = useState({ status: "", title: "", message: "" });
    // Show Status Handler
    useEffect(() => {
        const status = searchParams.get("status");
        if (status) {
            if (status === "created" || status === "updated" || status === "deleted") {
                setDialog({
                    status: status,
                    title: "Success",
                    message: "Congratulations! A record has been successfully " + status + ".",
                });
            }
        }
        resetParams();
    }, [searchParams, resetParams]);
    return (
        <>
            {dialog?.status && (
                <dialog id="my_modal" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-gray-800">
                            {dialog?.title}
                        </h3>
                        <p className="text-gray-500 mt-4">{dialog?.message}</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-primary text-white w-20">Ok</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}

        </>
    )
}