import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSavePost } from "features/posts/services/post.service";
import { PostWithCommentsType, UserProfileType } from "features/types";
import { toggleFollowUser } from "features/user/services/user.services";
function useToggleFollow() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ userId, userToFollowId }: { userId: string; userToFollowId: string }) =>
      toggleFollowUser(userId, userToFollowId),
    {
      onSuccess(profile, variables) {
        if (queryClient.getQueryData(["suggestions"])) {
          const oldData = queryClient.getQueryData(["suggestions"]) as UserProfileType[];

          const newData = oldData.map((data) => {
            if (data.userId === variables.userToFollowId) {
              if (
                profile.following.includes(variables.userToFollowId) &&
                !data.followers.includes(variables.userId)
              ) {
                data.followers = [...data.followers, variables.userId];
              }
              if (
                !profile.following.includes(variables.userToFollowId) &&
                data.followers.includes(variables.userId)
              ) {
                data.followers = data.followers.filter((p) => p !== variables.userId);
              }
            }
            return data;
          });
          // console.log(newData);
          // queryClient.setQueryData(["suggestions"], newData);
          queryClient.setQueryData(["profile", variables.userId], profile);
        }
      },
      onSettled(data, err, variables) {
        queryClient.invalidateQueries(["profile", variables.userId]);
        queryClient.invalidateQueries(["suggestions"]);
      },
      onError(error, variables, rollback) {
        console.log(error);
      },
    }
  );
}

export default useToggleFollow;
