import SearchUser from "components/SearchUser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "./Nav";

function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center bg-white h-16 shadow-sm">
      <div className="container px-4 max-w-screen-lg items-center  md:gap-8 justify-center sm:justify-between flex mx-auto">
        <div className="md:grow-[2] md:basis-0">
          <Link href={"/"} passHref>
            <a className="flex items-center gap-2 w-min p-2">
              <div className="w-8">
                <Image
                  layout="responsive"
                  objectFit="cover"
                  objectPosition={"center"}
                  width={150}
                  height={`150`}
                  priority
                  src="/logo.png"
                  alt="discover"
                />
              </div>
              <h1 className="text-2xl">Discover</h1>
            </a>
          </Link>
        </div>
        <div className="hidden md:block  group relative md:grow-[3] md:basis-0  my-4">
          <SearchUser />
        </div>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
