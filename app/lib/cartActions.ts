'use server';

import { auth } from "../api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";
import { getSession } from "next-auth/react";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";

export async function addToCart(product_id: string, customer_id: string, formData: FormData) {
    try {
        const res = await sql`
        INSERT INTO cart VALUES(
            ${product_id},
            ${customer_id},
            ${1}
        )`;
    } catch (error) {
        console.log("Failed to add to cart: ", error);
    }
    revalidatePath(`/products/${product_id}`);
    revalidateTag("cart");

}

export async function removeFromCart(product_id: string, customer_id: string, formData: FormData) {
    try {
        const res = await sql`
            DELETE FROM cart WHERE product_id=${product_id} AND customer_id=${customer_id};
        `;
    } catch (error) {
        console.log("Failed to add to cart: ", error);
    }
    revalidatePath(`/products/${product_id}`);
    revalidateTag("cart");
}

export async function updateProductQuantity(product_id: string, customer_id: string, quantity: number) {
    console.log({product_id, customer_id, quantity}, "updating quantity")
    unstable_noStore();
    
    try {
        const res = await sql`
            UPDATE cart SET quantity = ${quantity} WHERE product_id=${product_id} AND customer_id=${customer_id};
        `;
        console.log({res, row: res.rows}, "updating quantity")
        return {res, error: false};
    } catch (error) {
        console.log("Failed to update qunatity: ", error);
        return {error, res: null};
    }

    console.log("revalidating")
    revalidateTag("cart");
    revalidatePath(`/`, 'layout');
    revalidatePath(`/`, 'page');
}

export async function getCartProducts() {
    unstable_noStore();
    try {
        // const session = await auth();
        const session = await getSession();
        const result = await sql`SELECT * FROM product JOIN cart ON cart.product_id = product.id WHERE cart.customer_id = ${session?.user?.id} ORDER BY product.id`;
        console.log("getting cart products!");
        return result.rows as any[];
    }   catch (error) { 
        console.log("Failed to get cart products: ", error);
    }   
}

export async function placeOrder(formData: FormData) {
    try {
        const session = await getSession();
        // const session = await auth();
        const cart = await getCartProducts();   
        const addressResult = await sql`INSERT INTO address (address, city, province, zip_code) VALUES 
            (${formData.get('address')}, ${formData.get('city')}, ${formData.get('province')}, ${formData.get('zip_code')}) RETURNING id;
        `;
        const addressId = addressResult.rows[0].id as number;
        console.log({rows: addressResult.rows})
        const orderResult = await sql`INSERT INTO order_ (date, customer_id, address_id) VALUES
            (${new Date()}, ${session?.user?.id}, ${addressId}) RETURNING id;
        `;
        const orderId = orderResult.rows[0].id as number;
        const defectiveQuery = 
        `INSERT INTO orderproducts VALUES `
            + cart?.map(product => (`(${orderId}, ${product.id} ,${product.quantity})`)).join(", ");
        const orderProductsResult = await sql.query(defectiveQuery);

        console.log("Success!");
    } catch (error) {
        console.error("Failed to place order", error);
    }
    

    console.log(formData)
}