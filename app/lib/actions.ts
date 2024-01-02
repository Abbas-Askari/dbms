"use server";

import { Product, User } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateProductImages } from "./imageActions";
import DB from "@/database";
import { auth } from "../api/auth/[...nextauth]/route";
import { AuthError } from "next-auth";

export async function createProduct(formData: FormData) {
  const session = await auth();
  const user = session?.user as unknown as User;
  if (user?.store_id === null || !user) {
    throw new AuthError("You are not a vendor");
  }

  const product: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };
  const store_id = user?.store_id;

  try {
    const query = `
    INSERT INTO product (title, description, stock, price, store_id) VALUES (
      '${product.title}',
        '${product.description}',
        ${product.stock},
        ${product.price},
        ${store_id}
      )
      RETURNING id;
      `;

    console.log(query);

    const result = await DB.query(query);
    console.log({ iamges: formData.get("images") });
    const images = JSON.parse(formData.get("images") as string);
    updateProductImages(result.rows[0].id, images);
  } catch (error) {
    console.error({ error });
    return;
  }
  revalidatePath("/products");
  revalidatePath("/stores");
  redirect(`/stores/${store_id}/products`);
}

export async function reRackProduct(id: string) {
  await DB.query(`UPDATE product SET onshelf = true WHERE id = ${id}`);
  revalidatePath("/stores");
  revalidatePath("/products");
}

export async function removeProductFromShelf(id: string) {
  await DB.query(`UPDATE product SET onshelf = false WHERE id = ${id}`);
  await DB.query(`DELETE FROM cart WHERE product_id = ${id}`);
  revalidatePath("/stores");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  updateProductImages(+id, []);
  await DB.query(`DELETE FROM product WHERE id=${id}`);
  revalidatePath("/stores");
  revalidatePath("/products");
}

export async function updateProduct(id: number, formData: FormData) {
  const product: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };

  console.log({ iamges: formData.get("images") });
  const images = JSON.parse(formData.get("images") as string);

  let store_id;
  try {
    console.log("updating product", id, product);

    updateProductImages(id, images);
    const result = await DB.query(`
      UPDATE product SET
        title = '${product.title}',
        description = '${product.description}',
        stock = ${product.stock},
        price = ${product.price}
      WHERE id = ${id}
      RETURNING store_id;
    `);
    store_id = result.rows[0].store_id;
    console.log({ rows: result.rows });
    console.log({
      result,
      product,
    });
  } catch (error) {
    console.error({ error });
  }
  revalidatePath("/products");
  revalidatePath("/stores");
  redirect(`/stores/${store_id}/products`);
}

export async function getProductById(id: string) {
  const result = await DB.query(`SELECT * FROM product WHERE id = ${id}`);
  return result.rows[0] as Product;
}
