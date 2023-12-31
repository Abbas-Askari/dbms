import React from "react";
import "../style.css";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import DB from "@/database";
import ProductListCard from "@/app/ui/productListCard";
import { auth } from "@/app/api/auth/[...nextauth]/route";

async function StoreProductsPage({ params }: { params: { vendorId: string } }) {
  const result = await DB.query(`
    SELECT * from product WHERE vendor_id = ${params.vendorId};
  `);

  const products: Product[] = result.rows as Product[];
  const session = await auth();
  const canEdit =
    session?.user?.id === params.vendorId && session.user.isVendor;

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
        <Link role="tab" className={`tab `} href={"orders"}>
          Orders
        </Link>
      </div>
      <div className="bg-neutral-800 rounded-lg px-16 pt-2 mb-4">
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
                canEdit={canEdit}
                product={product}
                key={i}
                index={i}
              />
            ))}
          </tbody>
        </table>

        <div className="flex mt-4 p-4">
          <Link href="/editproduct" className="btn btn-primary  ml-auto">
            Add A Product
          </Link>
        </div>

        {/* <div className="product-list  items-center grid gap-4 px-12 mb-8">
          {products.map((product, i) => (
            <ProductListCard
              product={product}
              key={i} // bad, Pass product_id as key here.
              />
              ))}
            </div> */}
      </div>
    </div>
  );
}

export default StoreProductsPage;
