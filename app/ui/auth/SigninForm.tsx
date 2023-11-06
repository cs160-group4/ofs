"use client";
import { Loading } from "@/app/ui/common/Loading";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import ErrorModal from "./ErrorModal";
export const SigninForm = () => {
    const email = useRef("");
    const pass = useRef("");
    const [showPassword, setShowPassword] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const onSubmit = async () => {
        setLoading(true);
        const result = await signIn("credentials", {
            email: email.current,
            password: pass.current,
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div>
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
                        <input type="checkbox" onClick={togglePasswordVisibility}  className="hidden" />
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
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                            className="swap-on fill-none w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </label>
                </div>
            </div>
            <div className="flex items-center justify-between mb-4 lg:mb-7">
                {/* <a href=" #"
                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-500">
                    forgot password?</a> */}
            </div>
            <button className="w-full px-4 py-4 text-sm font-bold text-gray-300 uppercase bg-cyan-600 rounded-md lg:text-lg dark:text-gray-300 dark:bg-cyan-800 hover:bg-cyan-700 dark:hover:bg-cyan-900 "
                type="submit" onClick={onSubmit}>LOGIN
            </button>
        </div >
    );
};

