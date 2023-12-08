import React from "react";
import { Product } from "../lib/definitions";
import Link from "next/link";
import { deleteProduct } from "../lib/actions";

function ProductListCard({ product }: { product: Product }) {
  const deleteProductWithId = deleteProduct.bind(null, product.id);

  return (
    <>
      <img className=" w-8 aspect-square ">{}</img>
      <div className="title">{product.title}</div>
      <div className="title">${product.price}</div>
      <div className="title">{product.stock}</div>
      <div className=" flex justify-center gap-2 ">
        <Link
          href={`products/${product.id}/edit`}
          className="text-white px-4  border-[2px] border-transparent transition-all hover:border-gray-500 rounded-lg bg-gray-900"
        >
          Edit
        </Link>
        <form action={deleteProductWithId}>
          <button className="text-white px-4  border-[2px] border-transparent transition-all hover:border-red-500 rounded-lg   bg-red-900">
            Delete
          </button>
        </form>
      </div>
    </>
  );
}

export default ProductListCard;
