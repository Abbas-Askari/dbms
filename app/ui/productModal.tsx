"use client";

import Link from "next/link";
import { numberToDollars } from "../utils/general";
import { PhotoIcon } from "@heroicons/react/24/solid";
import FormSubmitButton from "./formSubmitButton";

function ProductModal({
  product,
  canDelete,
  mainAction,
}: {
  product: any;
  canDelete: boolean | undefined;
  mainAction: () => void;
}) {
  return (
    <div className="">
      <button
        className="btn m-2 w-full"
        onClick={() =>
          document.getElementById(`${product.id}-product-modal`).showModal()
        }
      >
        Manage
      </button>
      {/* <dialog id={`${product.id}-product-modal`} className="modal">
        <div className="modal-box">
          <div className="card-body">
            <h2 className="justify-center card-title">{product.title}</h2>
            <div className="flex  justify-between items-center">
              <div className="card-title">Price</div>
              <div className=" text-xl font-bold">
                {numberToDollars(+product.price)}
              </div>
            </div>
            <div className="flex  justify-between items-center">
              <div className="card-title">Stock</div>
              <div className=" text-xl font-bold">{product.stock}</div>
            </div>
            <div className="card-actions flex mt-4">
              <form method="dialog" className="flex flex-1">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="btn flex-1"
                >
                  Edit
                </Link>
              </form>
              <form
                className="flex-1 flex"
                action={async () => {
                  await mainAction();
                  document
                    .getElementById(`${product.id}-product-modal`)
                    .close();
                }}
              >
                <button className="btn btn-accent flex-1">
                  {product.onshelf
                    ? canDelete
                      ? "Delete"
                      : "Take off Shelf"
                    : "Re-rack product"}
                </button>
              </form>
              {!canDelete && product.onshelf && (
                <div className="text-red-500 text-xs text-center w-full">
                  This product can not be deleted because it has pending orders
                </div>
              )}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}

      <dialog id={`${product.id}-product-modal`} className="modal">
        <div className="modal-box">
          <figure className=" bg-base-200 p-4 box-border flex justify-center items-center">
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
            <h2 className="card-title text-xl">{product.title}</h2>

            <div className="flex  justify-between items-center">
              <div className="card-title">Stock: </div>
              <div className=" text-xl font-bold">{product.stock}</div>
            </div>

            <div className="flex  justify-between items-center">
              <div className="card-title  ">Price: </div>
              <div className=" text-xl font-bold">
                {numberToDollars(+product.price)}
              </div>
            </div>
            <div className="card-actions flex mt-4">
              <form method="dialog" className="flex flex-1">
                <Link
                  href={`/products/${product.id}/edit`}
                  className="btn flex-1"
                >
                  Edit
                </Link>
              </form>
              <form
                className="flex-1 flex"
                action={async () => {
                  await mainAction();
                  document
                    .getElementById(`${product.id}-product-modal`)
                    ?.close();
                }}
              >
                {/* <button className="btn btn-accent flex-1">
                  {product.onshelf
                    ? canDelete
                      ? "Delete"
                      : "Take off Shelf"
                    : "Re-rack product"}
                </button> */}

                <FormSubmitButton
                  className="btn btn-accent flex-1 "
                  value={
                    product.onshelf
                      ? canDelete
                        ? "Delete"
                        : "Take off Shelf"
                      : "Re-rack product"
                  }
                />
              </form>
              {!canDelete && product.onshelf && (
                <div className="text-red-500 text-xs text-center w-full">
                  This product can not be deleted because it has pending orders
                </div>
              )}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default ProductModal;
