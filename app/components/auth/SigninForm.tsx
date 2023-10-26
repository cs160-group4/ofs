"use client";
import { Loading } from "@/components/common/Loading";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import ErrorModal from "./ErrorModal";
export const SigninForm = () => {
    const email = useRef("");
    const pass = useRef("");
    const [showPassword, setShowPassword] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        const result = await signIn("credentials", {
            email: email.current,
            password: pass.current,
            // redirect: true,
            // callbackUrl: "/",
        });
        setLoading(false);
        if (result?.error) {
            setModalMessage("Invalid credentials");
            openModal();
            return;
        }




    };
    const openModal = () => {
        const modal = document.getElementById('error_modal') as HTMLDialogElement;
        modal.showModal();
    };

    // const searchParams = useSearchParams();
    // const error_param = searchParams.get('error');
    // if (error_param) {
    //     setError(true);
    //     setModalMessage(error_param);
    //     openModal();
    // }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle the show/hide state
    };
    return (
        <div>
            {/* {loading && <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                <div className="w-20 h-20 border-t-4 border-b-4 rounded-full animate-spin"></div>
            </div>} */}

            <Loading loading={loading} />
            <ErrorModal message={modalMessage} />
            <div className="mb-4 lg:mb-7">
                <input type="email" onChange={(e) => (email.current = e.target.value)}
                    className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                    name="email" placeholder="Enter your email" autoComplete="current-password" />
            </div>
            <div className="mb-4 lg:mb-7">
                <div className="relative flex items-center">
                    <input type={showPassword ? "text" : "password"} onChange={(e) => (pass.current = e.target.value)}
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                        name="password" placeholder="Enter password" />

                    <label className="swap swap-rotate absolute right-0 mr-3 items-center">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onClick={togglePasswordVisibility} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                            className="swap-off fill-current w-5 h-5 " fill="currentColor"
                            viewBox="0 0 16 16" >
                            <path
                                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z">
                            </path>
                            <path
                                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z">
                            </path>
                            <path
                                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z">
                            </path>
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="swap-off fill-none w-5 h-5 " viewBox="0 0 24 24" fill="none">
                            <path d="M2 2L22 22" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> */}
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                            className="swap-on fill-none w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        {/* 
                        <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg> */}

                    </label>


                </div>
            </div>
            <div className="flex items-center justify-between mb-4 lg:mb-7">
                <label className="flex dark:text-gray-300">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-sm ">Remember me</span>
                </label>
                <a href=" #"
                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-500">
                    forgot password?</a>
            </div>
            <button className="w-full px-4 py-4 text-sm font-bold text-gray-300 uppercase bg-cyan-600 rounded-md lg:text-lg dark:text-gray-300 dark:bg-cyan-800 hover:bg-cyan-700 dark:hover:bg-cyan-900 "
                type="submit" onClick={onSubmit}>LOGIN
            </button>
            {/* <Button onClick={onSubmit}>Login</Button> */}
        </div >
    );
};

