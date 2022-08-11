import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSavePost } from "features/posts/services/post.service";
import { PostWithCommentsType } from "features/types";
function useToggleBookmark() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, postId }: { userId: string; postId: string }) => toggleSavePost(userId, postId),
    {
      onSuccess(post, variables) {
        queryClient.setQueryData(["post", variables.postId, { comments: true }], post);
        queryClient.invalidateQueries(["saved", variables.userId]);
      },
      onError(error, variables, rollback) {
        console.log(error);
        queryClient.invalidateQueries(["post", variables.postId, { comments: true }]);
      },
    }
  );
}

export default useToggleBookmark;
