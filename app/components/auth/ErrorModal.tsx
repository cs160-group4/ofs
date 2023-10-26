'use client';
import React from "react";

interface ModalProps {
    message: string;
}

const ErrorModal: React.FC<ModalProps> = ({ message }) => {
    return (
        <dialog id="error_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-red-600">Error</h3>
                <p className="py-4">{message}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default ErrorModal;
