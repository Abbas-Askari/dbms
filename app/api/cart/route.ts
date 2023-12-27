import { auth } from "../auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

//     SELECT * FROM product JOIN cart ON cart.product_id = product.id  WHERE cart.customer_id = "93a7949a-5d51-468a-a9b2-5b14ec5a0430" ORDER BY product.id

export async function GET(request: Request) {

  try {
    const session = await auth();
    // const session = await getSession({});
    const result = (await sql`
    SELECT * FROM product JOIN cart ON cart.product_id = product.id WHERE cart.customer_id = ${session?.user?.id} ORDER BY product.id`).rows as any[];
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to create tables: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
