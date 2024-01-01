import React from "react";
import { Product } from "../lib/definitions";
import Link from "next/link";
import { deleteProduct } from "../lib/actions";
import DB from "@/database";
import ProductModal from "./productModal";


async function ProductListCard({
  product,
  index,
  isOwner,
  canDelete
}: {
  product: Product;
  index: number;
  isOwner?: boolean;
  canDelete?: boolean;
}) {
  const deleteProductWithId = deleteProduct.bind(null, product.id);

  // const canDelete = await DB.query(`SELECT COUNT`)


  return (
    <>
      <tr className="p-2">
        <td>{index + 1}</td>
        <td className="font-bold">{product.title}</td>
        <td>{product.price}</td>
        <td>{product.stock}</td>
        <td className="flex gap-4 justify-end items-center">
          <Link href={`/products/${product.id}`} className="btn   ">
            View
          </Link>
          {isOwner && (
            <>
              {/* <form action={deleteProductWithId} className=" ">
                <button className="btn btn-block    btn-error">Delete</button>
              </form> */}
              <ProductModal product={product} canDelete={canDelete} />
            </>
          )}
        </td>
      </tr>
    </>
  );
}

export default ProductListCard;
