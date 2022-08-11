import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import { useUserPosts } from "lib/useUserPosts";
import Link from "next/link";
import React from "react";
import PostImageGallery from "./PostImageGallery";

function UserPostGrid({ userId }: { userId?: string }) {
  const { profile } = useUser();
  const rqUserId = userId ?? profile.userId;
  const { isLoading, isError, isFetching, isFetchingNextPage, data } = useUserPosts(rqUserId);

  if (isLoading)
    return (
      <p className="px-4 bg-indigo-100 items-center min-h-[100px] flex gap-2 justify-center">
        Loading
        <Loading className="w-5" />
      </p>
    );
  if (isError)
    return (
      <p className="px-4 bg-red-100 items-center min-h-[100px] flex gap-2 justify-center">
        Something went wrong
      </p>
    );

  const posts = data.pages.map((page) => page.posts).flat();
  if (posts.length === 0)
    return (
      <div className="mt-8 px-4 py-8 bg-indigo-100">
        <div className="text-lg  border flex gap-4 flex-col items-center justify-center">
          <p>No posts</p>
          <Link href={"/create-post"}>
            <a className="text-base text-indigo-500 hover:underline">Create a post</a>
          </Link>
        </div>
      </div>
    );
  return <PostImageGallery posts={posts} />;
}

export default UserPostGrid;
