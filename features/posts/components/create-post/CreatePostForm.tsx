import { useWarnIfUnsavedChanges } from "hooks/useWarnIfUnsavedChanges";
import React, { useRef, useState } from "react";
import ImageInput from "./ImageInput";
import TextArea from "components/TextArea";
import UserMeta from "./UserMeta";

function CreatePostForm({
  createPostHandler,
  loading,
}: {
  loading: boolean;
  createPostHandler: (caption: string, imgFile: File) => void | Promise<void>;
}) {
  const [previewImgURL, setPreviewImgURLImgURL] = useState("");
  const [caption, setCaption] = useState("");
  const [captionError, setCaptionError] = useState<null | string>(null);
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
    if (file === null) {
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
      await createPostHandler(caption, file!);
    } catch (err) {
      setEdited(true);
      console.log(err);
    }
  };
  return (
    <form onSubmit={submitHandler} className="pb-8 sm:pb-0 xs:border sm:grid grid-cols-2">
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

      <div className="mt-6 grow sm:mt-0 col-start-2">
        <div className="hidden sm:block mb-4 sm:border-b px-2">
          <UserMeta />
        </div>
        {/* caption */}
        <div className="px-4">
          <TextArea
            aria-label="add caption"
            placeholder={"Add caption"}
            value={caption}
            onChange={onCaptionChange}
            className="mt-4 sm:mt-0 sm:min-h-[150px]"
          />
          {captionError && <p className="text-red-500 text-sm py-1">{captionError}</p>}
        </div>
        <div className="px-4">
          <button type="submit" className="w-full mt-8 btn btn-primary">
            Create
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreatePostForm;
