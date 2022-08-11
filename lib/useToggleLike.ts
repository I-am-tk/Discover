import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost } from "features/posts/services/post.service";
import { PostWithCommentsType } from "features/types";
import React from "react";

function useToggleLike() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, postId }: { userId: string; postId: string }) => toggleLikePost(userId, postId),
    {
      onSuccess(updatedPost, variables) {
        queryClient.setQueryData(["post", variables.postId, { comments: true }], updatedPost);
      },
      onError(error, variables) {
        console.log(error);
        queryClient.invalidateQueries(["post", variables.postId, { comments: true }]);
      },
    }
  );
}

export default useToggleLike;
