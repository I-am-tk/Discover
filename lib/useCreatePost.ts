import { useMutation } from "@tanstack/react-query";
import { createUserPost } from "features/posts/services/post.service";
import { CreatePostType } from "features/types";
import React from "react";

function useCreatePost() {
  return useMutation((post: CreatePostType) => createUserPost(post));
}

export default useCreatePost;
