import Icon from "components/Icon/Icon";
import React from "react";
import PostImage from "../posts/PostImage";

function ImageInput({
  imgURL,
  fileChangeHandler,
  imgError,
}: {
  imgURL: string;
  fileChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgError: null | string;
}) {
  const imageExist = imgURL !== "";
  return (
    <div className="w-full">
      <div className="aspect-[4/5]  bg-gray-200 relative">
        <div className="relative h-full flex items-center justify-center">
          {imgURL && <PostImage imgUrl={imgURL} />}
          <label
            className={`flex justify-center items-center ${
              imageExist ? "absolute top-2 right-2" : ""
            }`}
          >
            <input
              id="post-img"
              type="file"
              className="hidden bg-red-200"
              aria-label="choose an image"
              onChange={fileChangeHandler}
            />
            <span
              className={`flex justify-center items-center  bg-white rounded-full ${
                !imageExist ? "p-6" : "p-3"
              }`}
            >
              <span
                className={`material-symbols-rounded block shrink-0 ${
                  !imageExist ? "text-[48px]" : "text-[24px]"
                }`}
              >
                add_a_photo
              </span>
            </span>
          </label>
        </div>
      </div>
      {imgError && <p className="text-red-500 text-sm py-1 px-4">{imgError}</p>}
    </div>
  );
}

export default ImageInput;
