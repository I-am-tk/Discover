import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserPost } from "features/posts/services/post.service";
import { PostType, updatePostType } from "features/types";
import React from "react";

function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation((post: updatePostType) => updateUserPost(post), {
    onSettled(data, err, variables) {
      queryClient.invalidateQueries(["post", variables.id, { comments: true }]);
      queryClient.invalidateQueries(["post", variables.id, { comments: false }]);
    },
  });
}

export default useUpdatePost;
