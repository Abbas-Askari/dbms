import React from "react";
import "../style.css";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import DB from "@/database";
import ProductListCard from "@/app/ui/productListCard";
import { auth } from "@/app/api/auth/[...nextauth]/route";

async function StoreProductsPage({ params }: { params: { vendorId: string } }) {
  
  const products: Product[] = result.rows as Product[];
  const session = await auth();
  const isOwner =
  +session?.user?.id === +params.vendorId && session.user.store_id !== null;
  
  const result = await DB.query(`
    SELECT * from product WHERE store_id = ${params.vendorId} ${isOwner ? "" : "AND onShelf = true"}; 
  `);
  
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
              />
            ))}
          </tbody>
        </table>

        {isOwner && (
          <div className="flex mt-4 p-4">
            <Link href="/editproduct" className="btn btn-primary  ml-auto">
              Add A Product
            </Link>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default StoreProductsPage;
