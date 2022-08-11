import { useUser } from "features/authentications/contexts/user.context";
import { getTimeLinePosts } from "features/posts/services/post.service";
import { PostType, PostWithCommentsType } from "features/types";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { query, collection, limit, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "lib/firebase";
import { useQuery } from "@tanstack/react-query";
import { useTimelinePosts } from "lib/useTimelinePosts";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import Loading from "components/Loading";
function Posts() {
  const { profile } = useUser();
  const { ref, inView } = useInView();
  // There has to be user
  // There has to be profie in any way or else it will not be opened.
  const userId = profile.userId;
  const userFollowing = profile!.following;
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useTimelinePosts([userId, ...userFollowing], 10);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  // I already have some posts to show then why it is loading
  if (isLoading)
    return (
      <p className="px-4 py-3 bg-indigo-50 rounded mb-2 flex items-center gap-2">
        <Loading className="w-5" />
        Loading
      </p>
    );
  if (isError) {
    return <p className="bg-red-200 px-4 py-2 rounded">Something went wrong</p>;
  }

  const posts = data.pages.map(({ posts }) => posts).flat();
  return (
    <>
      {isFetching && (
        <p className="px-4 py-3 bg-indigo-50 rounded mb-2 flex items-center gap-2">
          <Loading className="w-5" />
          Refreshing
        </p>
      )}
      <div className="flex grow mb-6 flex-col gap-8 aspect-square">
        {posts.length === 0 && (
          <div className="bg-indigo-50 relative py-10 sm:aspect-video p-4 rounded xs:border px-4 sm:py-3 flex justify-center items-center">
            <div className="relative z-30 text-center flex flex-col h-36">
              <p className="mb-1 text-base text-gray-600">Welcome</p>
              <p className="text-2xl sm:text-3xl font-semibold">{profile.fullName} 👋</p>
              <div className="flex flex-col justify-center items-center my-3">
                <p className="text-sm text-gray-500">Dicsover amazing people like you!</p>
              </div>
              <p className="text-sm mt-auto pt-4">
                <Link href="/create-post">
                  <a className="hover:underline text-indigo-500">Create a post</a>
                </Link>{" "}
                and share it with yout friends or{" "}
                <Link href="/create-post">
                  <a className="hover:underline text-indigo-500">explore posts</a>
                </Link>{" "}
              </p>
            </div>
          </div>
        )}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div ref={ref}></div>
      {isFetchingNextPage && (
        <p className="px-4 py-3 bg-indigo-50 rounded mb-24 flex items-center gap-2">
          <Loading className="w-5" />
          Loading more posts
        </p>
      )}
    </>
  );
}

export default Posts;
