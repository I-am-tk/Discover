import { useUser } from "features/authentications/contexts/user.context";
import { toggleLikePost, toggleSavePost } from "features/posts/services/post.service";
import { PostType, PostWithCommentsType } from "features/types";
import React from "react";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import ChatBubbleIcon from "@material-symbols/svg-400/rounded/chat_bubble.svg";
function PostAction({
  post,
  onClickComment = () => {},
}: {
  post: PostType | PostWithCommentsType;
  onClickComment?: () => void;
}) {
  return (
    <div className="flex p-2">
      <div className="flex grow">
        <LikeButton post={post} />
        <button type="button" className="btn-icon" aria-label="post" onClick={onClickComment}>
          <ChatBubbleIcon viewBox="0 0 48 48" />
        </button>
      </div>
      <SaveButton post={post} />
    </div>
  );
}

export default PostAction;
