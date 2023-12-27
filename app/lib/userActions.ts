"use server";


import { sql } from "@vercel/postgres";
import { Customer, Product } from "./definitions";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { error } from "console";
import { signIn } from "../api/auth/[...nextauth]/route";
// import { signIn } from "@/auth";

export async function createCustomer(formData: FormData) {
    const customer: Customer = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        phone: formData.get("phone") as string,
        id: randomUUID(),
    };

    try {
        const res = await sql`INSERT INTO customer VALUES
        (${randomUUID()},
            ${customer.email},
            ${customer.password},
            ${customer.first_name},
            ${customer.last_name},
            ${customer.phone}
        )`;
    } catch (error) {
        console.log("Failed to create customer: ", error);
    }

    redirect('/login')
}  

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        console.log("Failed to authenticate: ", error);
        throw error;
    }
}