import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "@/app/store";
import { cartSlice } from "@/features/cart/model/cart.slice";

import { shippingSchema, type ShippingFormValues } from "./shipping-schema";

const useShippingForm = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const submit = (values: ShippingFormValues) => {
    dispatch(cartSlice.actions.saveShippingAddress(values));
    onSuccess?.();
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submit,
  };
};

export default useShippingForm;
