import { z } from "zod";

const phonePattern = /^\+?[0-9().\s-]+$/;

export const contactsSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(phonePattern, "Use digits and common phone separators only.")
    .refine((phone) => {
      const digits = phone.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }, "Enter a phone number with 7 to 15 digits."),
});

export type ContactsFormValues = z.infer<typeof contactsSchema>;
