import NextAuth from "next-auth";
import { authConfig } from "../../../../auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { Customer, User, Vendor } from "../../../lib/definitions";
import { sql } from "@vercel/postgres";
import DB from "@/database";
const bcrypt = require("bcrypt");

async function getUser(email: string): Promise<Customer | undefined> {
  try {
    const user = (
      await DB.query(`SELECT * FROM customer WHERE email = '${email}'`)
    ).rows[0] as Customer;
    return user;
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return undefined;
  }
}

async function getVendor(email: string): Promise<Vendor | undefined> {
  try {
    const vendor = (
      await DB.query(`SELECT * FROM vendor WHERE email = '${email}'`)
    ).rows[0] as Vendor;
    return vendor;
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    return undefined;
  }
}

const handler = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const [customer, vendor] = await Promise.all([
            getUser(email),
            getVendor(email),
          ]);
          console.log({ customer, vendor });
          if (!customer && !vendor) return null;
          if (password === customer?.password) return customer;
          if (password === vendor?.password) return vendor;
          // const passwordMatches = await bcrypt.compare(password, customer.password);

          // const { email, password } = parsedCredentials.data;
          // const user = await getUser(email);
          // console.log({ user });
          // if (!user) return null;
          // const passwordMatches = password === user.password;
          // // const passwordMatches = await bcrypt.compare(password, user.password);
          // if (passwordMatches) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});

const GET = handler.handlers.GET;
const POST = handler.handlers.POST;
const auth = handler.auth;
const { signIn, signOut } = handler;
export { GET, POST, auth, signIn, signOut };
