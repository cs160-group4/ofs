import { useFormStatus } from "react-dom";
import { Spinner } from "./Spinner";

/*
  Authors: Aaron Low <aaron.c.low@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export const LoadingAction = () => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? <Spinner /> : null}
        </>
    );
}
