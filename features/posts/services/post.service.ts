import { db, storage } from "lib/firebase";
import {
  getDoc,
  collection,
  CollectionReference,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  doc,
  updateDoc,
  DocumentReference,
  arrayUnion,
  increment,
  arrayRemove,
  FieldValue,
  orderBy,
} from "firebase/firestore";
import { getCommentsByPostId } from "features/comments/services/comment.service";
import {
  CreatePostType,
  PostDocumentType,
  PostType,
  PostWithCommentsType,
  updatePostType,
} from "features/types";
import { ref, deleteObject } from "firebase/storage";
import { updatePostCount } from "features/user/services/user.services";
export const createUserPost = async (post: CreatePostType) => {
  const postsRef = collection(db, "posts") as CollectionReference<PostDocumentType>;
  await addDoc(postsRef, {
    ...post,
  });
};

export const getTimeLinePosts = async (userId: string, following: string[]) => {
  const postsRef = collection(db, "posts") as CollectionReference<PostDocumentType>;
  const postsQery = query(
    postsRef,
    where("userId", "in", [userId, following]),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(postsQery);
  const posts: PostType[] = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const postsWithComments: PostWithCommentsType[] = [];
  for (const post of posts) {
    const comments = await getCommentsByPostId(post.id);
    postsWithComments.push({
      ...post,
      comments,
    });
  }
  return postsWithComments;
};

export const getPostByPostId = async (postId: string) => {
  const postRef = doc(db, "posts", postId) as DocumentReference<PostDocumentType>;
  const snapshot = await getDoc(postRef);
  if (!snapshot.exists()) throw new Error("Post does not exist");

  const post: PostType = {
    ...snapshot.data(),
    id: snapshot.id,
  };

  const comments = await getCommentsByPostId(postId);
  const postWithComments: PostWithCommentsType = {
    ...post,
    comments,
  };
  return postWithComments;
};

// I don't need comment here
export const getAllPostsToExplore = async (userId: string, following: string[]) => {
  const postsRef = collection(db, "posts") as CollectionReference<PostDocumentType>;
  const postsQery = query(
    postsRef,
    where("userId", "not-in", [userId, following]),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(postsQery);
  const posts: PostType[] = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return posts;
};

export const toggleLikePost = async (userId: string, postId: string) => {
  const postRef = doc(db, "posts", postId) as DocumentReference<PostDocumentType>;
  const snapshot = await getDoc(postRef);
  if (!snapshot.exists()) throw new Error("Post does not exist!");

  const oldPost = snapshot.data();
  const hasLiked = oldPost.likes.includes(userId);
  await updateDoc(postRef, {
    likes: !hasLiked ? arrayUnion(userId) : arrayRemove(userId),
    likesCount: !hasLiked ? increment(1) : increment(-1),
  });
  const newSnapshot = await getDoc(postRef);
  if (!newSnapshot.exists()) throw new Error("Post does not exist");
  const post: PostType = {
    ...newSnapshot.data(),
    id: newSnapshot.id,
  };

  const comments = await getCommentsByPostId(postId);
  const postWithComments: PostWithCommentsType = {
    ...post,
    comments,
  };
  return postWithComments;
};

export const toggleSavePost = async (userId: string, postId: string) => {
  const postRef = doc(db, "posts", postId) as DocumentReference<PostDocumentType>;
  const snapshot = await getDoc(postRef);
  if (!snapshot.exists()) throw new Error("Post does not exist!");

  const oldPost = snapshot.data();
  const hasSaved = oldPost.saved.includes(userId);
  await updateDoc(postRef, {
    saved: !hasSaved ? arrayUnion(userId) : arrayRemove(userId),
  });

  const newSnapshot = await getDoc(postRef);
  if (!newSnapshot.exists()) throw new Error("Post does not exist");
  const post: PostType = {
    ...newSnapshot.data(),
    id: newSnapshot.id,
  };

  const comments = await getCommentsByPostId(postId);
  const postWithComments: PostWithCommentsType = {
    ...post,
    comments,
  };
  return postWithComments;
};

// need to take care if image has changed
export const updateUserPost = async (post: updatePostType) => {
  const postRef = doc(db, "posts", post.id) as DocumentReference<PostDocumentType>;
  const oldPostSnapshot = await getDoc(postRef);
  if (!oldPostSnapshot.exists()) throw new Error("Post does not exist");
  await updateDoc(postRef, {
    ...oldPostSnapshot.data(),
    portImgPath: post.portImgPath,
    postImgURL: post.postImgURL,
    caption: post.caption,
  });
};

export const deletePost = async (postId: string, postImagePath: string, profileId: string) => {
  const postImageRef = ref(storage, postImagePath);
  await deleteObject(postImageRef);
  await deleteDoc(doc(db, "posts", postId));

  await updatePostCount(profileId, false);
};
