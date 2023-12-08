import React from "react";
import { createProduct } from "../lib/actions";
import Link from "next/link";

const Page = () => {
  return (
    <form
      action={createProduct}
      className="w-full h-screen flex bg-gray-600 p-10 gap-10 text-xl"
    >
      <img src="" alt="" className="flex-1 border-white border-2 rounded-3xl" />
      <div className="flex flex-col gap-6 flex-1 ">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="h-10 bg-slate-400 text-black placeholder:text-neutral-100 px-3 py-2 outline-none rounded-xl "
        />
        <textarea
          placeholder="Description"
          name="description"
          className="rounded-xl px-3 py-2 text-black outline-none flex-1 "
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          className="rounded-xl px-3 py-2 text-black outline-none"
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          className="rounded-xl px-3 py-2 text-black outline-none"
        />
        <div className="flex justify-evenly  gap-6">
          <Link
            href="/store"
            className="bg-white text-black flex-1 p-2 rounded-xl"
          >
            Discard
          </Link>
          <button className="bg-white text-black flex-1 p-2 rounded-xl">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default Page;
