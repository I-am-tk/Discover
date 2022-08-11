import Avatar from "components/Avatar";
import { useUser } from "features/authentications/contexts/user.context";
import React from "react";
import config from "config";
function UserMeta() {
  const { profile } = useUser();
  return (
    <div className="px-2 py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={""}
          className={`w-10 h-10 flex justify-center items-center rounded  ${""}`}
        >
          <Avatar
            className="avatar-sm"
            avatarURL={profile.userProfileImage || config.defaultUserImage}
          />
        </button>
        <p className="text-base font-medium min-w-[40px]">{profile?.username}</p>
      </div>
    </div>
  );
}

export default UserMeta;
