import DB from "@/database";
import { auth } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth();

    //get cart objects from DB according to userID
    const result = (
      await DB.query(`
      SELECT product.*, cart.quantity, image.data 
      FROM cart JOIN product ON cart.product_id = product.id 
      LEFT JOIN (SELECT distinct ON (product_id) * FROM productimage) ProdImage ON ProdImage.product_id = product.id
      LEFT JOIN image ON image.id = ProdImage.image_id WHERE cart.user_id = '${session?.user?.id}' ORDER BY product.id`)
    ).rows as any[];

    //return all rows
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to create tables: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
