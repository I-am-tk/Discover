import {
  Query,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getCommentsByPostId } from "features/comments/services/comment.service";
import {
  CommentDocumentType,
  PostDocumentType,
  PostType,
  PostWithCommentsType,
} from "features/types";
import {
  collection,
  CollectionReference,
  DocumentSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const useExplorePosts = (userIds: string[], postsPerPage = 10) => {
  const queryClient = useQueryClient();
  const postsRef = collection(db, "posts") as CollectionReference<PostDocumentType>;
  // I am getting one more than the required
  const initialPostQuery = query(
    postsRef,
    where("userId", "not-in", userIds),
    limit(postsPerPage + 1)
  );

  // ! key, initalQuery, doctype, colType, do some extra work,
  const result = useInfiniteQuery(
    ["explorePosts"],
    async ({ pageParam }: QueryFunctionContext) => {
      const snapshot = (await getDocs(
        pageParam ?? initialPostQuery
      )) as QuerySnapshot<PostDocumentType>;
      const postsWithExtraOne: PostType[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const posts = postsWithExtraOne.slice(0, postsPerPage);

      return {
        posts,
        cursor: postsWithExtraOne.length > postsPerPage ? snapshot.docs[postsPerPage] : undefined,
      };
    },
    {
      getNextPageParam(page) {
        // if it returns undefined means then there is no more pages
        if (page.cursor === undefined) return undefined;

        // build a query from a snapshot
        return query(
          postsRef,
          where("userId", "in", userIds),
          limit(postsPerPage + 1),
          startAt(page.cursor)
        );
      },
      onSuccess(data) {
        const posts = data.pages.map((page) => page.posts).flat();
        posts.forEach((post) => {
          queryClient.setQueryData(["post", post.id, { comments: false }], post);
        });
      },
    }
  );
  return result;
};
