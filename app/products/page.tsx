import { QueryResult, QueryResultRow, sql } from "@vercel/postgres";
import React from "react";
import { Product } from "../lib/definitions";
import ProductCard from "../ui/productCard";
import Search from "../ui/search";
import { unstable_noStore } from "next/cache";
import DB, { SQL } from "@/database";

type Props = {
  searchParams: {
    query: string;
  };
};

async function ProductPage({ searchParams }: Props) {
  const { query } = searchParams;
  let result: QueryResult<QueryResultRow>;

  unstable_noStore();

  if (query) {
    result = await DB.query(`
    SELECT Pr.*, I.data, avg(R.rating) as rating from product Pr JOIN (select distinct on (product_id) * from productimage )PI ON Pr.id = PI.product_id
    JOIN image I ON PI.image_id = I.id
    LEFT JOIN review R ON r.product_id = Pr.id
    WHERE starts_with(LOWER(Pr.title), LOWER('${query}'))
    GROUP BY Pr.id, I.id;
  `);
  } else {
    // SELECT * FROM product;
    result = await DB.query(`
      SELECT Pr.*, I.data, avg(R.rating) as rating from product Pr JOIN (select distinct on (product_id) * from productimage )PI ON Pr.id = PI.product_id
        JOIN image I ON PI.image_id = I.id
        LEFT JOIN review R ON r.product_id = Pr.id GROUP BY Pr.id, I.id;
    `);
  }

  const products: Product[] = result.rows as Product[];

  return (
    <div className="">
      {/* <Search /> */}
      <div className=" flex flex-wrap gap-8 p-8 items-center">
        {/* <div className=" grid grid-cols-4 gap-4 p-8"> */}
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
