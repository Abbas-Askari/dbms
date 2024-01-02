import React from "react";
import { Store } from "../lib/definitions";
import Link from "next/link";
import { PhotoIcon } from "@heroicons/react/24/outline";

type Props = {
  store: Store;
};

function StoreCard({ store }: Props) {

  return (
    <Link
      href={`stores/${store.id}/products`}
      className="card w-64 card-compact bg-base-100 shadow-xl"
    >
      <figure className=" bg-base-200 p-4 box-border">
        {store.image ? (
          <img
            src={store.image}
            alt={store.name}
            className=" object-contain h-64"
          />
        ) : (
          <div className="h-64 flex items-center gap-2 justify-center opacity-25">
            <PhotoIcon className="w-12 h-12 textwhite" />
            <span className=" font-extrabold italic">No photo</span>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {store.name}
        </h2>
        <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-neutral-300">
          {store.description}
        </p>
        </div>
    </Link>
  );
}

export default StoreCard;
