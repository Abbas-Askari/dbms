import React from "react";

function Page() {
  return (
    <div className=" w-[600px] h-[400px] bg-white flex items-center">
      <button className=" border-[2rem] border-l-0 h-8 border-transparent border-r-gray-800"></button>
      <div className="flex-1">
        <img src="/next.svg" alt="" />
        <img src="/vercel.svg" alt="" />
      </div>
      <button className=" border-[2rem] border-r-0 h-8 border-transparent border-l-gray-800"></button>
    </div>
  );
}

export default Page;
