import React from "react";

function FormError({ error, className = "" }: { error: string | null; className?: string }) {
  if (!error) return null;
  return (
    <p className={`mb-4  rounded-sm border border-red-200 bg-red-50 p-4 text-red-500 ${className}`}>
      {error}
    </p>
  );
}

export default FormError;
