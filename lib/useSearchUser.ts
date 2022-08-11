import { useMutation, useQuery } from "@tanstack/react-query";
import { searchUser } from "features/user/services/user.services";
import React from "react";

function useSearchUser(searchText: string) {
  return useQuery(["searchuser"], () => searchUser(searchText), {
    enabled: false,
  });
}

export default useSearchUser;
