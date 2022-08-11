import { CommentDocumentType, CommentType, CreateCommentType } from "features/types";
import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase";

export const getCommentsByPostId = async (postId: string) => {
  const commentsRef = collection(db, "comments") as CollectionReference<CommentDocumentType>;
  const commentQuery = query(
    commentsRef,
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(commentQuery);
  const comments: CommentType[] = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return comments;
};

export const createComment = async (comment: CreateCommentType) => {
  const commentsRef = collection(db, "comments") as CollectionReference<CommentDocumentType>;
  await addDoc(commentsRef, comment);
};
