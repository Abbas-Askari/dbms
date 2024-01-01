"use client";

// import { signOut } from "@/auth";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={async () => {
        const result = await signOut();
        console.log({ result });
      }}
      className=""
    >
      Logout
    </button>
  );
}
