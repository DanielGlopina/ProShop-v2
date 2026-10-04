import { z } from "zod";
import { productsConfig } from "./products.config";

const nonEmptyText = (label: string, minimum: number) =>
  z
    .string()
    .trim()
    .min(minimum, `${label} must contain at least ${minimum} characters.`);

export const addProductSchema = z.object({
  name: nonEmptyText("Name", 3),
  image: z.string().min(1, "Upload an image."),
  description: nonEmptyText("Description", 10),
  brand: nonEmptyText("Brand", 2),
  category: z
    .string()
    .trim()
    .min(1, "Choose a category.")
    .pipe(
      z.enum(productsConfig.categories, { error: "Choose a valid category." }),
    ),
  price: z.coerce.number().finite().positive("Price must be greater than 0."),
  countInStock: z.coerce.number().int().min(0, "Stock cannot be negative."),
});

export type AddProductFormValues = z.infer<typeof addProductSchema>;
