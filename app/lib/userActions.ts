"use server";

import { User } from "./definitions";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "../api/auth/[...nextauth]/route";
import DB from "@/database";
import { updateStoreImage } from "./imageActions";
import { getUserOrdersByID, insertStore, insertUser } from "./queries";

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
    await DB.query(insertUser(user.email, user.password, user.phone, user.first_name, user.last_name));
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
    const storeID = (await DB.query(insertStore(data.storeName, data.storeDesc))).rows[0].id  
    const user: User = {
      email: data.email as string,
      password: data.password as string,
      first_name: data.firstName as string,
      last_name: data.lastName as string,
      phone: data.phoneNumber as string,
      store_id: storeID,
    };

    await DB.query(insertUser(user.email, user.password, user.phone, user.first_name, user.last_name));

    const images = JSON.parse(data.images);
    if (images.length !== 0)
    updateStoreImage(storeID, images[0]);
    
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

export async function getUserOrders () {
  const session = await auth()
  const user_id = session?.user?.id

  return (await DB.query(getUserOrdersByID(user_id))).rows
}
