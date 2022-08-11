import { useQuery } from "@tanstack/react-query";
import { getAllSuggestedProfiles } from "features/user/services/user.services";
import React from "react";

function useGetAllSuggestion(userId: string, following: string[]) {
  return useQuery(["suggestions", { all: true }], () => getAllSuggestedProfiles(userId, following));
}

export default useGetAllSuggestion;
