import { useQueries, useQuery } from "@tanstack/react-query";
import { getUserProfileByUserId } from "features/user/services/user.services";
import React from "react";

function useProfile(userId: string) {
  return useQuery(["profile", userId], () => getUserProfileByUserId(userId));
}

export default useProfile;
