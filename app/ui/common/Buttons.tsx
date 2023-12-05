'use client'
import { Button } from "@/ui/common/Button";
import { Spinner } from "@/ui/common/Spinner";
import { useFormStatus } from 'react-dom';
import { Loading } from "@/ui/common/Loading";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const SubmitButton = ({ text = "Submit" }: { text?: string }) => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="flex items-center justify-center h-10 rounded-lg bg-primary text-sm font-medium hover:bg-teal-500 active:bg-teal-600"
            disabled={pending}  >
            {pending ? <Spinner /> : null}
            {text}
        </Button>
    );
};

export const SubmitButtonWithLoading = ({ text = "Submit" }: { text?: string }) => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="flex h-10 rounded-lg bg-primary text-sm font-medium hover:bg-teal-500 active:bg-teal-600 disabled:opacity-50"
            disabled={pending}  >
            {pending ? <span className="loading loading-spinner me-2"></span> : null}
            {text}
        </Button>
    );
}

export const CancelButton = ({ text = "Cancel" }: { text?: string }) => {
    return (
        <Button className="flex items-center justify-center w-24 h-10 rounded-lg bg-gray-400 text-sm font-medium hover:bg-gray-500 active:bg-gray-500">
            {text}
        </Button>
    );
}

export const DeleteButton = ({ text = "Delete" }: { text?: string }) => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="flex items-center justify-center w-24 h-10 rounded-lg bg-red-600 text-sm font-medium hover:bg-red-700 active:bg-red-600"
            disabled={pending}  >
            {pending ? <Spinner /> : null}
            {text}
        </Button>
    );
};

export const SubmitButtonText = ({ text = "Submit" }: { text?: string }) => {
    const { pending } = useFormStatus();
    return (
        <>
            <button type="submit" className="btn text-center btn-link text-sm  hover:text-red-600 active:text-red-600 disabled:bg-transparent disabled:text-gray-400"
                disabled={pending}  >
                {pending ? <span className="loading loading-ring loading-lg"></span> : text}
            </button>
        </>
    );
}
