"use client";

import Link from "next/link";

function ProductModal({ product, canDelete, mainAction }: { product: any, canDelete: boolean | undefined, mainAction: () => void }) {

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
      <dialog id={`${product.id}-product-modal`} className="modal">
        <div className="modal-box">
          <div className="card-body">
            <h2 className="justify-center card-title">
              {product.title}
            </h2>
            <div className="flex  justify-between items-center">
              <div className="card-title">Price</div>
              <div className=" text-xl font-bold">{product.price}</div>
            </div>
            <div className="flex  justify-between items-center">
              <div className="card-title">Quantity</div>
              <div className=" text-xl font-bold">{product.stock}</div>
            </div>
            <div className="card-actions flex mt-4">
              <form method="dialog" className="flex flex-1">
              <Link href={`/products/${product.id}/edit`} className="btn flex-1">
                    Edit
                </Link>
            </form>
              <form
                className="flex-1 flex"
                action={async () => {
                  await mainAction()
                  document.getElementById(`${product.id}-product-modal`).close();
                }}
              >
              <button className="btn btn-accent flex-1">{canDelete ? "Delete" : "Take off Shelf"}</button>
              </form>
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
