// utils/validationSchemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format").trim(),
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

export type LoginSchemaType = z.infer<typeof loginSchema>;
