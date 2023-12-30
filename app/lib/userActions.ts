"use server";

import { sql } from "@vercel/postgres";
import { Customer, Product, Vendor } from "./definitions";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { error } from "console";
import { signIn } from "../api/auth/[...nextauth]/route";
import DB from "@/database";
import { updateStoreImages } from "./imageActions";
// import { signIn } from "@/auth";

export async function createCustomer(formData: FormData) {
  console.log(formData)
  // const customer: Customer = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  //   first_name: formData.get("first_name") as string,
  //   last_name: formData.get("last_name") as string,
  //   phone: formData.get("phone") as string,
  //   id: 1,
  // };

  // try {
  //   const res =
  //     await DB.query(`INSERT INTO customer (email, password, first_name, last_name, phone) VALUES
  //       (
  //           '${customer.email}',
  //           '${customer.password}',
  //           '${customer.first_name}',
  //           '${customer.last_name}',
  //           '${customer.phone}'
  //       )`);

  //   console.log(res);
  // } catch (error) {
  //   console.log("Failed to create customer: ", error);
  //   return error;
  // }

  // redirect("/login");
}

export async function makeCustomer(data: {email: string, password: string, firstName: string, lastName: string, phoneNumber: string}) {
  const customer: Customer = {
    email: data.email as string,
    password: data.password as string,
    first_name: data.firstName as string,
    last_name: data.lastName as string,
    phone: data.phoneNumber as string,
    id: 1,
  };

  try {
    const res =
      await DB.query(`INSERT INTO customer (email, password, first_name, last_name, phone) VALUES
        (
            '${customer.email}',
            '${customer.password}',
            '${customer.first_name}',
            '${customer.last_name}',
            '${customer.phone}'
        )`);

    console.log(res);
  } catch (error) {
    console.log("Failed to create customer: ", error);
    return error;
  }

  redirect("/login");
}

export async function makeVendor(data: {email: string, password: string, firstName: string, lastName: string, phoneNumber: string, storeName: string, storeDesc: string, images: string}) {
  
  const vendor: Vendor = {
    email: data.email as string,
    password: data.password as string,
    first_name: data.firstName as string,
    last_name: data.lastName as string,
    phone: data.phoneNumber as string,
    store_name: data.storeName as string,
    store_description: data.storeDesc as string
  };

  try {
    const res =
      await DB.query(`INSERT INTO vendor (email, password, first_name, last_name, phone, store_name, store_description) VALUES
        (
            '${vendor.email}',
            '${vendor.password}',
            '${vendor.first_name}',
            '${vendor.last_name}',
            '${vendor.phone}',
            '${vendor.store_name}',
            '${vendor.store_description}'
        )
        RETURNING id;`);

  const images = JSON.parse(data.images as string);
  updateStoreImages(res.rows[0].id, images)

  } catch (error) {
    console.log("Failed to create vendor: ", error);
    return error;
  }

  redirect("/login");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    console.log("Failed to authenticate: ", error);
    throw error;
  }
}
