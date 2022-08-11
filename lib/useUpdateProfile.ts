import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserProfileType } from "features/types";
import { updateUserProfile } from "features/user/services/user.services";
import { updateProfile } from "firebase/auth";
import React from "react";

function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation((profile: UserProfileType) => updateUserProfile(profile), {
    onSuccess(data, variable) {
      queryClient.invalidateQueries(["profile", variable.userId]);
    },
  });
}

export default useUpdateProfile;
