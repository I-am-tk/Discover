import Icon from "components/Icon/Icon";
import Loading from "components/Loading";
import Modal from "components/Modal";
import ProgressBar from "components/ProgressBar";
import { useUser } from "features/authentications/contexts/user.context";
import { PostType, PostWithCommentsType } from "features/types";
import useCreatePost from "lib/useCreatePost";
import useFileRemove from "lib/useFileRemove";
import useFileUpload from "lib/useFileUpload";
import useUpdatePost from "lib/useUpdatePost";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UpdatePostForm from "./updatePostForm";
import UserMeta from "./UserMeta";

function UpdatePost({ post }: { post: PostWithCommentsType | PostType }) {
  const { profile } = useUser();
  const userId = profile.userId;
  const router = useRouter();
  const fileCreateMutation = useFileUpload();
  const fileDeleteMutation = useFileRemove();
  const updatePostMutation = useUpdatePost();

  const isLoading = fileCreateMutation.isLoading || updatePostMutation.isLoading;
  const isError = fileCreateMutation.isError || updatePostMutation.isError;
  const isSuccess =
    (fileCreateMutation.isSuccess || fileCreateMutation.isIdle) && updatePostMutation.isSuccess;

  useEffect(() => {
    let id: NodeJS.Timeout | undefined = undefined;
    if (isSuccess) {
      id = setTimeout(() => {
        router.replace(`/post/${post.id}`);
      }, 750);
    }
    return () => clearTimeout(id);
  }, [isSuccess, router, post.id]);

  const updatePostHandler = async (caption: string, file: File | null) => {
    try {
      let downloadURL = post.postImgURL;
      let imagePath = post.portImgPath;
      if (file) {
        await fileDeleteMutation.mutateAsync(post.portImgPath);
        const result = await fileCreateMutation.mutateAsync({ userId, file });
        downloadURL = result.downloadURL;
        imagePath = result.imagePath;
      }
      await updatePostMutation.mutateAsync({
        id: post.id,
        caption,
        postImgURL: downloadURL,
        portImgPath: imagePath,
      });
    } catch (err) {
      console.log(err);
      console.log("Couldn't create the post");
    }
  };

  if (isError)
    return <p className="px-4 bg-indigo-100 mt-2 py-3 flex gap-2">Something went wrong</p>;

  return (
    <div className="xs:pt-4 xs:px-4">
      <div className="max-w-md sm:max-w-none mx-auto">
        {/* header */}
        <UpdatePostForm post={post} updatePostHandler={updatePostHandler} loading={isLoading} />
      </div>
      {(isLoading || isSuccess) && (
        <Modal title="Updating Post" closeModal={() => {}}>
          <div className="mt-4 py-2">
            {fileCreateMutation.isLoading && fileCreateMutation.progressValue < 100 && (
              <div className="grow">
                <>
                  <p className="sr-only">Uploading image: </p>
                  <ProgressBar value={fileCreateMutation.progressValue} />
                </>
              </div>
            )}
            {isLoading && fileCreateMutation.progressValue === 100 && (
              <div className="py-2 flex justify-center">
                <Loading className="w-10" />
              </div>
            )}
            {isSuccess && (
              <div className="flex justify-center py-2">
                <Icon iconCode="check_circle" className="text-[48px] text-green-500" />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UpdatePost;
