import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cartSlice } from "@/features/cart/model/cart.slice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { shippingSchema, type ShippingFormValues } from "./shipping-schema";

const useShippingForm = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const shippingAddress = useAppSelector(
    cartSlice.selectors.selectShippingAddress,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { address: "", city: "", country: "", postalCode: "" },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (shippingAddress) {
      reset((values) => ({
        ...values,
        address: shippingAddress.address ?? "",
        city: shippingAddress.city ?? "",
        country: shippingAddress.country ?? "",
        postalCode: shippingAddress.postalCode ?? "",
      }));
    }
  }, [shippingAddress, reset]);

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
