import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "features/posts/services/uploadImage.service";
import React from "react";

function useFileRemove() {
  return useMutation((filePath: string) => deleteFile(filePath));
}

export default useFileRemove;
