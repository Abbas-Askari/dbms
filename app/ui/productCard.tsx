import React from "react";
import { Product } from "../lib/definitions";
import Link from "next/link";
import { numberToDollars } from "../utils/general";
import { PhotoIcon } from "@heroicons/react/24/outline";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  console.log({ rating: product.rating });

  return (
    <Link
      href={`products/${product.id}`}
      className="card w-64 card-compact bg-base-100 shadow-xl"
    >
      <figure className=" bg-base-200 p-4 box-border">
        {product.data ? (
          <img
            src={product.data}
            alt={product.title}
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
            defaultRating={Math.round(parseFloat(product.rating) * 2)}
            className="rating-xs"
            id={product.id}
          />
          <div className="badge badge-outline">
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </div>
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

export function Rating({ defaultRating, className, id }: PropsRating) {
  if (isNaN(defaultRating)) {
    return <div className="italic text-amber-400">No Reviews</div>;
  }
  console.log({ defaultRating });

  return (
    <div className={`rating rating-half rating-sm ${className}`}>
      {new Array(10).fill(0).map((_, i) => (
        <input
          type="radio"
          name={`rating-${id}`}
          className={`bg-amber-400 mask pointer-events-none mask-star-2 mask-half-${
            (i % 2) + 1
          }`}
          {...(defaultRating && { defaultChecked: i + 1 <= defaultRating })}
        />
      ))}
    </div>
  );
}

export default ProductCard;
