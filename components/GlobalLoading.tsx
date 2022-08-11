import Image from "next/image";
import React from "react";
function GlobalLoading() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-indigo-50">
      <div className="relative">
        <div className="flex gap-4 items-center justify-center">
          <div className="relative w-10 h-10 sm:h-12 sm:w-12 ">
            <Image
              layout="responsive"
              width={150}
              height={150}
              alt=""
              objectFit="contain"
              src={"/logo.png"}
            />
          </div>
          <p className="text-2xl sm:text-4xl font-semibold text-gray-700">Discover</p>
        </div>
      </div>
    </div>
  );
}

export default GlobalLoading;
