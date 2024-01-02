"use server";

import { Product, User } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateProductImages } from "./imageActions";
import DB from "@/database";
import { auth } from "../api/auth/[...nextauth]/route";
import { AuthError } from "next-auth";
import { getProductFromID, insertProduct, updateProduct as updateProductQuery } from "./queries";

export async function createProduct(formData: FormData) {
  const session = await auth();
  const user = session?.user as unknown as User;
  const store_id = user?.store_id as number;
  if (store_id === null || !user) {
    throw new AuthError("You are not a vendor");
  }

  const product: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };
  

  try {
    const productID = (await DB.query(insertProduct(product.title, product.description, product.stock, product.price, store_id))).rows[0].id;
    const images = JSON.parse(formData.get("images") as string);
    updateProductImages(productID, images);

  } catch (error) {
    console.error({ error });
    return;
  }
  revalidatePath("/products");
  revalidatePath("/stores");
  redirect(`/stores/${store_id}/products`);
}

export async function reRackProduct(id: string) {
  //put product back on shelf (displayable)
  await DB.query(`UPDATE product SET onshelf = true WHERE id = ${id}`);
  revalidatePath("/stores");
  revalidatePath("/products");
}

export async function removeProductFromShelf(id: string) {
  //take product off shelf and remove it from all carts
  await DB.query(`UPDATE product SET onshelf = false WHERE id = ${id}`);
  await DB.query(`DELETE FROM cart WHERE product_id = ${id}`);
  revalidatePath("/stores");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  //remove product images
  updateProductImages(+id, []);
  //delete product
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

  const images = JSON.parse(formData.get("images") as string);

  let store_id;
  try {

    updateProductImages(id, images);
    const result = await DB.query(updateProductQuery(id, product.title, product.description, product.stock, product.price));
    store_id = result.rows[0].store_id;
  } catch (error) {
    console.error({ error });
  }
  revalidatePath("/products");
  revalidatePath("/stores");
  redirect(`/stores/${store_id}/products`);
}

export async function getProductById(id: string) {
  const result = await DB.query(getProductFromID(+id));
  return result.rows[0] as Product;
}
