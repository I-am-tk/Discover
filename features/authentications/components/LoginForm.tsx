import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { FirebaseError } from "firebase/app";
import Input from "components/Form/Input";
import { loginInputSchema, LoginInputSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import FormError from "components/Form/FormError";

import { useAuthService } from "../contexts/auth-service.context";
import { getUserProfileByUserId } from "features/user/services/user.services";
import { useRouter } from "next/router";
import Loading from "components/Loading";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [logInLoading, setLogInLoading] = useState(false);
  const [guestLoginLoading, setGuestLoginLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputSchema>({
    resolver: zodResolver(loginInputSchema),
  });

  const router = useRouter();

  const authServices = useAuthService();
  const handleLogin: SubmitHandler<LoginInputSchema> = async ({ email, password }) => {
    setIsLoading(true);
    setLogInLoading(true);
    setError(null);
    try {
      await authServices.login(email, password);
      router.push("/");
      return null;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) setError(e.message);
      else if (e instanceof Error) setError(e.message);
      else console.error(e);
    } finally {
      setIsLoading(false);
      setLogInLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    setGuestLoginLoading(true);
    try {
      await authServices.guestLogin();
      router.push("/");
      return null;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) setError(e.message);
      else if (e instanceof Error) setError(e.message);
      else console.error(e);
    } finally {
      setIsLoading(false);
      setGuestLoginLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="max-w-sm">
      {error && <FormError error={error} />}
      <fieldset disabled={isLoading} className="">
        <legend className="sr-only">Login Form</legend>
        <Input<LoginInputSchema>
          aria-label="Enter your email"
          type="text"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email}
          autoFocus
        />
        <Input<LoginInputSchema>
          aria-label="Enter your password"
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        <button
          className="w-full mt-3 btn btn-primary flex gap-2 justify-center"
          disabled={isLoading}
          type="submit"
        >
          Log In
          {logInLoading && <Loading className="w-5" />}
        </button>
      </fieldset>
      <hr className="bg-gray-200 h-[1px] my-6" />
      <Link href={"signup"}>
        <a
          className={`text-center block text-indigo-700 hover:underline ${
            isLoading ? "pointer-events-none" : ""
          }`}
        >
          Don&apos;t have an account? sign up
        </a>
      </Link>
      <fieldset disabled={isLoading} className="mt-4">
        <legend className="sr-only">Other ways to log in</legend>
        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full btn btn-secondary flex gap-2 justify-center"
        >
          Log in as Guest
          {guestLoginLoading && <Loading className="w-5" />}
        </button>
      </fieldset>
    </form>
  );
}
