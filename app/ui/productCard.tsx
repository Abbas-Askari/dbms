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
      className=" bg-[#ffffff20] rounded-xl p-4 flex flex-col cursor-pointer"
    >
      <img
        src="/next.svg"
        alt=""
        className="bg-white  self-stretch aspect-square"
      />
      <div className=" text-2xl">{product.title}</div>
      <div
        title={product.description}
        className=" text-sm  whitespace-nowrap overflow-hidden  text-ellipsis"
      >
        {product.description}
      </div>
      <div className="flex justify-between items-center mt-auto">
        <div className=" text-lg">${product.price}</div>
        <div className=" text-sm">
          {product.stock > 0 ? "In stock" : "Out of stock"}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
