import { z } from "zod";

export const signUpInputSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Enter a valid email")
      .min(1, "Email is required")
      .transform((data) => data.toLowerCase()),
    fullname: z
      .string({
        required_error: "Fullname is required",
      })
      .min(1, "Fullname is required"),
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(1, "Username is required")
      .transform((data) => data.toLowerCase()),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password should be at least 6 char long" }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6, { message: "Confirm Password should be at least 6 char long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpInputSchema = z.infer<typeof signUpInputSchema>;
