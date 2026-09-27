import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authSlice } from "@/features/auth/model/auth.slice";
import { useAppSelector } from "@/app/store";
import { useAppDispatch } from "@/app/store";
import type { ServerError } from "@/shared/api-error";
import {
  registrationThunk,
  loginThunk,
} from "@/features/auth/model/auth.thunks";
import {
  loginSchema,
  registrationSchema,
} from "@/features/auth/model/auth-schemas";

type FormValues = {
  name?: string;
  email: string;
  password: string;
};

const authFields = ["name", "email", "password"] as const;

const isAuthField = (field: string): field is (typeof authFields)[number] => {
  return authFields.includes(field as (typeof authFields)[number]);
};

const isServerError = (error: unknown): error is ServerError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  );
};

const useAuthForm = (mode: "registration" | "login", onSuccess: () => void) => {
  const dispatch = useAppDispatch();
  const isRegistration = mode === "registration";
  const [submitError, setSubmitError] = useState<string>();
  const schema = isRegistration ? registrationSchema : loginSchema;

  const isLoading = useAppSelector(authSlice.selectors.selectLoadingStatus);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const submit = async (values: FormValues) => {
    setSubmitError(undefined);
    clearErrors();

    try {
      if (isRegistration) {
        if (!values.name) {
          setError("name", {
            type: "server",
            message: "Name is required.",
          });
          return;
        }

        await dispatch(
          registrationThunk({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        ).unwrap();
      } else {
        await dispatch(
          loginThunk({
            email: values.email,
            password: values.password,
          }),
        ).unwrap();
      }

      onSuccess();
    } catch (error) {
      const serverError = isServerError(error)
        ? error
        : { message: "Authentication failed. Please try again." };

      if (!isRegistration) {
        setSubmitError("Incorrect email or password.");
        return;
      }

      let hasFieldErrors = false;

      for (const [field, message] of Object.entries(serverError.fields ?? {})) {
        if (isAuthField(field)) {
          setError(field, {
            type: "server",
            message,
          });

          hasFieldErrors = true;
        }
      }

      if (!hasFieldErrors) {
        setSubmitError(serverError.message);
      }
    }
  };

  const title = isRegistration ? "Create an account" : "Welcome back";
  const submitLabel = isRegistration ? "Create account" : "Sign in";

  return {
    title,
    submit,
    handleSubmit,
    register,
    submitLabel,
    submitError,
    isRegistration,
    errors,
    isSubmitting,
    isLoading,
  };
};

export default useAuthForm;
