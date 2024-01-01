import React from "react";
import "../style.css";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import DB from "@/database";
import ProductListCard from "@/app/ui/productListCard";
import { auth } from "@/app/api/auth/[...nextauth]/route";

async function StoreProductsPage({ params }: { params: { vendorId: string } }) {
  const session = await auth();
  const isOwner = +params.vendorId === session.user.store_id;

  const result = await DB.query(`
  SELECT * from product WHERE store_id = ${params.vendorId} ${isOwner ? "" : "AND onShelf = true"}; 
  `);

  const canDelete = (await DB.query(`
  SELECT product.id, COUNT(orderproduct.order_id) 
  FROM product LEFT JOIN orderproduct ON product.id = orderproduct.product_id 
  WHERE store_id = ${params.vendorId} 
  GROUP BY product.id`)).rows

  const products: Product[] = result.rows as Product[];

  console.log(products, canDelete)
  
  console.log({ user: session.user, vid: params.vendorId });

  return (
    <div className="mx-8">
      <div role="tablist" className="tabs tabs-lifted w-min mx-auto">
        <Link
          role="tab"
          className={`tab tab-active [--tab-bg:#262626]`}
          href={"/store/products"}
        >
          Products
        </Link>
        {isOwner && (
          <Link role="tab" className={`tab `} href={"orders"}>
            Orders
          </Link>
        )}
      </div>
      <div className="bg-neutral-800 rounded-lg px-16 pt-2 mb-4">
        {products.length === 0 && (
          <div className="text-center w-full italic   italic opacity-20 pt-4">
            This store has no products
          </div>
        )}
        <table
          className={`table ${
            products.length === 0 ? "hidden" : ""
          } px-16 pb-8`}
        >
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <ProductListCard
                isOwner={isOwner}
                product={product}
                key={i}
                index={i}
                canDelete={+(canDelete.filter(product_orderCount => product_orderCount.id === product.id)[0].count) === 0}
              />
            ))}
          </tbody>
        </table>

        {isOwner && (
          <div className="flex mt-4 p-4">
            <Link href="/products/new" className="btn btn-primary  ml-auto">
              Add A Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreProductsPage;
