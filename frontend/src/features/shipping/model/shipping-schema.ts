import { z } from "zod";

export const shippingSchema = z.object({
  address: z.string().trim().min(3, "Address is required."),
  city: z.string().trim().min(2, "City is required."),
  postalCode: z.string().trim().min(3, "Postal code is required."),
  country: z.string().trim().min(2, "Country is required."),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;
