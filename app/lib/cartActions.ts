"use server";

import DB from "@/database";
import { auth } from "../api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";
import { getSession } from "next-auth/react";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCart(
  product_id: number,
  customer_id: string,
  formData: FormData
) {
  try {
    const res = await DB.query(`
        INSERT INTO cart VALUES(
            ${product_id},
            ${customer_id},
            ${1}
        )`);
  } catch (error) {
    console.log("Failed to add to cart: ", error);
  }
  revalidatePath(`/products/${product_id}`);
  revalidatePath(`/`);
  revalidateTag("cart");
}

export async function removeFromCart(
  product_id: number,
  customer_id?: number,
  formData?: FormData
) {
  const session = await auth();
  customer_id = customer_id ?? (session?.user?.id as unknown as number);
  try {
    const res = await DB.query(`
            DELETE FROM cart WHERE product_id=${product_id} AND customer_id=${customer_id};
        `);
  } catch (error) {
    console.log("Failed to add to cart: ", error);
  }
  revalidatePath(`/products/${product_id}`);
  revalidateTag("cart");
}

export async function updateProductQuantity(
  product_id: number,
  quantity: number
) {
  unstable_noStore();
  const session = await auth();
  const customer_id = session?.user?.id;
  console.log({ product_id, quantity }, "updating quantity");

  if (quantity === 0) {
    await removeFromCart(product_id);
    return;
  }

  try {
    const res = await DB.query(`
            UPDATE cart SET quantity = ${quantity} WHERE product_id=${product_id} AND customer_id=${customer_id};
        `);
    console.log({ res, row: res.rows }, "updating quantity");
  } catch (error) {
    console.log("Failed to update qunatity: ", error);
    return;
  }

  console.log("revalidating");
  revalidateTag("cart");
  revalidatePath(`/`, "layout");
  revalidatePath(`/`, "page");
}

export async function getCartProducts() {
  unstable_noStore();
  try {
    const session = await auth();
    // const session = await getSession();
    const result = await DB.query(
      `SELECT * FROM product Pr JOIN cart ON cart.product_id = Pr.id
        LEFT JOIN productImage PI ON PI.product_id = Pr.id
        LEFT JOIN image I ON I.id = PI.image_id
        WHERE cart.customer_id = 1 ORDER BY Pr.id`
    );
    console.log("getting cart products!");
    return result.rows as any[];
  } catch (error) {
    console.log("Failed to get cart products: ", error);
  }
}

export async function clearCart() {
  try {
    const session = await auth();
    const result = await DB.query(
      `DELETE FROM cart WHERE customer_id = ${session?.user?.id}`
    );
    console.log("Success!");
    revalidatePath(`/`);
  } catch (error) {
    console.error("Failed to clear cart: ", error);
  }
}

export async function placeOrder(formData: FormData) {
  try {
    // const session = await getSession();
    const session = await auth();
    console.log({ session });
    const cart = await getCartProducts();
    const addressResult =
      await DB.query(`INSERT INTO address (address, city, province, zip_code) VALUES 
            ('${formData.get("address")}', '${formData.get("city")}',
            '${formData.get("province")}', ${formData.get(
        "zip_code"
      )}) RETURNING id;
        `);
    const addressId = addressResult.rows[0].id as number;
    console.log({ rows: addressResult.rows });
    const orderResult =
      await DB.query(`INSERT INTO orders (date, customer_id, address_id) VALUES
            ('${new Date().toISOString()}', ${
        session?.user?.id
      }, ${addressId}) RETURNING id;
        `);
    const orderId = orderResult.rows[0].id as number;
    const defectiveQuery =
      `INSERT INTO orderproducts VALUES ` +
      cart
        ?.map((product) => `(${orderId}, ${product.id} ,${product.quantity})`)
        .join(", ");
    const orderProductsResult = await DB.query(defectiveQuery);

    console.log("Success!");
    clearCart();
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to place order", error);
    return;
  }

  redirect("/products");
  console.log(formData);
}

export async function completeOrder(orderId: number, productId: number) {
  try {
    const result = await DB.query(`
            UPDATE orderProducts SET completed = true WHERE order_id = ${orderId} AND product_id = ${productId};;    
        `);

    console.log("Success!", { result });
    revalidatePath(`/orders`);
  } catch (error) {
    console.error("Failed to complete order", error);
  }
}
