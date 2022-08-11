import { useQueryClient } from "@tanstack/react-query";
import CreatePost from "features/posts/components/create-post/CreatePost";
import UpdatePost from "features/posts/components/update-post/updatePost";
import { PostType, PostWithCommentsType } from "features/types";
import { usePost } from "lib/usePost";
import { useRouter } from "next/router";
import React from "react";

function UpdatePostPage() {
  const router = useRouter();
  const { query } = router;
  const { postId } = query as { postId: string };
  const queryClient = useQueryClient();
  // I should fetch post here
  const post = queryClient.getQueryData(["post", postId, { comments: true }]) as
    | PostWithCommentsType
    | PostType;

  if (!post) {
    router.push(`/post/${postId}`);
    return;
  }

  return (
    <div className="mx-auto">
      <div className="max-w-screen-md mx-auto">
        <UpdatePost post={post} />
      </div>
    </div>
  );
}

export default UpdatePostPage;
