import React, { ReactElement } from "react";
import LoginForm from "features/authentications/components/LoginForm";

import type { NextPageWithLayout } from "./_app";
import Image from "next/image";
const Login: NextPageWithLayout = () => {
  return (
    <div>
      <div className="min-h-screen  bg-white flex justify-center items-center">
        <div className="px-6 py-8">
          <div className="max-w-sm mx-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4 flex gap-2 items-center">
                <div className="w-10">
                  <Image layout="responsive" width={150} height={150} src={"/logo.png"} alt={""} />
                </div>
                <h1 className="text-4xl text-gray-800">Discover</h1>
              </div>
              <p className="text-base px-2 sm:text-lg text-center leading-6 max-w-xs">
                Log in to see photos and videos from your friends.
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return page;
};

Login.isClient = false;

export default Login;
