import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import React from "react";
import { Product } from "../lib/definitions";
import ProductCard from "../ui/productCard";
import { unstable_noStore } from "next/cache";
import DB from "@/database";
import { getAllShelfProducts, getQueriedShelfProducts } from "../lib/queries";

type Props = {
  searchParams: {
    query: string;
  };
};

async function ProductsPage({ searchParams }: Props) {
  const { query } = searchParams;
  let result: QueryResult<QueryResultRow>;

  unstable_noStore();

  if (query) {
    result = await DB.query(getQueriedShelfProducts(query));
  } else {
    result = await DB.query(getAllShelfProducts());
  }

  const products: Product[] = result.rows as Product[];

  return (
    <div className="">
      <div className=" flex flex-wrap gap-8 p-8 items-streach">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
