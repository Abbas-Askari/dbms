import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";



export async function GET(request: Request) {

  try {
    const session = await auth();
    const result = (await sql`
    SELECT * FROM product JOIN cart ON cart.product_id = product.id WHERE cart.customer_id = ${session?.user?.id} ORDER BY product.id`).rows as any[];
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to create tables: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
