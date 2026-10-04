import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  addProductSchema,
  type AddProductFormValues,
} from "./add-product-schema";
import { useAddProductMutation } from "./api";

type AddProductFormInput = z.input<typeof addProductSchema>;

const useAddProductForm = () => {
  const [addProduct, { isLoading }] = useAddProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormInput, unknown, AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      brand: "",
      category: "",
      price: 0,
      countInStock: 0,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const submit = async (values: AddProductFormValues) => {
    try {
      await addProduct(values).unwrap();
      toast.success("Product successfully added");
      reset();
    } catch {
      toast.error("Unable to add product. Please try again later.");
    }
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    isSubmitting,
    isLoading,
    submit,
  };
};

export default useAddProductForm;
