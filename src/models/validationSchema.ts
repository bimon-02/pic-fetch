// utils/validationSchemas.ts
import { z } from "zod";

// Login schema without confirm_password
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email").trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    }),
});

// Signup schema with confirm_password
export const signupSchema = loginSchema.extend({
  confirm_password: z.string(),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
