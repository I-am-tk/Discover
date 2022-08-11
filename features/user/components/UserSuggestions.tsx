import Avatar from "components/Avatar";
import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import { UserProfileType } from "features/types";
import useSuggestion from "lib/useSuggestion";
import useToggleFollow from "lib/useToggleFollow";
import Link from "next/link";
import config from "config";
import React from "react";

const UserSuggestionProfile = ({ userProfile }: { userProfile: UserProfileType }) => {
  const { profile } = useUser();
  const followMutation = useToggleFollow();
  const toggleFollowHandler = () => {
    followMutation.mutate({ userId: profile.userId, userToFollowId: userProfile.userId });
  };

  const isFollowing = profile.following.includes(userProfile.userId);
  return (
    <div
      key={userProfile.id}
      className="flex items-center gap-2 border-b border-b-gray-100 last:border-0  pb-2"
    >
      <div className="flex relative grow items-center gap-3">
        <Avatar
          avatarURL={userProfile.userProfileImage || config.defaultUserImage}
          className="avatar-sm"
        />
        {/* username should not be more than 12char */}
        <Link href={`/user/${userProfile.userId}`}>
          <a className="group">
            <p className="text-md w-24 overflow-hidden hover:underline group-hover:underline line-clamp-1">
              {userProfile.username}
            </p>
            <p className="text-xs text-gray-400">{userProfile.fullName}</p>
          </a>
        </Link>
      </div>
      {/* this has to change */}
      <button
        type="button"
        className={`flex items-center gap-1  py-1 min-w-[100px] justify-center rounded text-sm disabled:opacity-60 ${
          !isFollowing
            ? "text-indigo-500 enabled:hover:bg-indigo-100 enabled:hover:text-indigo-600"
            : "enabled:hover:bg-red-100"
        }`}
        onClick={toggleFollowHandler}
        disabled={followMutation.isLoading}
      >
        {!isFollowing ? "Follow" : "Unfollow"}
        {followMutation.isLoading && <Loading className="w-4" />}
      </button>
    </div>
  );
};

const UserSuggestions = () => {
  const { profile } = useUser();
  const userId = profile.userId;
  const following = profile.following;
  const {
    isLoading,
    isError,
    error,
    data: suggestedUserProfiles,
  } = useSuggestion(userId, following);

  if (isLoading)
    return <p className="w-full bg-gray-200 px-4 pt-2 pb-6 animate-pulse min-h-[250px] "></p>;
  if (isError) {
    console.log(error);
    return <p className="w-full bg-red-50 px-4 pt-2 pb-6 min-h-[250px] ">Something went wrong</p>;
  }

  return (
    <div className="pt-2 pb-6 px-4">
      <div className="flex justify-between items-center">
        <p className="py-2 text-gray-500 text-sm sm:text-base">Suggestions for you</p>
        <Link href={"/people"}>
          <button
            type="button"
            className="cursor-pointer text-sm min-w-[80px] text-gray-500 py-1 rounded enabled:hover:bg-gray-100"
          >
            See All
          </button>
        </Link>
      </div>
      <div className="flex gap-3 flex-col mt-4 rounded">
        {suggestedUserProfiles.map((userProfile) => (
          <UserSuggestionProfile key={userProfile.id} userProfile={userProfile} />
        ))}
      </div>
    </div>
  );
};

export default UserSuggestions;
