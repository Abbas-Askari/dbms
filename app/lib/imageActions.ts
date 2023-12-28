"use server";

import { sql } from "@vercel/postgres";
import { rejects } from "assert";
import { resolve } from "path";
const FileReader = require("filereader");

export async function uploadImage(name: string, data: string) {
  try {
    const result = await sql`
            INSERT INTO image (name, data) VALUES (${name}, ${data})
        `;
    console.log({ result });
  } catch (error) {}
}
