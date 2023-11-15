'use client'
import { Button } from "@/ui/common/Button";
import { Spinner } from "@/ui/common/Spinner";
import { useFormStatus } from 'react-dom';


export const CancelButton = ({ text = "Cancel" }: { text?: string }) => {
    return (
        <Button className="flex items-center justify-center w-24 h-10 rounded-lg bg-gray-400 text-sm font-medium hover:bg-gray-500 active:bg-gray-500">
            {text}
        </Button>
    );
}

export const SubmitButton = ({ text = "Submit" }: { text?: string }) => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="flex items-center justify-center w-24 h-10 rounded-lg bg-primary text-sm font-medium hover:bg-teal-500 active:bg-teal-600"
            disabled={pending}  >
            {pending ? <Spinner /> : null}
            {text}
        </Button>
    );
};