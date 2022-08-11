import Icon from "components/Icon/Icon";
import { useUser } from "features/authentications/contexts/user.context";
import FollowButton from "features/posts/components/posts/FollowButton";
import { UserProfileType } from "features/types";
import useProfile from "lib/useProfile";
import React, { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";

function UserInfo({ profile }: { profile: UserProfileType }) {
  const { profile: myProfile } = useUser();

  const me = myProfile.userId === profile.userId;
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  const closeUpdateProfileModal = () => {
    setShowUpdateProfileModal(false);
  };

  const openUpdateProfileModal = () => {
    setShowUpdateProfileModal(true);
  };

  const userInfo = [
    {
      title: "posts",
      number: profile.posts,
    },
    {
      title: "followers",
      number: profile.followers.length,
    },
    {
      title: "following",
      number: profile.following.length,
    },
  ];
  return (
    <React.Fragment>
      <div className="mt-10 flex flex-wrap justify-between ">
        <div className="sm:basis-0 sm:grow px-4">
          <p className="text-lg font-semibold flex items-center gap-4">
            {profile.fullName}
            {!me && <FollowButton postUserId={profile.userId} className={"text-sm"} />}
          </p>
          <p className="text-sm text-gray-800">{profile.username}</p>
          <p className="mt-4 text-gray-600">{profile.bio}</p>
        </div>
        {
          <div className="px-4 shrink-0 sm:order-3 sm:grow sm:basis-0 sm:flex justify-end">
            {me && (
              <button
                type="button"
                onClick={openUpdateProfileModal}
                aria-label="edit"
                className="btn-icon  bg-white  rounded-full"
              >
                <Icon iconCode="edit" />
              </button>
            )}
          </div>
        }
        <div className="mt-10 sm:mt-0 sm:basis-0 sm:grow sm:order-2 sm:border-0 border-t border-b w-full sm:w-auto">
          <div className="flex gap-4 sm:gap-8 py-2 max-w-sm mx-auto">
            {userInfo.map((info, idx) => (
              <div key={idx} className="w-1/3 flex flex-col  items-center">
                <p className="font-semibold">{info.number}</p>
                <p className="text-gray-500 text-sm">{info.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showUpdateProfileModal && <UpdateProfileModal onClose={closeUpdateProfileModal} />}
    </React.Fragment>
  );
}

export default UserInfo;

// sort post by created date and sort comment by created date
// update follow on click
// share button
