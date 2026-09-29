import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppSelector } from "@/app/store";
import { authSlice } from "@/features/auth/model/auth.slice";
import { contactsSchema, type ContactsFormValues } from "./contacts-schema";

const useContactsForm = (onSuccess?: () => void) => {
  const isAuth = useAppSelector(authSlice.selectors.selectIsAuth);
  const user = useAppSelector(authSlice.selectors.selectUser);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<ContactsFormValues>({
      resolver: zodResolver(contactsSchema),
      defaultValues: { name: "", email: "", phoneNumber: "" },
      mode: "onBlur",
      reValidateMode: "onChange",
    });

  useEffect(() => {
    if (isAuth) {
      reset((values) => ({ ...values, name: user.name ?? "", email: user.email ?? "" }));
    }
  }, [isAuth, user.name, user.email, reset]);

  const submit = (_values: ContactsFormValues) => onSuccess?.();

  return { register, handleSubmit, errors, isSubmitting, submit };
};

export default useContactsForm;
