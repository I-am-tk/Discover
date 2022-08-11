import Image from "next/image";
import React, { useState } from "react";

function Avatar({ avatarURL, className }: { avatarURL: string; className?: string }) {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const imageLoadHandler = () => {
    setIsLoadingImage(false);
  };
  return (
    <div className={`bg-white rounded-full ${className} ${isLoadingImage ? "animate-pulse" : ""}`}>
      <Image
        width={100}
        height={100}
        layout={"responsive"}
        src={avatarURL}
        className="rounded-full"
        alt=""
        objectFit="cover"
        objectPosition={"center"}
        priority={true}
        onLoad={imageLoadHandler}
      />
    </div>
  );
}

export default Avatar;
