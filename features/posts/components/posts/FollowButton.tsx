import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import { toggleFollowUser } from "features/user/services/user.services";
import useToggleFollow from "lib/useToggleFollow";
import React, { useState } from "react";

function FollowButton({ postUserId, className }: { postUserId: string; className?: string }) {
  const { profile } = useUser();
  const mutation = useToggleFollow();
  const isFollowing = profile.following.includes(postUserId);
  return (
    <button
      onClick={() => mutation.mutate({ userId: profile.userId, userToFollowId: postUserId })}
      type="button"
      className={`font-semibold flex gap-2 items-center px-2 py-1 rounded hover:bg-indigo-100 ${
        !isFollowing ? "text-indigo-500" : ""
      } ${className}`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
      {mutation.isLoading && <Loading className="w-5" />}
    </button>
  );
}

export default FollowButton;
