import Avatar from "components/Avatar";
import { useUser } from "features/authentications/contexts/user.context";
import React from "react";
import FollowButton from "./FollowButton";
import MoreActionOnPost from "./MoreActionOnPost";
import config from "config";
import type { PostType, PostWithCommentsType } from "features/types";
import Link from "next/link";
import useToggleFollow from "lib/useToggleFollow";
import useProfile from "lib/useProfile";
import { useRouter } from "next/router";

function PostHeader({ post }: { post: PostType | PostWithCommentsType }) {
  const { profile } = useUser();
  const isMyPost = post.userId == profile.userId;
  const router = useRouter();
  const { isLoading, isError, data } = useProfile(post.userId);

  const isPostDetailedPage = router.pathname === "/post/[postId]";
  return (
    <div className="px-4 py-2 flex">
      {
        <React.Fragment>
          <div className="grow flex gap-2 items-center flex-start">
            <Link href={`/user/${post.userId}`} passHref>
              <a className="flex  items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar
                    avatarURL={
                      !isLoading && !isError ? data.userProfileImage || config.defaultUserImage : ""
                    }
                    className="avatar-sm sm:avatar-md"
                  />
                </div>
                {/* Username, will be at max of 12char */}
                <p className="text-base font-medium min-w-[40px]">{data ? data.username : ""}</p>
                {/* Follow or Unfollow */}
              </a>
            </Link>
            {!isMyPost && (
              <>
                <p className="ml-2">&#183;</p>
                <div className="flex items-center">
                  <FollowButton className="text-sm py-2" postUserId={post.userId} />
                </div>
              </>
            )}
          </div>
          {(isMyPost || !isPostDetailedPage) && <MoreActionOnPost post={post} />}
        </React.Fragment>
      }
    </div>
  );
}

export default PostHeader;
