import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "features/comments/services/comment.service";
import { CreateCommentType } from "features/types";
import React from "react";

function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation((comment: CreateCommentType) => createComment(comment), {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["post", variables.postId]);
    },
  });
}

export default useCreateComment;
