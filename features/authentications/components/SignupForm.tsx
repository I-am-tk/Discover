import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { FirebaseError } from "firebase/app";
import Input from "components/Form/Input";
import { SignUpInputSchema, signUpInputSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "components/Form/FormError";
import { useAuthService } from "../contexts/auth-service.context";
import { createUserProfileDocument, doesUsernameExist } from "features/user/services/user.services";
import { updateUserDisplayName } from "../services";
import { useRouter } from "next/router";
import Loading from "components/Loading";

export default function SignupForm() {
  // can use the the queryMutation
  const [isLoading, setIsLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [guestLoginLoading, setGuestLoginLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInputSchema>({
    resolver: zodResolver(signUpInputSchema),
  });
  const router = useRouter();
  const authServices = useAuthService();
  const handleLogin: SubmitHandler<SignUpInputSchema> = async ({
    email,
    password,
    username,
    fullname,
  }) => {
    setIsLoading(true);
    setFormError(null);
    setSignUpLoading(true);
    try {
      const usernameExists = await doesUsernameExist(username);
      if (usernameExists) {
        setFormError("username is taken");
        return;
      }
      const userAuth = await authServices.signup(email, password);

      await updateUserDisplayName(userAuth, username);
      await createUserProfileDocument({
        emailAddress: userAuth.email!,
        fullName: fullname,
        userId: userAuth.uid,
        username: username,
      });

      router.push("/login");
      return;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        if (e.code === "auth/email-already-in-use") {
          setFormError("Email is already registered. Try to log in");
        } else setFormError(e.message);
      } else if (e instanceof Error) setFormError(e.message);
      else console.error(e);
    } finally {
      setIsLoading(false);
      setSignUpLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setFormError(null);
    setGuestLoginLoading(true);
    try {
      await authServices.guestLogin();
      router.push("/");
      return null;
    } catch (e: unknown) {
      if (e instanceof FirebaseError) setFormError(e.message);
      else if (e instanceof Error) setFormError(e.message);
      else console.error(e);
    } finally {
      setIsLoading(false);
      setGuestLoginLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      {formError && <FormError error={formError} />}
      <fieldset disabled={isLoading} className="">
        <legend className="sr-only">Signup Form</legend>
        <Input<SignUpInputSchema>
          aria-label="Enter your email"
          type="text"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email}
          autoFocus
        />
        <Input<SignUpInputSchema>
          aria-label="Enter your username"
          type="text"
          name="username"
          placeholder="Username"
          register={register}
          error={errors.username}
        />
        <Input<SignUpInputSchema>
          aria-label="Enter your fullname"
          type="text"
          name="fullname"
          placeholder="Fullname"
          register={register}
          error={errors.fullname}
        />
        <Input<SignUpInputSchema>
          aria-label="Enter your password"
          type="password"
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password}
        />
        <Input<SignUpInputSchema>
          aria-label="Confirm your password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          register={register}
          error={errors.confirmPassword}
        />
        <button
          className="w-full mt-4 btn justify-center btn-primary flex gap-2"
          disabled={isLoading}
          type="submit"
        >
          Sign up
          {signUpLoading && <Loading className="w-5" />}
        </button>
      </fieldset>
      <hr className="bg-gray-200 h-[1px] my-6" />
      <Link href={"/login"}>
        <a
          className={`text-center block text-indigo-700 hover:underline ${
            isLoading ? "pointer-events-none" : ""
          }`}
        >
          Have an account? log in
        </a>
      </Link>
      <fieldset disabled={isLoading} className="mt-4">
        <legend className="sr-only">Other ways to log in</legend>
        <button
          className="w-full justify-center btn btn-secondary flex gap-2"
          disabled={isLoading}
          type="submit"
          onClick={handleGuestLogin}
        >
          Log in as guest
          {guestLoginLoading && <Loading className="w-5" />}
        </button>
      </fieldset>
    </form>
  );
}

// Why I am not able to give it a fixed width
