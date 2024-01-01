"use server";

import DB from "@/database";
import { auth } from "../api/auth/[...nextauth]/route";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCart(
  product_id: number,
  user_id: string,
  formData: FormData
) {
  try {
    const res = await DB.query(`
        INSERT INTO cart VALUES(
            ${product_id},
            ${user_id},
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
  user_id?: number,
  formData?: FormData
) {
  const session = await auth();
  user_id = user_id ?? (session?.user?.id as unknown as number);
  try {
    const res = await DB.query(`
            DELETE FROM cart WHERE product_id=${product_id} AND user_id=${user_id};
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
  const user_id = session?.user?.id;
  let status = true;
  console.log({ product_id, quantity }, "updating quantity");

  if (quantity === 0) {
    await removeFromCart(product_id);
    return;
  }

  try {
    const limit = await DB.query(
      `SELECT * FROM product WHERE id = ${product_id}`
    );
    let stock = limit.rows[0].stock;
    status = quantity <= stock;
    const res = await DB.query(`
            UPDATE cart SET quantity = ${Math.min(
              quantity,
              stock
            )} WHERE product_id=${product_id} AND user_id=${user_id};
        `);
  } catch (error) {
    console.log("Failed to update qunatity: ", error);
    return false;
  }

  console.log("revalidating");
  revalidateTag("cart");
  revalidatePath(`/`, "layout");
  revalidatePath(`/`, "page");
  return status;
}

export async function getCartProducts() {
  unstable_noStore();
  try {
    const session = await auth();
    // const session = await getSession();
    const result = await DB.query(
      `SELECT Pr.*, data, name, quantity FROM product Pr JOIN cart ON cart.product_id = Pr.id
        LEFT JOIN (SELECT DISTINCT ON (product_id) * FROM productImage ) PI ON PI.product_id = Pr.id
        LEFT JOIN image I ON I.id = PI.image_id
        WHERE cart.user_id = ${session?.user?.id} 
        ORDER BY Pr.id`
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
      `DELETE FROM cart WHERE user_id = ${session?.user?.id}`
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
      await DB.query(`INSERT INTO orders (date, user_id, address_id) VALUES
            ('${new Date().toISOString()}', ${
        session?.user?.id
      }, ${addressId}) RETURNING id;
        `);
    const orderId = orderResult.rows[0].id as number;
    const defectiveQuery =
      `INSERT INTO orderproduct VALUES ` +
      cart
        ?.map((product) => `(${orderId}, ${product.id} ,${product.quantity})`)
        .join(", ");

    console.log(defectiveQuery);
    const orderproductResult = await DB.query(defectiveQuery);

    console.log("Success!");
    clearCart();
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to place order", error);
    return;
  }

  redirect("/products");
}

export async function completeOrder(orderId: number, productId: number) {
  try {
    console.log("COMPLETING ORDER");
    const result = await DB.query(`
            UPDATE orderproduct SET completed = true WHERE order_id = ${orderId} AND product_id = ${productId}
            RETURNING quantity;    
        `);

    const decreaseStock = await DB.query(`
      UPDATE product SET stock = stock - ${result.rows[0].quantity} WHERE id = ${productId}
    `);
    revalidatePath(`/orders`);
  } catch (error) {
    console.error("Failed to complete order", error);
  }
}
