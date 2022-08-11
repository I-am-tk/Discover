import { db, app } from "lib/firebase";
import {
  collection,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  CollectionReference,
  limit,
  doc,
  DocumentSnapshot,
  setDoc,
  updateDoc,
  DocumentReference,
  writeBatch,
  arrayRemove,
  arrayUnion,
  increment,
  orderBy,
} from "firebase/firestore";
import { UserProfileDocumentType, UserProfileType } from "features/types";

export async function doesUsernameExist(username: string) {
  const userProfilesRef = collection(db, "profiles") as CollectionReference<UserProfileType>;
  // how to does the toLowerCase behave if there is symbols in the string.
  const q = query(userProfilesRef, where("username", "==", username.toLowerCase()));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
}

export async function getUserProfileByUserId(userId: string) {
  const userProfilesRef = collection(db, "profiles") as CollectionReference<UserProfileType>;
  const q = query(userProfilesRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) throw new Error("Profile doesn't exist");
  const profile = {
    ...querySnapshot.docs[0].data(),
    id: querySnapshot.docs[0].id,
  };
  return profile;
}

export async function getUserProfileByUsername(username: string) {
  const userProfilesRef = collection(db, "profiles") as CollectionReference<UserProfileType>;
  const q = query(userProfilesRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  const profile = {
    ...querySnapshot.docs[0].data(),
    id: querySnapshot.docs[0].id,
  };
  return profile;
}

// See wether the email address Tknaik is being stored in as tknaik or not?
export async function createUserProfileDocument({
  userId,
  emailAddress,
  fullName,
  username,
}: {
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
}) {
  const userProfilesRef = collection(
    db,
    "profiles"
  ) as CollectionReference<UserProfileDocumentType>;
  await addDoc(userProfilesRef, {
    userId,
    username,
    fullName,
    emailAddress,
    following: [],
    followers: [],
    createdAt: Date.now(),
    backgroundImage: "",
    backgroundImagePath: "",
    posts: 0,
    userProfileImage: "",
    userProfileImagePath: "",
    bio: "",
  });
}

export const getSuggestedProfiles = async (userId: string, following: string[]) => {
  const userProfilesRef = collection(db, "profiles") as CollectionReference<UserProfileType>;
  const q = query(userProfilesRef, where("userId", "not-in", [...following, userId]), limit(5));
  const querySnapshot = await getDocs(q);

  const profiles: UserProfileType[] = querySnapshot.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));
  console.log({ profiles });
  return profiles;
};

export const toggleFollowUser = async (userId: string, userToFollowId: string) => {
  const userProfilesRef = collection(db, "profiles") as CollectionReference<UserProfileType>;

  const q = query(userProfilesRef, where("userId", "in", [userId, userToFollowId]));

  const sanpshots = await getDocs(q);

  const users = sanpshots.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const user = users.find((doc) => doc.userId === userId);
  const userToFollow = users.find((doc) => doc.userId === userToFollowId);

  if (!user || !userToFollow) {
    if (!user) throw new Error(`User with ${userId} does not exist`);
    throw new Error(`User with ${userToFollowId} does not exist`);
  }

  if (userId === userToFollowId) throw new Error("A user cannot follow it self");
  if (user.following.length > 9) throw new Error("Can't follow more than 9!!");
  const isFollowing = user.following.includes(userToFollowId);

  const batch = writeBatch(db);

  const userRef = doc(db, "profiles", user.id);
  const userToFollowRef = doc(db, "profiles", userToFollow.id);

  batch.update(userRef, {
    following: isFollowing ? arrayRemove(userToFollowId) : arrayUnion(userToFollowId),
  });
  batch.update(userToFollowRef, {
    followers: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
  });

  await batch.commit();
  const userProfile: UserProfileType = await getUserProfileByUserId(userId);
  return userProfile;
};

export const searchUser = async (searchText: string) => {
  const userProfilesRef = collection(db, "profiles") as CollectionReference<UserProfileType>;
  const snapshot = await getDocs(userProfilesRef);
  const users: UserProfileType[] = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return users.filter(
    (user) =>
      user.username.toLowerCase().startsWith(searchText.toLowerCase()) ||
      user.username
        .split(" ")
        .some((word) => word.toLowerCase().startsWith(searchText.toLowerCase()))
  );
};

export const updateUserProfile = async (profile: UserProfileType) => {
  const { id: profileId, ...rest } = profile;
  const userProfileRef = doc(
    db,
    "profiles",
    profileId
  ) as DocumentReference<UserProfileDocumentType>;

  await updateDoc(userProfileRef, {
    ...rest,
  });
};

export const updatePostCount = async (profileId: string, inc = true) => {
  const userProfileRef = doc(
    db,
    "profiles",
    profileId
  ) as DocumentReference<UserProfileDocumentType>;
  await updateDoc(userProfileRef, {
    posts: inc ? increment(1) : increment(-1),
  });
};

export const getAllSuggestedProfiles = async (userId: string, following: string[]) => {
  const userProfilesRef = collection(db, "profiles") as CollectionReference<UserProfileType>;
  const q = query(userProfilesRef, where("userId", "not-in", [...following, userId]));
  const querySnapshot = await getDocs(q);

  const profiles: UserProfileType[] = querySnapshot.docs.map((user) => ({
    ...user.data(),
    id: user.id,
  }));

  return profiles;
};
