"use client";

import {
  MinusIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { removeFromCart, updateProductQuantity } from "../lib/cartActions";
import { useState } from "react";
import { Product } from "../lib/definitions";
import { numberToDollars } from "../utils/general";
import FormSubmitButton from "./formSubmitButton";

export const CartProductCard = ({ product, setProducts }: any) => {
  const [loading, setLoading] = useState(false);

  const removeFromCartBound = removeFromCart.bind(null, product.id, null);

  return (
    <div className="flex items-center gap-2 border-b-[1px] border-neutral-700 mb-2 pb-2">
      <div className="relative">
        <form
          action={removeFromCartBound}
          onSubmit={() =>
            setProducts((products) =>
              products.filter((p) => p.id !== product.id)
            )
          }
          className="absolute right-0 top-0 rounded-full translate-x-[50%] translate-y-[-30%] overflow-hidden w-4 h-4 flex items-center justify-center"
        >
          <FormSubmitButton
            className="btn-xs  w-2 h-2 aspect-square"
            value={<XMarkIcon className="w-2 h-2 text-white" />}
          />
        </form>

        <div className="">
          {product.data ? (
            <img
              src={product.data}
              className="h-20 w-20 rounded-lg bg-[#00000080] border-neutral-800 border-[1px] object-contain"
            />
          ) : (
            <div className="h-20 w-20 rounded-lg bg-[#00000080] border-neutral-800 border-[1px] flex flex-col items-center  justify-center opacity-25">
              <PhotoIcon className="w-12 h-12 textwhite" />
              <span className=" font-extrabold italic">No photo</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 h-20 flex flex-col justify-evenly ">
        <div className="flex justify-between gap-8 w-full">
          <div className=" min-w-max font-bold">{product.title}</div>
          <div className="badge badge-primary">
            {numberToDollars(product.price * product.quantity)}
          </div>
        </div>

        <div className="flex justify-between w-full gap-8">
          <div className="badge badge-outline">
            <span>{product.quantity}</span>
            <XMarkIcon className="w-3 h-3 text-inherit" />
            <span>{numberToDollars(+product.price)}</span>
          </div>

          <ChangeQunatityChip
            {...{ loading, setLoading, product, setProducts }}
          />
        </div>
      </div>
    </div>
  );
};

function ChangeQunatityChip({
  loading,
  setLoading,
  product,
  setProducts,
}: {
  product: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setProducts: (products: any[]) => void;
}) {

  return (
    <div className="badge flex items-center">
      {/* <div className="ml-auto flex border-[1px] border-neutral-700 w-min px-3 py-1 gap-4 rounded-full"> */}
      {!loading ? (
        <>
          <button
            onClick={async () => {
              setLoading(true);
              try {
                let status = await updateProductQuantity(product.id, product.quantity - 1);
                if (status) setProducts((products: any) =>
                  products.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
                  )
                );
              } catch (error) {}
              setLoading(false);
            }}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <div className=" border-r-[1px] border-l-[1px] border-neutral-700 px-3 mx-2">
            {product.quantity}
          </div>
          <button
            onClick={async () => {
              setLoading(true);
              try {
                let status = await updateProductQuantity(product.id, product.quantity + 1);
                if (status) setProducts((products: Product) =>
                  products.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                  )
                );
              } catch (error) {}
              setLoading(false);
            }}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </>
      ) : (
        <div className="">
          <span className="loading loading-dots loading-sm"></span>
        </div>
      )}
    </div>
  );
}
