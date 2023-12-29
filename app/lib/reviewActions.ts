"use server";

import DB from "@/database";
import { auth } from "../api/auth/[...nextauth]/route";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function addReview(product_id: number, formData: FormData) {
  console.log("getting called");
  try {
    const session = await auth();
    const customer_id = session?.user?.id;
    const res = await DB.query(`
        INSERT INTO review (product_id, customer_id, title, content, rating) VALUES(
            ${product_id},
            ${customer_id},
            '${formData.get("title")}',
            '${formData.get("content")}',
            ${formData.get("rating")}
        )`);
  } catch (error) {
    console.log("Failed to add review: ", error);
  }
  revalidatePath(`/products`);
  // revalidatePath(`/products/${product_id}`);
}

export async function deleteReview(id: number, formData: FormData) {
  console.log("deleteReview getting called");

  try {
    const session = await auth();
    const customer_id = session?.user?.id;
    const res = await DB.query(
      `DELETE FROM review  WHERE id = ${id} AND customer_id = ${customer_id};`
    );
  } catch (error) {
    console.log("Failed to delete review: ", error);
  }
  revalidatePath(`/products`);
  // revalidatePath(`/products/${product_id}`);
}
