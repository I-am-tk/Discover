import Avatar from "components/Avatar";
import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import PostImageGallery from "features/posts/components/post-grid/PostImageGallery";
import SavedPostGrid from "features/posts/components/post-grid/SavedPostGrid";
import UserPostGrid from "features/posts/components/post-grid/UserPostGrid";
import UserInfo from "features/user/components/UserInfo";
import useProfile from "lib/useProfile";
import { useUserPosts } from "lib/useUserPosts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import GridOnIcon from "@material-symbols/svg-400/rounded/grid_on.svg";
import Bookmark from "@material-symbols/svg-400/rounded/bookmark.svg";
import FilledGridOnIcon from "@material-symbols/svg-400/rounded/grid_on-fill.svg";
import FilledBookmark from "@material-symbols/svg-400/rounded/bookmark-fill.svg";
import config from "config";

function User() {
  const router = useRouter();

  const { query } = router;
  // I can make it by their username
  const { saved, userId } = query as { saved: string | undefined; userId: string };

  const { profile: myProfile } = useUser();
  const { isLoading, isError, data: profile } = useProfile(userId);
  if (isLoading)
    return (
      <p className="px-4 bg-indigo-100 mt-2 py-3 flex gap-2">
        Loading
        <Loading className="w-5" />
      </p>
    );
  if (isError)
    return <p className="px-4 bg-indigo-100 mt-2 py-3 flex gap-2">Something went wrong</p>;

  const me = profile.userId === myProfile.userId;
  return (
    <div className="md:py-8 md:px-4">
      <div className="bg-white border border-b-0 rounded overflow-hidden">
        <div className="relative p-4 md:rounded  aspect-[3] sm:aspect-[5]">
          {profile.backgroundImage && (
            <div className="absolute inset-0">
              <Image
                src={profile.backgroundImage}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition={"center"}
                priority={true}
              />
            </div>
          )}
          {!profile.backgroundImage && (
            <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500 to-purple-500"></div>
          )}
          <div className="w-16 shrink-0 rounded-full absolute -bottom-7 border-2 border-white">
            <Avatar avatarURL={profile.userProfileImage || config.defaultUserImage} />
          </div>
        </div>
        <UserInfo profile={profile} />
        <div className="flex gap-6 justify-center border-b sm:mt-8 py-2">
          <Link href={`/user/${profile.userId}`}>
            <a
              className={`flex items-center gap-2 px-4 py-2 rounded  ${
                !saved ? "bg-gray-200" : ""
              }`}
            >
              {!saved && <GridOnIcon viewBox="0 0 48 48" className={`w-6 `} />}
              {saved && <FilledGridOnIcon viewBox="0 0 48 48" className={`w-6`} />}
              <p>posts</p>
            </a>
          </Link>
          {me && (
            <Link href={`/user/${profile.userId}?saved=true`}>
              <a
                className={`flex items-center gap-2 px-4 py-2 rounded  ${
                  saved ? "bg-gray-200" : ""
                }`}
              >
                {!saved && <Bookmark viewBox="0 0 48 48" className="w-6" />}
                {saved && <FilledBookmark viewBox="0 0 48 48" className="w-6" />}
                <p>saved</p>
              </a>
            </Link>
          )}
        </div>
      </div>
      {/* posts */}
      {!saved && <UserPostGrid userId={userId} />}
      {saved && <SavedPostGrid userId={userId} />}
    </div>
  );
}

export default User;
