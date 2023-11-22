import { emailRegex, passwordRegex } from "@/constants/regex";
import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email address",
    })
    .regex(emailRegex, {
      message: "Please enter a valid email address",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
