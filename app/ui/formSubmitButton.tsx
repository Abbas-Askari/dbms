"use client";

import React from "react";
import { useFormStatus } from "react-dom";

function FormSubmitButton({
  value,
  className,
  ...props
}: {
  value: any;
  className?: string;
  props?: any;
}) {
  const status = useFormStatus();
  return (
    <button {...props} className={`btn ${className}`} disabled={status.pending}>
      <span>{value}</span>
      {status.pending && (
        <span className="loading loading-spinner loading-xs"></span>
      )}
    </button>
  );
}

export default FormSubmitButton;
