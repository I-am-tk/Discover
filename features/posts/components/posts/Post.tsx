import React from "react";
import Comments from "features/comments/components/Comments";
import AddComment from "features/comments/components/AddComment";
import { useUser } from "features/authentications/contexts/user.context";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostAction from "./PostAction";
import { PostType, PostWithCommentsType } from "features/types";
import { highlightHastag } from "components/utils/formatHastag";
import { usePost } from "lib/usePost";

function Post(props: { post: PostWithCommentsType }) {
  const { isLoading, isError, data, isSuccess } = usePost(props.post.id);

  const post = isSuccess ? data : props.post;

  return (
    <div className="xs:border bg-white pb-8 rounded">
      {/* header */}
      <PostHeader post={post} />
      {/* image */}
      <PostImage imgUrl={post.postImgURL} />
      {/* like, comment, save */}
      <PostAction post={post} />

      {post.likesCount > 0 && (
        <p className="font-semibold mb-2 px-4">
          {post.likesCount} like{post.likesCount > 1 ? "s" : ""}
        </p>
      )}

      <p className="text-base px-4">
        <span className="font-semibold">{}</span> {highlightHastag(post.caption)}
      </p>

      {/* comment */}
      {<Comments comments={post.comments} />}
      <div className="mt-4">
        <AddComment postId={post.id} />
      </div>
    </div>
  );
}

export default Post;
