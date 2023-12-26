import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import {z } from 'zod';
import { Customer, User } from "./app/lib/definitions";
import { sql } from "@vercel/postgres";
const bcrypt = require('bcrypt');

async function getUser(email: string) : Promise<Customer | undefined> {
    try {
        const user = await sql<Customer>`SELECT * FROM customer WHERE email = ${email}`;
        return user.rows[0];
    } catch (error) {
        console.error("Failed to fetch user: ", error);
        return undefined;
    }
}

export const {auth, signIn, signOut} =NextAuth({
    ...authConfig,
    providers: [credentials({
        async authorize(credentials, req) {
            const parsedCredentials = z.object({
                email: z.string().email(),
                password: z.string().min(8),
            }).safeParse(credentials);

            if (parsedCredentials.success) {
                const {email, password} = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                const passwordMatches = password ===  user.password;
                // const passwordMatches = await bcrypt.compare(password, user.password);
                if (passwordMatches) return user;
            }
            console.log("Invalid credentials");
            return null;
        },
    })]
})