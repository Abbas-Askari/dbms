"use server";

import DB from "@/database";
import { auth } from "../api/auth/[...nextauth]/route";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { User } from "./definitions";
import { clearUserCart, deleteFromCart, getCartItems, getProductFromID, insertAddress, insertIntoCart, updateProductQuantityInCart } from "./queries";

export async function addToCart(
  product_id: number,
  user_id: number,
  formData: FormData
) {
  try {
    await DB.query(insertIntoCart(+user_id, product_id, 1));
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
    const res = await DB.query(deleteFromCart(user_id, product_id));
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

  if (quantity === 0) {
    await removeFromCart(product_id);
    return;
  }

  try {
    const limit = await DB.query(getProductFromID(product_id));
    let stock = limit.rows[0].stock;
    status = quantity <= stock;
    const res = await DB.query(updateProductQuantityInCart(user_id, product_id, Math.min(quantity, stock)));
  } catch (error) {
    console.log("Failed to update quantity: ", error);
    return false;
  }

  revalidateTag("cart");
  revalidatePath(`/`, "layout");
  revalidatePath(`/`, "page");
  return status;
}

export async function getCartProducts() {
  unstable_noStore();
  try {
    const session = await auth();
    const user = session?.user as unknown as User
    const result = await DB.query(getCartItems(user.id));
    return result.rows as any[];
  } catch (error) {
    console.log("Failed to get cart products: ", error);
  }
}

export async function clearCart() {
  try {
    const session = await auth();
    const user = session?.user as unknown as User
    await DB.query(clearUserCart(user.id));
    revalidatePath(`/`);
  } catch (error) {
    console.error("Failed to clear cart: ", error);
  }
}

export async function placeOrder(formData: FormData) {
  try {
    const session = await auth();
    const cart = await getCartProducts();
    const addressResult =
      await DB.query(insertAddress(
        formData.get("address") as string, 
        formData.get("city") as string, 
        formData.get("province") as string, 
        formData.get("zip_code") as unknown as number)
        );
    const addressId = addressResult.rows[0].id as number;
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
    await DB.query(defectiveQuery);

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
