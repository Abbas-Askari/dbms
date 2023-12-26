"use server";

import { sql } from "@vercel/postgres";
import { Product } from "./definitions";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  //   const product: Product = {
  const product: any = {
    id: randomUUID(),
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };

  try {
    const result = await sql`
      INSERT INTO product VALUES(${product.id},
        ${product.title},
        ${product.description},
        ${product.stock},
        ${product.price});
    `;
  } catch (error) {
    console.error({ error });
  }
  
  revalidatePath("/products");
  revalidatePath("/store");
}

export async function deleteProduct(id: string) {
  await sql`DELETE FROM product WHERE id=${id};`;
  revalidatePath("/store");
  revalidatePath("/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const product: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };

  try {
    const result = await sql`
      UPDATE product SET
        title = ${product.title},
        description = ${product.description},
        stock = ${product.stock},
        price = ${product.price}
      WHERE id = ${id};
    `;
    console.log({
      result,
      product,
    });
  } catch (error) {
    console.error({ error });
  }

  revalidatePath("/products");
  revalidatePath("/store");
  redirect("/store");
}

export async function getProductById(id: string) {
  const result = await sql`SELECT * FROM product WHERE id = ${id}`;
  return result.rows[0] as Product;
}
