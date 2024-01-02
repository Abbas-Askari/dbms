"use client";

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
