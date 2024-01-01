import NextAuth from "next-auth";
import { authConfig } from "../../../../auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "../../../lib/definitions";
import DB from "@/database";

//check if a user with email exists
async function getUser(email: string): Promise<User | undefined> {
  try { 
    const user = (
      await DB.query(`SELECT * FROM users WHERE email = '${email}'`)
    ).rows[0] as User;
    return user;
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
        //check if valid email and password format
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        //get and return corresponding user if password matches
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          if (password === user.password) return user;
        }
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
