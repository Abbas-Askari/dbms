import type { NextApiRequest, NextApiResponse } from "next";

export function POST(req: Request) {
  console.log("HEHEHE");

  return Response.json("asdad");
}
