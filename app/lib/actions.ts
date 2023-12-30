"use server";

import { sql } from "@vercel/postgres";
import { Product } from "./definitions";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateProductImages } from "./imageActions";
import DB from "@/database";

export async function createProduct(formData: FormData) {
  //   const product: Product = {
  const product: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };

  try {
    const query = `
    INSERT INTO product (title, description, stock, price) VALUES (
      '${product.title}',
      '${product.description}',
      ${product.stock},
      ${product.price});
  `;

    console.log(query);

    const result = await DB.query(query);
    console.log({ result });
  } catch (error) {
    console.error({ error });
  }

  revalidatePath("/products");
  revalidatePath("/store");
}

export async function deleteProduct(id: string) {
  await DB.query(`DELETE FROM product WHERE id=${id};`);
  revalidatePath("/store");
  revalidatePath("/products");
}

export async function updateProduct(id: number, formData: FormData) {
  const product: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };

  const images = JSON.parse(formData.get("images") as string);
  updateProductImages(id, images);

  try {
    const result = await DB.query(`
      UPDATE product SET
        title = '${product.title}',
        description = '${product.description}',
        stock = ${product.stock},
        price = ${product.price}
      WHERE id = ${id};
    `);
    console.log({
      result,
      product,
    });
  } catch (error) {
    console.error({ error });
  }
  // TODO: uncomment these lines.
  revalidatePath("/products");
  revalidatePath("/store");
  // revalidatePath("/");
  // redirect("/store");
}

export async function getProductById(id: string) {
  const result = await DB.query(`SELECT * FROM product WHERE id = ${id}`);
  return result.rows[0] as Product;
}
