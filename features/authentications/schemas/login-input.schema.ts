import { z } from "zod";
export const loginInputSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Enter a valid email")
    .min(1, "Email is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, { message: "Password is required" }),
});

export type LoginInputSchema = z.infer<typeof loginInputSchema>;
