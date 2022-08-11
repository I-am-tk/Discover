import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostByPostId } from "features/posts/services/post.service";

export const usePost = (postId: string) => {
  const queryClient = useQueryClient();
  return useQuery(["post", postId, { comments: true }], () => getPostByPostId(postId), {
    onSuccess(post) {
      queryClient.setQueryData(["post", postId, { comments: true }], post);
    },
    placeholderData() {
      return (
        queryClient.getQueryData(["post", postId, { comments: true }]) ??
        queryClient.getQueryData(["post", postId, { comments: false }])
      );
    },
  });
};
