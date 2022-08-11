import { deleteObject, ref } from "firebase/storage";
import { storage } from "lib/firebase";

export const deleteFile = async (filePath: string) => {
  const postImageRef = ref(storage, filePath);
  await deleteObject(postImageRef);
};
