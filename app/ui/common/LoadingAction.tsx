import { useFormStatus } from "react-dom";
import { Spinner } from "./Spinner";


export const LoadingAction = () => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? <Spinner /> : null}
        </>
    );
}
