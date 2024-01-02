import { resolve } from "path";

export function numberToDollars(x: number): string {
  return "$" + x.toFixed(2);
}

export async function fileToImage(file: File) {
  // can only be used client-side
  const reader = new FileReader();
  const fileCompressed = (await compressImage(file, {
    quality: Math.min(300000 / file.size, 1),
  })) as Blob;
  reader.readAsDataURL(fileCompressed);
  return new Promise((resolve, reject) => {
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", (e) => {
      reject(e);
    });
  });
}

const compressImage = async (file: File, { quality = 1, type = file.type }) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file);

  // Draw to canvas
  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(imageBitmap, 0, 0);

  // Turn into Blob
  return await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
};
