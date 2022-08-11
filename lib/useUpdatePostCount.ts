import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostCount } from "features/user/services/user.services";
import React from "react";

function useUpdatePostCount() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ profileId, posts }: { profileId: string; posts: number; userId: string }) =>
      updatePostCount(profileId),
    {
      onSuccess(data, variable) {
        queryClient.invalidateQueries(["profile", variable.userId]);
      },
    }
  );
}

export default useUpdatePostCount;
