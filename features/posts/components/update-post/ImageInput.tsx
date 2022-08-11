import Image from "next/image";
import React from "react";
import AddPhoto from "@material-symbols/svg-400/rounded/add_a_photo.svg";
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
          {imgURL && (
            <Image
              layout="fill"
              alt="post image"
              src={imgURL}
              objectFit="cover"
              objectPosition={"center"}
            />
          )}
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
              accept="image/*"
            />
            <span
              className={`flex justify-center items-center  bg-white rounded-full ${
                !imageExist ? "p-6" : "p-3"
              }`}
            >
              <AddPhoto
                viewBox="0 0 48 48"
                className={`block shrink-0 ${!imageExist ? "w-[48px]" : "w-[32px]"}`}
              />
            </span>
          </label>
        </div>
      </div>
      {imgError && <p className="text-red-500 text-sm py-1 px-4">{imgError}</p>}
    </div>
  );
}

export default ImageInput;
