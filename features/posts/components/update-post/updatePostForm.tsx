import { useWarnIfUnsavedChanges } from "hooks/useWarnIfUnsavedChanges";
import React, { useRef, useState } from "react";
import ImageInput from "./ImageInput";
import TextArea from "components/TextArea";
import UserMeta from "./UserMeta";
import { PostType, PostWithCommentsType } from "features/types";

function UpdatePostForm({
  updatePostHandler,
  loading,
  post,
}: {
  loading: boolean;
  updatePostHandler: (caption: string, imgFile: File | null) => void | Promise<void>;
  post: PostWithCommentsType | PostType;
}) {
  const [previewImgURL, setPreviewImgURLImgURL] = useState(post.postImgURL);
  const [caption, setCaption] = useState(post.caption);
  const [captionError, setCaptionError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<null | string>(null);
  const [file, setFile] = useState<File | null>(null);

  const [edited, setEdited] = useState(false);

  useWarnIfUnsavedChanges(
    edited || loading,
    "Do you want to leave? All your changes will not be saved!!"
  );
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgError(null);
    setEdited(true);
    if (!e.target.files || e.target.files.length === 0) return;
    setFile(e.target.files[0]);
    const tempURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImgURLImgURL(tempURL);
  };
  const onCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaptionError(null);
    setEdited(true);
    setCaption(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let invalid = false;
    if (file === null && previewImgURL !== post.postImgURL) {
      invalid = true;
      setImgError("Image is required");
    }
    if (caption === "") {
      invalid = true;
      setCaptionError("Caption is required");
    }
    if (invalid) return;
    try {
      setEdited(false);
      await updatePostHandler(caption, file);
    } catch (err) {
      setEdited(true);
      console.log(err);
    }
  };
  return (
    <form onSubmit={submitHandler} className="xs:border sm:grid grid-cols-2 pb-8 sm:pb-0">
      {/* image */}
      <div className="col-start-2 sm:hidden">
        <UserMeta />
      </div>
      <div className="grow col-start-1 row-start-1">
        <ImageInput
          imgError={imgError}
          fileChangeHandler={fileChangeHandler}
          imgURL={previewImgURL}
        />
      </div>

      <div className="px-4 mt-6 grow sm:mt-0 col-start-2">
        <div className="hidden sm:block mb-4 py-2">
          <UserMeta />
        </div>
        {/* caption */}
        <div className="">
          <TextArea
            aria-label="add caption"
            placeholder={"Add caption"}
            value={caption}
            onChange={onCaptionChange}
            className="mt-4 sm:mt-0 sm:min-h-[150px]"
          />
          {captionError && <p className="text-red-500 text-sm py-1">{captionError}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-full mt-8">
          Save
        </button>
      </div>
    </form>
  );
}

export default UpdatePostForm;
