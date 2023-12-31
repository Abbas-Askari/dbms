"use server";

import { Customer, Product, Vendor } from "./definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateProductImages } from "./imageActions";
import DB from "@/database";
import { auth } from "../api/auth/[...nextauth]/route";
import { AuthError } from "next-auth";

export async function createProduct(formData: FormData) {
  const session = await auth();
  const user = session?.user;
  if (!user.isVendor || !user) {
    throw new AuthError("You are not a vendor");
  }

  const product: any = {
    title: formData.get("title"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    price: formData.get("price"),
  };
  const vendor_id = user?.id;

  try {
    const query = `
    INSERT INTO product (title, description, stock, price, vendor_id) VALUES (
        '${product.title}',
        '${product.description}',
        ${product.stock},
        ${product.price},
        ${vendor_id}
      )
      RETURNING id;
  `;

    const result = await DB.query(query);
    const images = JSON.parse(formData.get("images") as string);
    updateProductImages(result.rows[0].id, images);
  } catch (error) {
    console.error({ error });
  }

  revalidatePath("/products");
  revalidatePath("/stores");
}

export async function deleteProduct(id: string) {
  await DB.query(`DELETE FROM product WHERE id=${id};`);
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
  revalidatePath("/products");
  revalidatePath("/stores");
  redirect("/store/products");
}

export async function getProductById(id: string) {
  const result = await DB.query(`SELECT * FROM product WHERE id = ${id}`);
  return result.rows[0] as Product;
}
