import { useMutation } from "@tanstack/react-query";

import { storage } from "lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

interface UploadFileType {
  userId: string;
  file: File;
  onProgress: (value: number) => void | Promise<void>;
}

export const uploadFile = async ({ userId, file, onProgress }: UploadFileType) => {
  console.log("uploading the file");
  const userImageRef = ref(storage, `images/${userId}`);
  const time = Date.now().toString();
  const imgPath = `post-${time}-${file.name}`;
  const imgRef = ref(userImageRef, imgPath);
  // need to store the full path
  const uploadTask = uploadBytesResumable(imgRef, file);
  uploadTask.on("state_changed", async (snapshot) => {
    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    await onProgress(progress);
  });
  const snapshot = await uploadTask;
  const downloadURL = await getDownloadURL(snapshot.ref);
  return {
    downloadURL,
    imagePath: imgRef.fullPath,
  };
};

function useFileUpload() {
  const [progressValue, setProgressValue] = useState(0);

  const onProgress = (value: number) => {
    setProgressValue(value);
  };
  return {
    ...useMutation(({ userId, file }: { userId: string; file: File }) =>
      uploadFile({ userId, file, onProgress })
    ),
    progressValue,
  };
}

export default useFileUpload;
