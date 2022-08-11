export interface CommentType {
  id: string;
  userId: string;
  postId: string;
  text: string;
  username: string;
  createdAt: number;
}

export interface PostType {
  id: string;
  userId: string;
  caption: string;
  postImgURL: string;
  portImgPath: string;
  likes: string[];
  likesCount: number;
  saved: string[];
  createdAt: number;
  // created at and updated at
}

export interface UserProfileType {
  id: string;
  userId: string;
  emailAddress: string;
  fullName: string;
  username: string;
  following: string[];
  followers: string[];
  createdAt: number;
  posts: number;
  userProfileImage: string;
  userProfileImagePath: string;
  backgroundImage: string;
  backgroundImagePath: string;
  bio: string;
}

export type RemoveId<Type> = {
  [Property in keyof Type as Exclude<Property, "id">]: Type[Property];
};

export interface CreatePostType extends RemoveId<PostType> {}
export interface updatePostType {
  id: string;
  caption: string;
  postImgURL: string;
  portImgPath: string;
}
export interface UserProfileDocumentType extends RemoveId<UserProfileType> {}
export interface PostDocumentType extends RemoveId<PostType> {}
export interface CreateCommentType extends RemoveId<CommentType> {}
export type CommentDocumentType = CreateCommentType;

export interface PostWithCommentsType extends PostType {
  comments: CommentType[];
}
