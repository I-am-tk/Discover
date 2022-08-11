import { PostType } from "features/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FilledFavourite from "@material-symbols/svg-400/rounded/favorite-fill.svg";
function PostGalleryImage({ post }: { post: PostType }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const imageLoadHandler = () => {
    setIsLoadingImage(false);
  };
  return (
    <Link href={`/post/${post.id}`}>
      <div
        className={`group relative overflow-hidden aspect-square group cursor-pointer bg-gray-300 ${
          isLoadingImage ? "animate-pulse" : ""
        }`}
      >
        <div className="z-20 group-hover:flex hidden absolute  justify-center items-center inset-0 bg-white/50">
          <div className="flex justify-center items-center flex-col text-red-500">
            <FilledFavourite viewBox="0 0 48 48" />
            <p className="text-gray-800 text-lg font-bold">{post.likesCount}</p>
          </div>
        </div>
        <Image
          alt=""
          src={post.postImgURL}
          layout="fill"
          objectFit="cover"
          objectPosition={"center"}
          priority
          onLoad={imageLoadHandler}
        />
      </div>
    </Link>
  );
}

export default PostGalleryImage;
