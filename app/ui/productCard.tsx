import React from "react";
import { Product } from "../lib/definitions";
import Link from "next/link";
import { numberToDollars } from "../utils/general";
import { PhotoIcon } from "@heroicons/react/24/outline";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  return (
    // <Link
    //   href={`products/${product.id}`}
    //   className=" bg-neutral-800 rounded-xl p-6 flex flex-col gap-4 cursor-pointer"
    // >
    //   <img
    //     src={product.data ?? "/next.svg"}
    //     alt=""
    //     className="bg-neutral-500 p-[1px] rounded-xl self-stretch aspect-square object-contain flex-shrink-0"
    //   />
    //   <div className="flex flex-col gap-2">
    //     <div className=" text-3xl font-bold">{product.title}</div>
    //     <div
    //       title={product.description}
    //       className=" text-sm whitespace-nowrap overflow-hidden text-ellipsis text-neutral-300"
    //     >
    //       {product.description}
    //     </div>
    //   </div>
    //   <div className="flex justify-between items-center">
    //     <div className="text-2xl">${product.price}</div>
    //     <div className=" text-lg">
    //       {product.stock > 0 ? "In stock" : "Out of stock"}
    //     </div>
    //   </div>
    // </Link>

    <Link
      href={`products/${product.id}`}
      className="card w-64 card-compact bg-base-100 shadow-xl self-stretch"
    >
      <figure className=" bg-base-200 p-4 box-border">
        {product.data ? (
          <img
            src={product.data ?? ""}
            alt={product.title}
            className=" object-contain h-64"
          />
        ) : (
          <div className="flex justify-center items-center h-64">
            <PhotoIcon className="w-12 h-12 text-base-300" />
            <span className="text-base-300 italic font-extrabold text-xl">
              No Photo
            </span>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.title}
          <div className="badge badge-secondary">
            {numberToDollars(+product.price)}
          </div>
        </h2>
        <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis text-neutral-300">
          {product.description}
        </p>
        <div className="card-actions justify-between items-center">
          <Rating
            // round product.rating to nearest multiple of 0.5
            defaultRating={Math.round(parseInt(product.rating) * 2)}
            className="rating-xs"
            id={product.id}
          />
          <div className="badge badge-outline">
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </div>
          {/* <div className="badge badge-outline">Fashion</div> */}
          {/* <div className="badge badge-outline">Products</div> */}
        </div>
      </div>
    </Link>
  );
}
type PropsRating = {
  id: number;
  defaultRating: number;
  className?: string;
};

export function Rating({
  defaultRating,
  disabled,
  className,
  id,
}: PropsRating) {
  console.log({ defaultRating });
  if (isNaN(defaultRating)) {
    return <div className="italic">No Reviews</div>;
  }
  return (
    <div className="rating rating-half rating-xs">
      {/* <input type="radio" name="rating-10" className="rating-hidden" /> */}
      {new Array(10).fill(0).map((_, i) => (
        <input
          type="radio"
          name={`rating-${id}`}
          className={`bg-amber-400 mask pointer-events-none mask-star-2 mask-half-${
            (i % 2) + 1
          }`}
          //checked for i = 7
          {...(defaultRating && { defaultChecked: i + 1 <= defaultRating })}
        />
      ))}
    </div>
  );
}

export default ProductCard;
