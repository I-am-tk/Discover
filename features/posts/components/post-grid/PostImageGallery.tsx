import { PostType } from "features/types";
import React from "react";
import PostImage from "./PostImage";

function PostImageGallery({ posts }: { posts: PostType[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {posts.map((post) => (
        <PostImage key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostImageGallery;
