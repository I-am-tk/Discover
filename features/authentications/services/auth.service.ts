import { auth } from "lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  User,
  updateEmail,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();

export const signup = async (email: string, password: string) => {
  const userCredentail = await createUserWithEmailAndPassword(auth, email, password);
  return userCredentail.user;
};

export const login = async (email: string, password: string) => {
  try {
    const userCredentail = await signInWithEmailAndPassword(auth, email, password);
    return userCredentail.user;
  } catch (err) {
    throw err;
  }
};

export const guestLogin = async () => {
  const email = "guest@gmail.com";
  const password = "123456";
  try {
    const userCredentail = await signInWithEmailAndPassword(auth, email, password);
    return userCredentail.user;
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const resetUserPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const updateUserEmail = async (user: User, newEmail: string) => {
  await updateEmail(user, newEmail);
};

export const updateUserPassword = async (user: User, newPassword: string) => {
  await updatePassword(user, newPassword);
};

export const subscribeAuthChange = (cb: (user: User | null) => unknown) => {
  return onAuthStateChanged(auth, (user) => {
    cb(user);
  });
};

export const googleSignInWithPopup = async () => {
  const userCred = await signInWithPopup(auth, googleAuthProvider);
  return userCred.user;
};

export const updateUserDisplayName = async (user: User, displayName: string) => {
  return updateProfile(user, { displayName });
};
