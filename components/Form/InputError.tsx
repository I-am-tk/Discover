import React from "react";

import { FieldError } from "react-hook-form";

type InputErrorType = { error: FieldError | undefined } & { className?: string };

function InputError({ error, className = "" }: InputErrorType) {
  if (!error?.message) return null;
  return <p className={`input-error-message ${className}`}>{error.message}</p>;
}

export default InputError;
