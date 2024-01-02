"use client";

import React from "react";
import { useFormStatus } from "react-dom";

function FormSubmitButton({
  value,
  className,
  disabled,
  type
}: {
  value: any;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined
}) {
  const status = useFormStatus();
  return (
    <button
      type={type}
      className={`btn ${className}`}
      disabled={status.pending || disabled}
    >
      <span>{value}</span>
      {status.pending && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </button>
  );
}

export default FormSubmitButton;
