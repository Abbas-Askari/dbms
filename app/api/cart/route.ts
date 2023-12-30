import DB from "@/database";
import { auth } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const result = (
      await DB.query(`
      SELECT Pr.*, Cr.quantity, I.data FROM cart Cr JOIN product Pr ON Cr.product_id = Pr.id 
        JOIN (SELECT distinct on (product_id) * FROM productimage) PI ON PI.product_id = Pr.id
        JOIN image I ON I.id = PI.image_id WHERE Cr.customer_id = '${session?.user?.id}' ORDER BY Pr.id`)
    ).rows as any[];
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to create tables: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
