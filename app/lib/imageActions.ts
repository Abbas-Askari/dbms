"use server";

import { sql } from "@vercel/postgres";
import { rejects } from "assert";
import { resolve } from "path";
import { Image } from "./definitions";
import DB from "@/database";

const FileReader = require("filereader");

export async function uploadImage(name: string, data: string) {
  try {
    const result = await DB.query(`
            INSERT INTO image (name, data) VALUES (${name}, ${data})
        `);
    console.log({ result });
  } catch (error) {}
}

export async function getImages(productId: number): Promise<Image[]> {
  const result = await DB.query(`
        SELECT image.id, image.name, image.data
        FROM image JOIN productimage ON image.id = productimage.image_id
        WHERE product_id = ${productId}`);

  const images = result.rows as Image[];
  return images;
}

export async function updateProductImages(
  productId: number,
  newImages: Image[]
) {
  try {
    const productimageDelete = await DB.query(`
        DELETE FROM productimage WHERE product_id = ${productId};
    `);
    const deleteResult = await DB.query(`
        DELETE FROM image
        WHERE id in (SELECT image_id FROM productimage WHERE product_id = ${productId});
    `);

    const query = `
      INSERT INTO image (name, data) VALUES
      ${newImages
        .map((image) => `('${image.name}', '${image.data}')`)
        .join(",\n")}
        RETURNING id;
      `;

    console.log(query);

    const addResult = await DB.query(query);
    console.log({ rows: addResult.rows, addResult });
    const ids = addResult.rows.map((row) => row.id) as number[];

    const q = `
            INSERT INTO productimage VALUES
            ${ids.map((id) => `(${id}, ${productId})`).join(",\n")};
        `;

    console.log(q);
    const productimageInsert = await DB.query(q);

    console.log({ addResult });
  } catch (error) {
    console.error("Failed to update product images", error);
  }
}
