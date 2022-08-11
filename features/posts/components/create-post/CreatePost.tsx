import Loading from "components/Loading";
import Modal from "components/Modal";
import ProgressBar from "components/ProgressBar";
import { useUser } from "features/authentications/contexts/user.context";
import useCreatePost from "lib/useCreatePost";
import useFileUpload from "lib/useFileUpload";
import useUpdatePostCount from "lib/useUpdatePostCount";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CreatePostForm from "./CreatePostForm";
import CheckCircleIcon from "@material-symbols/svg-400/rounded/check_circle.svg";
function CreatePost() {
  const { profile } = useUser();
  const userId = profile.userId;
  const router = useRouter();
  const fileMutaion = useFileUpload();
  const createPostMutation = useCreatePost();

  const postCountMutation = useUpdatePostCount();

  const isLoading =
    fileMutaion.isLoading || createPostMutation.isLoading || postCountMutation.isLoading;
  const isError = fileMutaion.isError || createPostMutation.isError || postCountMutation.isError;
  const isSuccess =
    fileMutaion.isSuccess && createPostMutation.isSuccess && postCountMutation.isSuccess;

  useEffect(() => {
    let id: NodeJS.Timeout | undefined = undefined;
    if (isSuccess) {
      id = setTimeout(() => {
        router.replace("/");
      }, 750);
    }
    return () => clearTimeout(id);
  }, [isSuccess, router]);

  const createPostHandler = async (caption: string, file: File) => {
    try {
      const { downloadURL, imagePath } = await fileMutaion.mutateAsync({ userId, file });

      await createPostMutation.mutateAsync({
        userId: profile!.userId,
        caption,
        likes: [],
        likesCount: 0,
        postImgURL: downloadURL,
        portImgPath: imagePath,
        saved: [],
        createdAt: Date.now(),
      });
      await postCountMutation.mutateAsync({
        posts: profile.posts + 1,
        userId: profile.userId,
        profileId: profile.id,
      });
    } catch (err) {
      console.log(err);
      console.log("Couldn't create the post");
    }
  };

  if (isError)
    return <p className="px-4 bg-indigo-100 mt-2 py-3 flex gap-2">Something went wrong</p>;

  return (
    <div className=" xs:pt-4  sm:pt-8  xs:px-4 ">
      <div className="max-w-md sm:max-w-none mx-auto bg-white">
        {/* header */}
        <CreatePostForm createPostHandler={createPostHandler} loading={isLoading} />
      </div>
      {/*  */}
      {/*isLoading || isSuccess  */}
      {(isLoading || isSuccess) && (
        <Modal title="Creating Post" closeModal={() => {}}>
          <div className="py-2">
            {fileMutaion.isLoading && fileMutaion.progressValue < 100 && (
              <div className="grow">
                <>
                  <p className="sr-only">Uploading image: </p>
                  <ProgressBar value={fileMutaion.progressValue} />
                </>
              </div>
            )}
            {isLoading && fileMutaion.progressValue === 100 && (
              <div className="py-2 flex justify-center pt-4 pb-8">
                <Loading className="w-10" />
              </div>
            )}
            {isSuccess && (
              <div className="flex justify-center pt-4 pb-8">
                <CheckCircleIcon viewBox="0 0 48 48" className="w-[64px] text-green-500" />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CreatePost;

// need to listen for each of the post and show the latest likes and comments
