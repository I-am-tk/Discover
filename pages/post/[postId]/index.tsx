import { useQuery } from "@tanstack/react-query";
import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import UserPostGrid from "features/posts/components/post-grid/UserPostGrid";
import SinglePost from "features/posts/components/posts/SinglePost";
import { getPostByPostId } from "features/posts/services/post.service";
import { usePost } from "lib/usePost";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const { query } = router;
  const { postId } = query as { postId: string };

  // I should fetch post here
  const { isLoading, isError, error, data: post } = usePost(postId);

  if (isLoading)
    return (
      <p className="px-4 bg-indigo-100 mt-2 py-3 flex gap-2">
        Loading
        <Loading className="w-5" />
      </p>
    );
  if (isError)
    return <p className="px-4 bg-indigo-100 mt-2 py-3 flex gap-2">Something went wrong</p>;

  return (
    <div className="pb-16 sm:px-4">
      <div className="max-w-md mx-auto md:max-w-screen-md xs:pt-4">
        <SinglePost post={post} />
      </div>
      <div className="px-4 mt-6">
        <h2 className="text-lg text-gray-400 mb-4 sm:mb-6">More posts by user</h2>
        <UserPostGrid userId={post.userId} />
      </div>
    </div>
  );
}
