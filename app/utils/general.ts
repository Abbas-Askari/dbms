import { resolve } from "path";

export function numberToDollars(x: number): string {
  return "$" + x.toFixed(2);
}

export function fileToImage(file: File) {
  // can only be used client-side

  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.addEventListener("error", (e) => {
      reject(e);
    });
  });
}
