import React from "react";
import { UseFormRegister, Path, FieldError } from "react-hook-form";
import InputError from "./InputError";

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type InputProps<T> = NativeInputProps & {
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: FieldError;
};

function Input<T>({ name, type = "text", register, className, error, ...rest }: InputProps<T>) {
  return (
    <div className="space-y-1 mb-2">
      <input
        type={type}
        {...register(name)}
        className={`input ${error?.message ? "input-error" : ""} ${className}`}
        {...rest}
      />
      <InputError error={error} />
    </div>
  );
}

export default Input;
