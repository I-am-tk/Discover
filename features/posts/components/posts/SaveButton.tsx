import Icon from "components/Icon/Icon";
import Loading from "components/Loading";
import { useUser } from "features/authentications/contexts/user.context";
import { PostType, PostWithCommentsType } from "features/types";
import useToggleBookmark from "lib/useToggleBookmark";
import React, { useState } from "react";

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
      {!mutation.isLoading && (
        <Icon iconCode="bookmark" className={`${hasSaved ? `filled ` : ``}`} />
      )}
    </button>
  );
}

export default SaveButton;
