"use server";

import { User } from "./definitions";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "../api/auth/[...nextauth]/route";
import DB from "@/database";
import { updateStoreImages } from "./imageActions";
// import { signIn } from "@/auth";

export async function makeCustomer(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) {

  const user: User = {
    email: data.email as string,
    password: data.password as string,
    first_name: data.firstName as string,
    last_name: data.lastName as string,
    phone: data.phoneNumber as string,
  };

  try {
    const res =
      await DB.query(`INSERT INTO users (email, password, first_name, last_name, phone) VALUES
        (
            '${user.email}',
            '${user.password}',
            '${user.first_name}',
            '${user.last_name}',
            '${user.phone}'
        )`);

    console.log(res);
  } catch (error) {
    console.log("Failed to create customer: ", error);
  }

  redirect("/login");
}

export async function makeVendor(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  storeName: string;
  storeDesc: string;
  images: string;
}) {

  
  try {
    const storeQuery = `INSERT INTO store (name, description) VALUES ('${data.storeName}', '${data.storeDesc}') RETURNING id`
    const storeID = (await DB.query(storeQuery)).rows[0].id  
    const user: User = {
      email: data.email as string,
      password: data.password as string,
      first_name: data.firstName as string,
      last_name: data.lastName as string,
      phone: data.phoneNumber as string,
      store_id: storeID,
    };

    const userQuery = `INSERT INTO users (email, password, first_name, last_name, phone, store_id) VALUES
    (
        '${user.email}',
        '${user.password}',
        '${user.first_name}',
        '${user.last_name}',
        '${user.phone}',
        ${user.store_id}
    )`;

    const res = await DB.query(userQuery);

    const images = JSON.parse(data.images);
    updateStoreImages(storeID, images);
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
