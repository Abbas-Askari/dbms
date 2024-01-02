import DB from "@/database";
import { NextResponse } from "next/server";
import { getCartItems } from "@/app/lib/queries";
import { auth } from "../auth/[...nextauth]/route";
import { User } from "@/app/lib/definitions";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const user = session?.user as unknown as User 
    const result = (await DB.query(getCartItems(user.id))).rows as any[];
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to create tables: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
