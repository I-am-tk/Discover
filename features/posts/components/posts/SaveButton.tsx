import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import { PostType, PostWithCommentsType } from "features/types";
import useToggleBookmark from "lib/useToggleBookmark";
import React, { useState } from "react";
import FavoriteIcon from "@material-symbols/svg-400/rounded/bookmark.svg";
import FilledFavoriteIcon from "@material-symbols/svg-400/rounded/bookmark-fill.svg";
function SaveButton({ post }: { post: PostType | PostWithCommentsType }) {
  const { profile } = useUser();
  const userId = profile!.userId;

  const mutation = useToggleBookmark();
  const toggleBookmark = () => {
    mutation.mutate({ userId: userId, postId: post.id });
  };

  const hasSaved = post.saved.includes(userId);

  return (
    <button type="button" aria-label="save" className="btn-icon" onClick={toggleBookmark}>
      {mutation.isLoading && <Loading className="w-5 text-gray-500" />}
      {!mutation.isLoading && !hasSaved && <FavoriteIcon viewBox="0 0 48 48" />}
      {!mutation.isLoading && hasSaved && <FilledFavoriteIcon viewBox="0 0 48 48" />}
    </button>
  );
}

export default SaveButton;
