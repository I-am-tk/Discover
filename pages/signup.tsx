import Link from "next/link";
import React, { ReactElement } from "react";
import SignupForm from "features/authentications/components/SignupForm";

import type { NextPageWithLayout } from "./_app";
import Image from "next/image";
const SignUp: NextPageWithLayout = () => {
  return (
    <div>
      <div className="min-h-screen  bg-gray-100">
        <div className="bg-white px-6 py-8">
          <div className="max-w-sm mx-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4 flex gap-2 items-center">
                <div className="w-10">
                  <Image layout="responsive" width={150} height={150} src={"/logo.png"} alt={""} />
                </div>
                <h1 className="text-3xl sm:text-4xl text-gray-800">Discover</h1>
              </div>
              <p className="text-base px-2 sm:text-lg text-center leading-6 max-w-xs">
                Sign up to see photos and videos from your friends.
              </p>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};

SignUp.getLayout = (page: ReactElement) => {
  return page;
};

SignUp.isClient = false;

export default SignUp;
