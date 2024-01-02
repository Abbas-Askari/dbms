"use client";

import { PhotoIcon } from "@heroicons/react/20/solid";
import { completeOrder } from "../lib/cartActions";
import { numberToDollars } from "../utils/general";
import CompleteOrderButton from "./completeOrderButton";

function OrderModal({ order }: { order: any }) {

  return (
    <td className="">
      <button
        className="btn m-2   w-full"
        onClick={() =>
          document.getElementById(`${order.id}-order-modal`).showModal()
        }
      >
        Manage
      </button>
      <dialog id={`${order.id}-order-modal`} className="modal">
        <div className="modal-box">
          <figure className=" bg-base-200 p-4 box-border flex justify-center items-center">
            {order.data ? (
              <img
                src={order.data}
                alt={order.title}
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
              {order.first_name + " " + order.last_name}
            </h2>
            <div className="flex flex-col">
              <h1 className="card-title">Address</h1>
              <div>{order.address}</div>
              <div className="">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <span className="font-semibold">City:</span>
                    <span>{order.city}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold">Province:</span>
                    <span>{order.province} </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold">Zip:</span>
                    <span>{order.zip_code}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  justify-between items-center">
              <div className="card-title">Quantity</div>
              <div className=" text-xl font-bold">{order.quantity}</div>
            </div>

            <div className="flex  justify-between items-center">
              <div className="card-title">Total</div>
              <div className=" text-xl font-bold">
                {numberToDollars(+order.price * order.quantity)}
              </div>
            </div>
            <div className="card-actions flex mt-4">
              <form
                className="flex-1 flex"
                action={async () => {
                  await completeOrder(order.order_id, order.product_id);
                  document.getElementById(`${order.id}-order-modal`).close();
                }}
              >
                <CompleteOrderButton />
              </form>
              <form method="dialog" className="flex-1">
                <button className="btn  btn-info w-full ">Close</button>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </td>
  );
}

export default OrderModal;
