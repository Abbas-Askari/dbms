import React from "react";
import { Product } from "../lib/definitions";
import Link from "next/link";
import { deleteProduct } from "../lib/actions";

function ProductListCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const deleteProductWithId = deleteProduct.bind(null, product.id);

  return (
    <>
      <tr className="p-2">
        <td>{index + 1}</td>
        <td className="font-bold">{product.title}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td className="flex gap-4  justify-end">
          <Link href={`/products/${product.id}/edit`} className="btn   ">
            Edit
          </Link>
          <form action={deleteProductWithId} className=" ">
            <button className="btn btn-block    btn-error">Delete</button>
          </form>
        </td>
      </tr>
    </>
  );
}

export default ProductListCard;
