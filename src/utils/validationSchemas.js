import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    })
    .refine((value) => !value.includes(" "), {
      message: "Password cannot contain spaces",
    }),
});
