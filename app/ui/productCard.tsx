import React from "react";
import { Product } from "../lib/definitions";
import Link from "next/link";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    <Link
      href={`products/${product.id}`}
      className=" bg-neutral-800 rounded-xl p-6 flex flex-col gap-4 cursor-pointer"
    >
      <img
        src="/next.svg"
        alt=""
        className="bg-neutral-500 p-2 rounded-xl self-stretch aspect-square"
          />
      <div className="flex flex-col gap-2">
        <div className=" text-3xl font-bold">{product.title}</div>
        <div
          title={product.description}
          className=" text-sm whitespace-nowrap overflow-hidden text-ellipsis text-neutral-300"
          >
          {product.description}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-2xl">${product.price}</div>
        <div className=" text-lg">
          {product.stock > 0 ? "In stock" : "Out of stock"}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
