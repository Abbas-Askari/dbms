import React from "react";
import { createProduct } from "../lib/actions";
import Link from "next/link";

const Page = () => {
  return (
    <form
      action={createProduct}
      className="w-full flex-1 flex bg-neutral-900 p-12 gap-10 text-xl"
    >
      <img src="" alt="" className="flex-1 border-white border-2 rounded-2xl" />
      <div className="flex flex-col gap-6 flex-1">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="form-input w-full"
        />
        <textarea
          placeholder="Description"
          name="description"
          className="form-input w-full flex-1 "
        />
        <input
          type="number"
          placeholder="Stock"
          name="stock"
          className="form-input w-full"
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          className="form-input w-full"
        />
        <div className="flex justify-evenly  gap-6">
          <Link
            href="/store"
            className="bg-white text-center text-black flex-1 p-2 rounded-xl"
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
