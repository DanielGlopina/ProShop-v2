import { z } from "zod";

export type AuthMode = "login" | "registration";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .max(254, "Email must not exceed 254 characters.");

const passwordSchema = z
  .string()
  .min(3, "Password must be at least 3 characters long.")
  .max(32, "Password must not exceed 32 characters.")
  .regex(/[A-Za-z]/, "Password must contain at least one letter.")
  .regex(/\d/, "Password must contain at least one number.");

export const loginSchema = z.object({
  // Existing accounts may have been created under different password rules.
  // Credentials are validated by the server during sign-in.
  email: z.string(),
  password: z.string().min(1, "Password is required."),
});

export const registrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(50, "Name must not exceed 50 characters.")
    .regex(
      /^[A-Za-z][A-Za-z '-]*$/,
      "Name may contain only letters, spaces, apostrophes, and hyphens.",
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
