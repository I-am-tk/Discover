import Icon from "components/Icon/Icon";
import { useUser } from "features/authentications/contexts/user.context";
import { toggleLikePost, toggleSavePost } from "features/posts/services/post.service";
import { PostType, PostWithCommentsType } from "features/types";
import React from "react";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

function PostAction({ post }: { post: PostType | PostWithCommentsType }) {
  return (
    <div className="flex p-2">
      <div className="flex grow">
        <LikeButton post={post} />
        <button type="button" className="btn-icon" aria-label="post">
          <Icon iconCode="chat_bubble" />
        </button>
      </div>
      <SaveButton post={post} />
    </div>
  );
}

export default PostAction;
