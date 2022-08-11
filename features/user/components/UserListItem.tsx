import Avatar from "components/Avatar";
import Loading from "components/Loading";
import config from "config";
import { useUser } from "features/authentications/contexts/user.context";
import { UserProfileType } from "features/types";
import useToggleFollow from "lib/useToggleFollow";
import Link from "next/link";

const UserListItem = ({ userProfile }: { userProfile: UserProfileType }) => {
  const { profile } = useUser();
  const followMutation = useToggleFollow();
  const toggleFollowHandler = () => {
    followMutation.mutate({ userId: profile.userId, userToFollowId: userProfile.userId });
  };

  const isFollowing = profile.following.includes(userProfile.userId);
  return (
    <div
      key={userProfile.id}
      className="flex items-center gap-2 border-b border-b-gray-100 last:border-0 pb-2"
    >
      <div className="flex relative grow items-center gap-4  sm:gap-6">
        <Avatar
          avatarURL={userProfile.userProfileImage || config.defaultUserImage}
          className="avatar-md sm:avatar-lg shrink-0"
        />
        {/* username should not be more than 12char */}
        <Link href={`/user/${userProfile.userId}`}>
          <a className="group w-full block">
            <p className="text-sm xs:text-base sm:text-lg min-w-24 overflow-hidden hover:underline group-hover:underline">
              {userProfile.fullName}
            </p>
            <p className="text-xs xs:text-sm sm:text-base text-gray-400">{userProfile.username}</p>
          </a>
        </Link>
      </div>
      {/* this has to change */}
      <button
        type="button"
        className={`flex items-center gap-2  py-1 sm:py-2 px-4 min-w-[100px] justify-center rounded disabled:opacity-60  ${
          isFollowing
            ? "bg-red-100 enabled:hover:bg-red-400 enabled:hover:text-white"
            : "bg-indigo-100 text-indigo-800 enabled:hover:bg-indigo-400 enabled:hover:text-white"
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

export default UserListItem;
