import { Button } from "@/ui/common/Button";
import { Spinner } from "@/ui/common/Spinner";
import { useFormStatus } from 'react-dom';

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