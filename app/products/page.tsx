import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import React from "react";
import { Product } from "../lib/definitions";
import ProductCard from "../ui/productCard";
import Search from "../ui/search";
import { unstable_noStore } from "next/cache";

type Props = {
  searchParams: {
    query: string;
  };
};

async function Page({ searchParams }: Props) {
  const { query } = searchParams;
  let result: QueryResult<QueryResultRow>;

  unstable_noStore();

  if (query) {
    result = await sql`
    SELECT * FROM product WHERE starts_with(LOWER(title), LOWER(${query}));
  `;
  } else {
    result = await sql`
      SELECT * FROM product;
    `;
  }

  const products: Product[] = result.rows as Product[];

  return (
    <div className="">
      {/* <Search /> */}
      <div className=" grid grid-cols-4 gap-4 p-8">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default Page;
