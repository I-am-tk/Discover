import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "features/posts/services/post.service";
import React from "react";

function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      userId,
      postId,
      postImagePath,
      profileId,
    }: {
      userId: string;
      postId: string;
      postImagePath: string;
      profileId: string;
    }) => deletePost(postId, postImagePath, profileId),
    {
      onSuccess(data, variables) {
        queryClient.invalidateQueries(["timelinePosts"]);
        queryClient.invalidateQueries(["posts", variables.userId]);
        queryClient.invalidateQueries(["profile", variables.userId]);
      },
    }
  );
}

export default useDeletePost;
