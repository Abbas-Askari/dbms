"use server";

import { Image } from "./definitions";
import DB from "@/database";

export async function uploadImage(name: string, data: string) {
  try {
    const result = await DB.query(`
            INSERT INTO image (name, data) VALUES (${name}, ${data})
        `);
    console.log({ result });
  } catch (error) {}
}

export async function getImages(productId: number): Promise<Image[]> {
  if (productId === undefined) return [];
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

    if (newImages.length === 0) {
      return;
    }

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

export async function updateStoreImages(storeId: number, newImages: Image[]) {
  try {
    const storeimageDelete = await DB.query(`
    DELETE FROM storeimage WHERE vendor_id = ${storeId};
    `);
    const deleteResult = await DB.query(`
        DELETE FROM image
        WHERE id in (SELECT image_id FROM storeimage WHERE vendor_id = ${storeId});
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
            INSERT INTO storeimage VALUES
            ${ids.map((id) => `(${id}, ${storeId})`).join(",\n")};
        `;

    console.log(q);
    const storeimageInsert = await DB.query(q);

    console.log({ storeimageInsert });
  } catch (error) {
    console.error("Failed to update store images", error);
  }
}
