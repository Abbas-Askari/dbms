import React from "react";
import SellerInfo from "../ui/sellerInfo";
import StatsCard from "../ui/statsCard";
import "./style.css";
import { Product } from "../lib/definitions";
import ProductListCard from "../ui/productListCard";
import { sql } from "@vercel/postgres";
import Link from "next/link";

function getFakeDate() {
  const products: Product[] = [
    {
      id: "1",
      title: "Shampoo",
      price: 32,
      stock: 10,
      description: "Lorem ipsum dolor sit amet.",
    },

    {
      id: "2",
      title: "Soap",
      price: 320,
      stock: 12,
      description: "Lorem ipsum dolor sit amet.",
    },

    {
      id: "3",
      title: "Sanitizer",
      price: 3200,
      stock: 14,
      description: "Lorem ipsum dolor sit amet.",
    },

    {
      id: "4",
      title: "Soap",
      price: 320,
      stock: 12,
      description: "Lorem ipsum dolor sit amet.",
    },

    {
      id: "5",
      title: "Sanitizer",
      price: 3200,
      stock: 14,
      description: "Lorem ipsum dolor sit amet.",
    },
  ];
  return products;
}

async function page() {
  const result = await sql`
    SELECT * from product;
  `;
  const products: Product[] = result.rows as Product[];

  return (
    <div>
      <SellerInfo />
      <div className="flex justify-center gap-8">
        <StatsCard index={1} title="Revenue" value="$92,110,135" />
        <StatsCard index={2} title="Products Sold" value="128" />
        <StatsCard index={3} title="Customers" value="118" />
      </div>

      <div className="products p-8">
        <div className="flex  justify-between">
          <h1 className=" text-2xl ">Products</h1>
          {/* <button className="add"> */}
          <Link
            href="/editproduct"
            className="add text-white px-4  rounded-lg bg-gray-900 hover:shadow-md shadow-white"
          >
            Add
          </Link>
        </div>
      </div>

      <div className="product-list  items-center grid gap-4 px-12 mb-8">
        {/* grid-cols-4 */}
        {products.map((product, i) => (
          <ProductListCard
            product={product}
            key={i} // bad, Pass product_id as key here.
          />
        ))}
      </div>
    </div>
  );
}

export default page;
