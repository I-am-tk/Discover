import { useRouter } from "next/router";
import React from "react";

function RedirectToSignup() {
  const router = useRouter();
  router.push("/signup");
  return null;
}

export default RedirectToSignup;
