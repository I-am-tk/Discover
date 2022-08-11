import { PostType } from "features/types";
import Image from "next/image";
import React, { useState } from "react";

function PostImage({ imgUrl }: { imgUrl: string }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const imageLoadHandler = () => {
    setIsLoadingImage(false);
  };
  return (
    <div
      className={`aspect-[4/5] relative z-0 overflow-hidden w-full grow bg-gray-300 ${
        isLoadingImage ? "animate-pulse" : ""
      }`}
    >
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition={"center"}
        alt=""
        src={imgUrl}
        // Should also include the sizes
        sizes="450px"
        priority
        onLoad={imageLoadHandler}
      />
    </div>
  );
}

export default PostImage;
