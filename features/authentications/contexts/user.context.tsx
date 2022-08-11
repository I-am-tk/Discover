import React, { useEffect, ReactNode, useContext, useState } from "react";
import { User } from "firebase/auth";

import useProfile from "lib/useProfile";
import { useRouter } from "next/router";
import { UserProfileType } from "features/types";
import GlobalLoading from "components/GlobalLoading";
import Link from "next/link";

const UserProfileContext = React.createContext<{ profile: UserProfileType }>(null!);

export const UserProfileContextProvider: React.FC<{
  children: ReactNode;
  user: User;
}> = ({ children, user }) => {
  const { isLoading, isError, data: profile, error } = useProfile(user.uid);

  if (isLoading) return <GlobalLoading />;
  if (isError) {
    console.log(error);
    return <p className="bg-red-100 p-4">some thing went wrong</p>;
  }
  if (!profile)
    return (
      <p className="bg-indigo-100 p-4">
        No profile exist
        <Link href={"/signup"}>
          <a>create a new account</a>
        </Link>
      </p>
    );
  return (
    <UserProfileContext.Provider
      value={{
        profile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUser = () => useContext(UserProfileContext);
