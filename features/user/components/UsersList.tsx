import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import useGetAllSuggestion from "lib/useGetAllSuggestion";
import React from "react";
import UserListItem from "./UserListItem";

function UsersList() {
  const { profile } = useUser();
  const { isLoading, isError, data } = useGetAllSuggestion(profile.userId, profile.following);
  if (isLoading)
    return (
      <p className="px-4 py-3 bg-indigo-50 rounded my-2 flex items-center gap-2">
        <Loading className="w-5" />
        Loading
      </p>
    );
  if (isError) return <p className="bg-red-200 px-4 py-2 rounded">Something went wrong</p>;

  return (
    <div className="mt-4 max-w-screen-md mx-auto">
      <h1 className=" text-md sm:text-lg text-gray-400 px-4">Suggestion</h1>
      <div className="mt-4 bg-white xs:border p-4 flex flex-col gap-2">
        {data.map((profile) => (
          <UserListItem userProfile={profile} key={profile.userId} />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
