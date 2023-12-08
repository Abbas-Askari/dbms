import { updateProduct } from "@/app/lib/actions";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rule } from "postcss";
import React from "react";

async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const result = await sql`SELECT * FROM product WHERE id=${id}`;
  console.log({ result });

  if (!result.rowCount) {
    notFound();
  }

  const product = result.rows[0];
  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <form
      action={updateProductWithId}
      className="w-full h-screen flex bg-gray-600 p-10 gap-10 text-xl"
    >
      <img src="" alt="" className="flex-1 border-white border-2 rounded-3xl" />
      <div className="flex flex-col gap-6 flex-1 ">
        <input
          defaultValue={product.title}
          type="text"
          placeholder="Title"
          name="title"
          className="h-10 bg-slate-400 text-black placeholder:text-neutral-100 px-3 py-2 outline-none rounded-xl "
        />
        <textarea
          defaultValue={product.description}
          placeholder="Description"
          name="description"
          className="rounded-xl px-3 py-2 text-black outline-none flex-1 "
        />
        <input
          defaultValue={product.stock}
          type="number"
          placeholder="Stock"
          name="stock"
          className="rounded-xl px-3 py-2 text-black outline-none"
        />
        <input
          defaultValue={product.price}
          type="number"
          placeholder="Price"
          name="price"
          className="rounded-xl px-3 py-2 text-black outline-none"
        />
        <div className="flex justify-evenly  gap-6">
          <Link
            href="/store"
            className="bg-white transition-all hover:bg-gray-400 hover:text-white text-center text-black flex-1 p-2 rounded-xl"
          >
            Discard
          </Link>
          <button
            type="submit"
            className="bg-gray-800 transition-all hover:bg-gray-950  flex-1 p-2 rounded-xl"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}

export default Page;
