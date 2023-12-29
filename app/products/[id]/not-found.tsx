import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className=" text-center">
      <div className="text-lg">Error 404</div>
      <div className="">The product you are looking for dosen't exist.</div>
      <Link
        href="/"
        className="px-4 py-2 bg-slate-500 hover:bg-slate-400 rounded-md mt-8"
      >
        Home
      </Link>
    </div>
  );
}

export default NotFound;
