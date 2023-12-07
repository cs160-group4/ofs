
'use client'
import { SubmitButton, SubmitButtonWithLoading } from "@/ui/common/Buttons";
import { useFormState } from "react-dom";
import { processOrdersAction } from '@/actions/delivery';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function ActivateOrderProcessing() {
  const initialState = { message: '', errors: {} };
  const [state, formAction] = useFormState(processOrdersAction, initialState);

  return (
    <form action={formAction}>
      <SubmitButtonWithLoading text="Activate Order Processing" />
    </form>
  );
}
