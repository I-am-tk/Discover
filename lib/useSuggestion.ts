import { useQuery } from "@tanstack/react-query";
import { getSuggestedProfiles } from "features/user/services/user.services";
import React from "react";

function useSuggestion(userId: string, following: string[]) {
  return useQuery(["suggestions"], () => getSuggestedProfiles(userId, following));
}

export default useSuggestion;
