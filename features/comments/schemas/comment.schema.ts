import { z } from "zod";

export const commentInputSchema = z.object({
  comment: z
    .string({
      required_error: "Comment is required",
    })
    .min(1, "Comment is required"),
});

export type CommentInputSchema = z.infer<typeof commentInputSchema>;
