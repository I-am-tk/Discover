import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import UserSuggestions from "features/user/components/UserSuggestions";
import { useExplorePosts } from "lib/useExplorePosts";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import PostImage from "./PostImage";

function ExplorePostGrid() {
  const { profile } = useUser();
  const userId = profile.userId;
  const following = profile.following;
  const { ref, inView } = useInView();

  const { isLoading, isError, data, hasNextPage, fetchNextPage } = useExplorePosts([
    userId,
    ...following,
  ]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        {data.pages.map(({ posts }) =>
          posts.map((post) => <PostImage key={post.id} post={post} />)
        )}
      </div>
      <div ref={ref}></div>
      {!hasNextPage && (
        <div className="max-w-screen-sm mx-auto mt-12 bg-white border">
          <UserSuggestions />
        </div>
      )}
    </>
  );
}

export default ExplorePostGrid;
