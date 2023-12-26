// export default Page = () => {
//   return <div>alksjdlkajd</div>;
// };

// import React from "react";



export default function Page() {
  return <div>page</div>;
}

export async function lol() {
  const data: any = await fetch("Abbas");

  return <div className="">{data.name}</div>;
}
