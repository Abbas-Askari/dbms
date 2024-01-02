import { QueryResult, QueryResultRow } from "@vercel/postgres";
import React from "react";
import { unstable_noStore } from "next/cache";
import DB from "@/database";
import { Store } from "../lib/definitions";
import { getAllStores, getQueriedStores } from "../lib/queries";
import StoreCard from "../ui/storeCard";

type Props = {
  searchParams: {
    query: string;
  };
};

async function StoresPage({ searchParams }: Props) {
  const { query } = searchParams;
  let result: QueryResult<QueryResultRow>;

  unstable_noStore();

  if (query) {
    result = await DB.query(getQueriedStores(query));
  } else {
    result = await DB.query(getAllStores());
  }

  const stores: Store[] = result.rows as Store[];

  return (
    <div className="">
      <div className=" flex flex-wrap gap-8 p-8 items-streach">
        {stores.map((store) => (
            <StoreCard store={store} key={store.id}/>
        ))}
      </div>
    </div>
  );
}

export default StoresPage;
