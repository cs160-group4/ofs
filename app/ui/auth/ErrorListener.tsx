'use client';
import { useSearchParams } from 'next/navigation'

export default function ErrorListener() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    let error_message = "";
    if (error === "OAuthAccountNotLinked") {
        error_message = "This email is linked to another provider. Please login with that provider.";
    }
    else if (error === "CredentialsSignin") {
        error_message = "Invalid credentials";
    } else if (error === "SIGNIN_OAUTH_ERROR") {
        error_message = "mMke sure the browser is not blocking/restricting cookies";
    }
    else {
        return <></>
    }
    const redirect = () => {
        window.location.href = "/auth/signin";
    }
    return (
        <>
            <dialog id="my_modal" className="modal" {...(error_message ? { open: true } : {})}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Error!</h3>
                    <p className="py-4">{error_message}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-primary text-white" onClick={redirect}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    )
}

