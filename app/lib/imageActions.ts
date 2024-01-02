"use server";

import { Image } from "./definitions";
import DB from "@/database";
import { getProductImages } from "./queries";

export async function getImages(productId: number): Promise<Image[]> {
  if (productId === undefined) return [];
  const result = await DB.query(getProductImages(productId));
  const images = result.rows as Image[];
  return images;
}

export async function updateProductImages(
  productId: number,
  newImages: Image[]
) {
  try {
    await DB.query(`DELETE FROM productimage WHERE product_id = ${productId};`);
    await DB.query(`DELETE FROM image WHERE id in (SELECT image_id FROM productimage WHERE product_id = ${productId});`);

    if (newImages.length === 0) {
      return;
    }

    const insertQuery = `
      INSERT INTO image (name, data) VALUES
      ${newImages
        .map((image) => `('${image.name}', '${image.data}')`)
        .join(",\n")}
        RETURNING id;
      `;

    const addResult = await DB.query(insertQuery);
    const ids = addResult.rows.map((row) => row.id) as number[];

    const insertProductImages = `
            INSERT INTO productimage VALUES
            ${ids.map((id) => `(${id}, ${productId})`).join(",\n")};
        `;
    
    await DB.query(insertProductImages);
  } catch (error) {
    console.error("Failed to update product images", error);
  }
}

export async function updateStoreImage(storeId: number, newImage: Image) {
  
  try {
  const query = `UPDATE store SET image = '${newImage.data}' WHERE id = ${storeId}`
  await DB.query(query);

  } catch (error) {
    console.error("Failed to update store images", error);
  }
}
